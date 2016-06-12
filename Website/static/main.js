
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "Lc0SY8eMYVtiSKn3WqJWJ0ptudGHGMxcn2JLSkFaLt%2FaTke%2BobmWvLcSpz0cOQeK4uo4Prgzy%2FY8YuHurVjnsVEEm4MzEeYNtjj%2FmR95k7Fr9FYR%2F2eN9Vn4JX33Lp9vP4v%2BrvusYdWf212IOS3nv8%2BnUl7eSZgVE2LTusNHV8gzKGcZoyl4Je9PmfsE%2Boue3FyefaIdPGFT7oEDro6iPfpm7HWlqQkXqAVuCU1CUuxiHeZkr8bGw6ekO6suGs%2FKq9Q9%2FCSJVpAl9U8%2FTstcTuc%2FIHR%2BGDV3v5f%2FN4%2BnI4j942EEs6xTjcPu8jVIOY2EWHTDMVO3HkcLY6FXpYn2v7RB%2B6T563N1UbBykB%2FO4hJkmhKcATbS6cr8SezgnIxesHsYZbAPsjepB91A8YdS2KvFEncbr8nHw3PpnnHX5DJMNxDC7IcUgcvYi8BQPsWjyqW%2BpeiAapBNskEj7fHmVqBH6lZKibqkYIVDkvlAzXotC4r0UkFuZX9hhj4KbdBKzjZ30p3y7cC9SfpQ5VcgcoZtWV3758O10qwxKvw6filK86%2F7p7gGg4u4Cb91W%2FnQcCmnnNXzyd4Ikx0Za4VDv9aiqE5cs8AQRErg6ctr5JQCy%2F86VAq7i96gNbBPId8O7cqe%2BB9zV4hf67Z5uW%2FFC9qiuXHD%2B9JznQ2uu%2F2%2Fe1A2GYFKrBHkbNVaeSUBxa0%2BG9Q6ywv1gRzWAihTb7u32kcOkC5aLROw5JkKFxdWplXhZvXYZknYBnZH6Uy0hcYFEpMIhiuXNZdpB67wdoBjKBEZCRWvZ2bP4dkk94aqwcfha48UQIuexGGpJXBPDpLOKkSAtq580vIzn3g0jkR0U6%2FTww%2BRmK%2F7";
var stt_key = "VYXNhAd6lqaPn4FsIz%2Bjev575G%2F0eAnbR0IWMXDfX631%2BbKTCgVstIX8YYBLuCqJbYr56PYSm4dG0Njltsua1RauFhsIj3N7oGB%2Bmi6pzlhvZnPJyXSLykPNTe%2BHztvPpGjEzsu4nmIo671tgsVx0x9MlisCTXO%2FxFzaIpQfntS%2FIcedvciCkhCZYvAAFuKA%2BGdjxbsrYG6L59URjgSjGzjEtLWPLF2srELl3siq2oSS2N8gjHjTGAV84LNSXiLGlA1Lel2D8oMk5iLtxFutqweMOs34NGsUBbfKTBcR%2Bj0w6wirePQBQyvSl18zd8XvDjISplejXz91UYN54zzjba%2B%2BQGHCJhzTprYeoBSzO4%2Bj55JlTbL5%2FAjIf6k0ru9fNJUqjYy7CerZKWhpz7LIReq%2BBoOfPh%2FvEzI8VJh11TQjhN6SMvPZFMti2JbEZCODZ6yBXiygMXTPT%2F9pfNFyMGSSJcc%2B4oE5Q5QStZa4kSHNeaQu%2Bss1x%2B80n4bUgWG06jiJxpxFz8fz8K4CGpi4RVg23bo3WERLMYs6FbM1dLElnqIZrm0W6gRzGVNJ3b1M358FjkfeDyfPbq5AIOqy0QqKoKU%2Bx7jwg788Dq2pjimvpXw%2F08CFSIavq5p7rQJ6Ec9gtpAXPhEZCexwivjri%2ByDC0thp%2FHV9%2BB%2BMfta0SsqJkqR3w3crUSD93plxcuEUK8R%2BfhmJFHnxvu5i2Ta34Or7eOT8SGzl8qVcFBCwDfVGXfVcyzoAKqbTarolfeG4%2BVuGkfwBqG3thhQokuG3PWWLKeUTrqTPvUFQVGMM4QGezeXybf2asO5DuILUkgXFdPImRl1vOVljsyx%2B8SBpBNMsVJUD5NL";

var stream_loaded = false;
var audio;

var failed = 0;
var the_time = 30*60;
var timer_on = false;

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

function do_transitions(nextState) {
  if (nextState == "ingredients-ready") {
    transition_to_salad();
  } else if (nextState == "list-ingredients") {
    var top = $("#ingrid").position().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
  } else if (nextState == "set-timer") {
    console.log("Starting timer");
    var top = $("#timer").position().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
    setInterval(function(){
      console.log("Starting timer");
      the_time --;
      var minutes = Math.floor(the_time / 60);
      var seconds = the_time % 60;
      var time_text = "" + minutes + ":" + seconds;
      $("#timer-container").show();
      $("#timer").text(time_text);
    }, 1000)
  }
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
          found = true;
          var nextState = commands[k].goto;

          // Respond. Upon completion, apply the state transition.
          do_transitions(nextState);
          failed = 0;
          watsonSay(commands[k].response, function() {
            setState(nextState);
          });

          break;
        }
      }

      /*
      console.log(failed);
      if (failed == 2) {
        failed = 0;
        found = true;
        var nextState = commands[k].goto;

        // Respond. Upon completion, apply the state transition.
        do_transitions(nextState);
        watsonSay(commands[k].response, function() {
          setState(nextState);
        });
      } else {
        if (!found) {
          //stream.pause();
          if (failed != 0)
          watsonSay("Sorry, I didn't quite catch that!", function() {
            window.setTimeout(2000);
            //stream.resume();
          });
          failed += 1;
        }
      } */
    }
  });

  //document.querySelector('#stop').onclick = stream.stop.bind(stream);
});

