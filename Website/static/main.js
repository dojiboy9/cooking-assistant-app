
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "D1ppV4jqa7OQlz0VSeq7LrB49k3bA3in1YRjHELVq3DHMUetWUSXe8B9iC50Pgab1ybXzJBcwWgYj56icFBNtuGzHgedEh14GDlibLQYI2Rmk5pCnKizR114SwFCS7glfkzm1pX8AY7%2Fmvqwh6u%2Bl59yOMtiiNBQ4LpMX01IL9KPtGcfr8kSpF3ID%2B8mfImxUfX5fU1T4qkqxPVa3eWiNWEV1eXsu9S1jYUnprvYk6t40Ru0PQV51BM6UojLZ2SuM1aIBBHvodc8rmK1n89P%2BGu6372TI7Swn2RPsRQwC4PF1zXoFmA4MovaVT%2BAsBKsClJF2q6G2BZJFQcUGC4jSKjTBmLEKzIOoZlBUPrvZP4vOjXW4iZqcG5PpDL1h5UDzAdctkYfedD0uw7iJUjmP5PE%2BcQhz77TcacjgowW4gAcZRJPH%2B%2FbdkMzsjgrfgK1bGhu%2FYLQgdRvv%2FVC27%2F00O9c3%2FouCbcXvR8k9kJrngBKXyZxQPfLDYNYGuVCQYgVLOJGaAoTb8fS4l1dclOS%2FeJrYLEOX%2B3oXkYHIC9kvd3vfKvd%2FVwk4la8wFpljAdWDbGs2EajGyZX4%2BCqakgTVjrjdhwqhQGUxbZDszMSiJxK9HvIsDsB2L1y%2BIgUTAtxETUxo9t1csojo3W777Vw7UDrmyD7OsKTqqvLLOo%2F%2B44c%2FhCrhHyMMt%2BZWoWVG1n6cD9gecsfJY9Qg9rfVQS%2FKcSTePCAaKYVd9mWlZiFkPHOX7xMBLENYzFtJLrT0dkRueT%2BsdeXx1R5m8OprdSZFIbjAwShzLW0MLwLUOQktm4gzcDZyVvXlJTzP2sN4OeRIU5j%2BbE%2FiC4FJlDcKkRKTbok4q02lMjc";
var stt_key = "Pl558PQ0k%2Fcery3EJBEaaSV1MOL%2BsuCMafPIet2iUKwCR4sfOby6MWvwvI%2F9NNbobvVbDvislYvJX98J0hWRcuPATujEnAy331ShEHuY6psygenMFWp8rVOtFjVnQFjYg41P1jlh1haQyLw25u0YfyOEvqukqE%2FVWH9LVM%2BrwGYEyh7Z6F9Te4HsjQKdPsYjmI2MLzRWDyRQUCYylK%2FDDq4g8bkPTkpkYjwnK%2FxUybUqQ4njUkp7vOMP6oKm%2FfvwLxhRUG22q5zO22tK2yN91KnXyHz09VRouTIICHYcN1oiBSkbKiNBq0%2FBYs%2B3zYa%2BgH00i4f1HIhtjc5DkCZ8P3fvZV%2FDCiL8c98rVLJGnfXRWIb7omHDhl7uaDQ6ykkEpDv358feLCT8lRJo%2BkGkdkiI0ZrXPx%2BjOKrnZABkEVCa8FJTJW7az1NSTexIa10EMtbiffj0obsYMNkwnywcUpZe9bB8qWc2svdILfvL58DCC%2Fv1Dn8rLYH3TvJ7sHQ6ZjjMfr6Vi3p4UjLQ8Ly7oSjy62pDaiWl3dgxDyvwazN4aKOVgVHnTx3cOnXWQW1oUE5Hmd8iCYo0f857H59bNQc9PfDBl%2FMmo1c0zKwj3CN60tPXKAs0BfT8HCy0l36eMgOnN%2FWGPvS0Kxr%2FghRbb%2F6VgbMjl2ieL1FI2duYPt8KZ%2BAQk5YOVrbxP0R09WdAStXp2%2FBb1U0NMgZG15E3UknLgbgtIDbBiy%2BREVD7lwiab6PbbDJK1xs%2FByNXgi8LNQRUb9Mt9KsNFOVAUFwb6FRlB2A%2BF1DBm0L0WCds%2B4%2FblFkGR9dPvIId7OapC8t3Fe0uSpfV5KOyGF1TEhkokgGUfaFxZ%2FDZ";

var stream_loaded = false;
var audio;

function transition_to_salad() {
  // First animate by scrolling down to the salad item
  var top = $("#fruit-salad").position().top - 500;
  $(".content").animate({ scrollTop: top}, 1000, "swing", function() {
    setTimeout(function(){
      $("#fruit-salad .list-item").addClass("on_tap");

      setTimeout(function(){
        // Next, load the proper new page
        $('body').load("/fruit_salad.html");
      }, 200)
    },500)
  });
}

$("#mic-button").click(function () {
  if (stream_loaded) return;
  stream_loaded = true;

  $("#mic-button").addClass("active");

  var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
      token: stt_key,
      keepMicrophone: true
  });

  stream.setEncoding('utf8'); // get text instead of Buffers for on data events

  /*
   * This function takes some text and has Watson say it.
   *
   * @param text {string} - the text to speak
   * @param callback {function} - (optional) a callback when the speaking is done
   */
  var watsonSay = function(text, callback) {
    if (!!text && !audio) {
      acceptInput--;

      audio = WatsonSpeech.TextToSpeech.synthesize({
        text: text,
        token: tts_key,
        autoPlay: true,
        voice: "en-US_LisaVoice"
      });
      audio.onended = function() {
        // Add a bit of a timeout to let the sound actually finish
        setTimeout(function(){
          acceptInput++;
          audio = undefined;
          if (!!callback) {
            callback();
          }
        }, 500);
      };
    } else if (!!callback) {
      callback();
    }
  }

  /*
   * This function transitions the state machine,
   * and also has Watson say the "prompt" of the state
   */
  var setState = function(state) {
    if (state in stateMachine) {
      watsonSay(stateMachine[state].prompt)
      curState = state;
    } else {
      console.error("Unknown state: ", state);
    }
  }

  setState("home");

  /*
   * Dealing with the stream here.
   */
  stream.on('error', function(err) {
    console.warn("Received an watson on stream.")
    console.error(err);
  });

  stream.on('data', function(data) {
    // HACK: Avoid saying multiple things at once.
    if (!acceptInput || acceptInput < 1) {
      return false;
    }

    console.log(data);

    // Remove punctuation. Make lower case. This is the input text.
    data = data.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    $("#input").text(data);

    // In the state-machine, find the first "command" object
    // whose "words" includes some word said in the input
    // TODO: Watson can return a series of possible alternatives. That's better here.
    var commands = stateMachine[curState].commands;
    var found = false;
    for (var k = 0; k < commands.length && !found; ++k) {

      // Keywords can be a string or array, but will always be made into an array
      var keywords = commands[k].words;
      if (typeof keywords == "string") {
        keywords = [keywords]
      }

      // Walk through the array of key words and see if any one was found
      for (var i = 0; i < keywords.length && !found; ++i) {
        if (data.indexOf(keywords[i]) >= 0) {
          var nextState = commands[k].goto;

          // Respond. Upon completion, apply the state transition.
          if (nextState == "ingredients-ready") {
            transition_to_salad();
          }
          watsonSay(commands[k].response, function() {
            setState(nextState);
          });

          break;
        }
      }
    }
  });

  //document.querySelector('#stop').onclick = stream.stop.bind(stream);
});

