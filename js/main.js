/* GLOBAL VARIABLES UP HERE */

var frontPage = 'https://www.reddit.com/.json';
var topTitleLength = 60;




$(document).ready(function(){
/* FUNCTION EXECUTION HERE */
  console.log('Go forth and code!');

  requestReddit(frontPage);
  $('nav a').on('click', function() {
      clearSearch();
      let page = 'https://www.reddit.com/';
      page += `${this.text}/.json`;

      requestReddit(page);
  });


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


    let  html = `
    <a href="${this.url}">
        <div class="post">

            <img class="post-image" src="${this.thumbnail}" alt="post thumbnail">

            <section class="upper-text">
                <p class="subreddit">r/${this.subreddit}</p>
                <span class="score">${this.score}</span>
            </section>

            <section class="lower-text">
                <span class="author">${this.author}</span>
                <p class="title">${this.title}</p>
            </section>
        </div>
    </a>`;

    $('.post-container').append(html);
}

Post.prototype.isThumbnailValid = function() {
    let picPath = this.thumbnail;
    let https = picPath.substring(0, 5);
    return https === 'https';
    //console.log(https);
}

function clearSearch() {

    $('.post-container').empty();
}

function cutText(str) {
    if(str.length > topTitleLength) {
        return str.substring(0, topTitleLength - 1) + '...';
    } else {
        return str;
    }
}


function requestReddit(page) {
    $.ajax({
        method: 'GET',
        url: page,
        data: '',
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}

function onSuccess(json) {
    console.log(json);
    let post = new Post;

    for (var i = 0; i < json.data.children.length; i++) {
        let data = json.data.children[i].data;
        post.title = cutText(data.title);

        //if post has no thumbnail use filler
        post.thumbnail = data.thumbnail;
        //console.log(post.isThumbnailValid());
        if(!post.isThumbnailValid()) {
            post.thumbnail = 'img/text-icon.jpg';
        }

        post.subreddit = data.subreddit;
        post.author = data.author;
        post.score = data.score;
        post.url = data.url;
        post.display();

    }
}

function onError() {
    console.log('you\'ve erred Gerry');
}
