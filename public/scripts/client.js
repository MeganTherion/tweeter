/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 


$(document).ready(function() {
  //fetch tweets from /tweets
const loadTweets = function() {
  $.ajax('/tweets/', { method: 'GET' }) //make ajax get request to /tweets
  .then(data => {
    renderTweets(data);
  })
  
}
//error template:
// const warning = $(
//   `<div class="error" style="display:none;">
//     <strong>gotta tweet to tweet</strong>
//     <p></p>
//   </div>`
// );
//handle submissions
const $tooshort = `<p id="warning">you gotta tweet to tweet</p>`
const $toolong = `<p id="warning">ok that's too much tweet</p>`
const tweetform = $('.form');
const errorMess = $('.error')
const handleSubmit = function(event) {
  const tweetVal = $('#tweet-text').val();
  
  event.preventDefault();
  if (!tweetVal) {
    errorMess.append($tooshort);
    errorMess.slideDown();
    tweetform.keypress(function() {
      errorMess.slideUp();
      errorMess.empty();
    })
  }
  else if (tweetVal.length > 140) {
    errorMess.append($toolong);
    errorMess.slideDown();
    tweetform.keypress(function() {
      errorMess.slideUp();
      errorMess.empty();
    })
   
  } else {
    $.post('/tweets', tweetform.serialize())
  .done(data => {
    $('#tweets-container').empty();
    tweetform[0].reset();
    loadTweets(data);
  })
  }
}

//create tweets
const createTweetElement = function(data) {
  const username = data.user.name;
  const avatar = data.user.avatars;
  const handle = data.user.handle;
  const tweetBody  = data.content.text;
  const tweetDate = data.created_at;

//escape function to prevent XSS:
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

//dat html
  const $tweet = `<article class="tweet">
      <header class="tweets-header">
        <div class="user-name">
        <img class="userpic" src=${avatar}</img>
        <span>${username}</span>
      </div>
        <div class="user-handle">${handle}</div>
      </header>
      <div class="tweets-body">
        ${escape(tweetBody)}
      </div>
      <footer class="tweets-footer">
        <span id="tweet-date">${timeago.format(tweetDate)}</span>
        
        <div class ="icons">
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
       </footer>
    </article>`
    return $tweet;
    
};
//render a new tweet
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let newTweetElement = createTweetElement(tweet);
    $('#tweets-container').append(newTweetElement);
  }
}
//calls to action:
  loadTweets();
  tweetform.submit(handleSubmit);
  console.log('Hello from console! 👋');
 
 });