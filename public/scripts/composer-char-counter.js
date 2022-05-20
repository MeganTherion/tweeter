$(document).ready(function() {
console.log("yallreadyforthis");

//declare things you're gonna grab
let counter = $('#counter');
const tweetText = $('#tweet-text');

//declare callback function for handling typing event

const handleTyping = function(event) {
  let numOfChars = (tweetText.val().length);
  let tweetBase = 140;
  counter.html(function(val) {
        val = tweetBase-numOfChars;
        if (val < 0) counter.css('color', 'red');
        else counter.css('color', '#4056A1');
      return val
  })
}

//add event handler to own element
tweetText.keydown(handleTyping);
});
