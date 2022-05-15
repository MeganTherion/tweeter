$(document).ready(function() {
console.log("ready bish");

//declare things you're gonna grab
let counter = $('#counter');
const tweetText = $('#tweet-text');
let counterVal = counter.val();

//declare callback function for handling typing event

const handleTyping = function(event) {
  console.log(event);
  console.log(event.target);
  console.log(event.target.value);
  // counter.html(function(i, val) {
  //    if (event.keyCode == 8) {
  //      console.log("backspace");
  //    }
  //   return val+1;
  //   } else {
  //     return val-1;
  //   }
  // })

}


//add event handler to own element
tweetText.input(handleTyping);
});

// tweetText.addEventListener('keypress', function(event) {
  
// })