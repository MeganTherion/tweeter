/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
//fetch tweets from /tweets
const loadTweets = function() {
  $.ajax('/tweets/', { method: 'GET' }) //make ajax get request to /tweets
  .then(data => {
    renderTweets(data);
  })
  
}

//handle submissions
const tweetform = $('.form')
const handleSubmit = function(event) {
  const tweetVal = $('#tweet-text').val();
  if (!tweetVal) {
    alert("You gotta type to tweet")
  }
  if (tweetVal.length > 140) {
    alert("You tweeted too much")
  }
  event.preventDefault();
  $.post('/tweets', tweetform.serialize());
  //console.log(tweetform.serialize());
}

//create tweets
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

$(document).ready(function() {
  loadTweets();
  tweetform.submit(handleSubmit);
  console.log('Hello from console! 👋');
 
 });