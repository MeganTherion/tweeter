$(document).ready(function() {
console.log("ready bish");

//declare things you're gonna grab
let counter = $('#counter');
const tweetText = $('#tweet-text');
let counterVal = counter.val();

//declare callback function for handling typing event

const handleTyping = function(event) {
  let numOfChars = (tweetText.val().length);
  let tweetBase = 140;
  counter.html(function(i, val) {
    
      val = tweetBase-numOfChars;
      if (val < 0) counter.css('color', 'red');
      return val 
    
  })

}


//add event handler to own element
tweetText.keydown(handleTyping);
});

// tweetText.addEventListener('keypress', function(event) {
  
// })