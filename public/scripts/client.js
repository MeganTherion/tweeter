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
    console.log(data);
    renderTweets(data);
    // let entries = Object.entries(data);
    // let dataContainer = [];
    // for (let entry of entries) {
    //   dataContainer[0]=
    //   if (data[entry].created_at < dataContainer[0].created_at) {
    //     dataContainer[0] = entry;
    //   } 
    //   dataContainer.push(entry)
    // }
    // renderTweets(dataContainer);
  })
}

//event listener for button click on write tweet button
const navTweet = $('.btn');
const newTweet = $('.form');
navTweet.click(() => {
  newTweet.slideToggle();
});
//handle submissions
const $tooshort = `<p id="warning">you gotta tweet to tweet</p>`
const $toolong = `<p id="warning">ok that's too much tweet</p>`
const tweetform = $('.form');
const errorMess = $('.error');
const handleSubmit = function(event) {
  const tweetVal = $('#tweet-text').val();
  event.preventDefault();
  if (!tweetVal) {
    errorMess.append($tooshort);
    errorMess.slideDown();
    tweetform.keypress(() => {
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
//render a new tweet & reset counter
const renderTweets = function(tweets) {
  let counter = $('#counter');
  let tweetsContainer = $('#tweets-container');
  let tweetBase = 140;
  for (let tweet of tweets) {
    let newTweetElement = createTweetElement(tweet);
    tweetsContainer.prepend(newTweetElement);
    //console.log(Object.entries(tweetsContainer))
    counter.html(function(val) {
      val = tweetBase;
    return val
})
  }
}
//calls to action:
  loadTweets();
  tweetform.submit(handleSubmit);
  console.log('Hello from console! 👋');
 
 });