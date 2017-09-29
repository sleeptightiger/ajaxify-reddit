/* GLOBAL VARIABLES UP HERE */
var frontPage = 'https://www.reddit.com/.json';





$(document).ready(function(){
/* FUNCTION EXECUTION HERE */
  console.log('Go forth and code!');
  requestReddit();

});





/* FUNCTION DEFINITION HERE */
/* TIP: don't forget scope! */

function Post(options = { }) {
	this.title = options.title;
    this.img = options.img;
    this.subreddit = options.subreddit;
    this.author = options.author;
    this.score = options.score;
    this.thumbnail = options.thumbnail;
    this.url = options.url;
	//methods

}

Post.prototype.display = function() {
    //
    // POST HTML
    //
    // <div class="post">
    //     <img src="" alt="">
    //     <section class="upper-text">
    //         <p class="subreddit"></p>
    //         <span class="score"></span>
    //     </section>
    //     <section class="lower-text">
    //         <span class="author"></span>
    //         <p class="title"></p>
    //     </section>
    // </div>

    let  html = `<div class="post"><img src="${this.thumbnail}" alt="post thumbnail"><section class="upper-text"><p class="subreddit">r/${this.subreddit}</p><span class="score">${this.score}</span></section><section class="lower-text"><span class="author">${this.author}</span><p class="title">${this.title}</p></section></div>`;
    $('.post-container').append(html);
}

Post.prototype.isThumbnailValid = function() {
    let picPath = this.thumbnail;
    let https = picPath.substring(0, 5);
    return https === 'https';
    //console.log(https);
}


function requestReddit() {
    $.ajax({
        method: 'GET',
        //api.openweathermap.org/data/2.5/weather?q={city name}
        url: frontPage,
        data: '',
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}

function onSuccess(json) {

    let post = new Post;
    console.log(json.data.children);
    for (var i = 0; i < json.data.children.length; i++) {
        let data = json.data.children[i].data;
        post.title = data.title;

        //if post has no thumbnail use filler
        post.thumbnail = data.thumbnail;
        //console.log(post.isThumbnailValid());
        if(!post.isThumbnailValid()) {
            post.thumbnail = 'img/some-image.png';
        }
        console.log(post.thumbnail);
        post.subreddit = data.subreddit;
        post.author = data.author;
        post.score = data.score;
        post.url = data.url;
        post.display();

    }
}

function onError() {
    console.log('you\'ve erred');
}
