/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(data) {
  const username = data.user.name;
  const avatar = data.user.avatars;
  const handle = data.user.handle;
  const tweetBody  = data.content.text;
  const tweetDate = data.created_at;
  
  
 const $tweet = `<article class="tweet">
      <header class="tweets-header">
        <div class="user-name">
        <img class="userpic" src=${avatar}</img>
        <span>${username}</span>
      </div>
        <div class="user-handle">${handle}</div>
      </header>
      <div class="tweets-body">
        ${tweetBody}
      </div>
      <footer class="tweets-footer">
        <span id="tweet-date">${tweetDate}</span>
        
        <div class ="icons">
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
       </footer>
    </article>`
    return $tweet;
    
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let newTweetElement = createTweetElement(tweet);
    $('#tweets-container').append(newTweetElement);
  }
}
// const $tweet = $(`<article class="tweet">Hello world<article>`);
$(document).ready(function() {
  renderTweets(data);
  
  console.log('Hello from console! 👋');
 
 });