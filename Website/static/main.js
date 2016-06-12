
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "RKJb4SAsXjTy7flPE4smeH3uBZN0Sj8rF5I5zJjKZpBv5i69%2FEYr0kCtU1N9da8mw7GDGWyzGBhRvEQ2%2FXmoASiumuFXT07dM4cecLogbfEls%2BACBpWgNIm7qJ9lFjhpFQ%2B2olmoLGrWjP6h6RrIUAOn96Z0%2FMD1l7gR2F8ipOPxDL7Ya%2Bm2%2B58md84YVJ%2FHu5T10WdKZ4ghjRIM051e4GjjSl1FEJMUgr%2FR22JW9ZxJ9oTVhcRAl370QfB66sXCNrYGH1sK7IPPNU%2FPFPW%2BlCJTywn4owwb%2B6Sz2rX3QNwCv4rrCqNPw3xrvUTpUSYTya%2FM32%2B6bGLutnGWyqbJRUEy9K1Wpeth29O4GO9ySdM7AOn2L6uqsCrkFR1%2BuYGEIpyx0tMVzi9KoLr4XV5ZOIkxkr7JC7a6k1DGUXFsn64U0pJr62qGoK%2F2COPHogoai%2FmET%2BG0mRK3qyShL9F%2F8LA80AMj%2FircKNO%2BMi8cjXDqnQcA4mpykdM7D%2Bdr193yHw1NkIvZSgaIr8IGjE7XHbcoRxD35D1OYDN2izwOfYWkolmvHlhNjG3W1V%2F86wU2MjRWnv9EcMp0h6ZM87q1UbEZOF6lPOTyhON4LoDl9hUDb3wpH%2Bh3DeHv3597EH%2BnKThsvjE9iVpLeXGxDHkdh1kUtZxA5VJsP%2FLOshuGLvWzpKqETDfVa7vmYeU9BU8v6DlTvjcrqP4w7nvn4X5tsXAE65vEce6f%2FUNLXYeJax0S7bWSo9gh8FVMWKfnJznnsSKSdUaqRBdFY2aLzCRbpe5KiPaZD0TdnthCqOm2MufTPkC8YY7VeW5sOafIyEyRA3sb8hx3MMEYKwkAs3IzELWSFbmz3PKI";
var stt_key = "sTx2Fi1BKxDrq9k4IVVrYW2PfYxYk75Lpp2QjZlIs5Z0lHLE%2FFpHO4P6FO3obsySq4x6NKgncg02CutmDKUBEccfquDi7F214sSwVcR%2B67l%2BQI5vx7fcl8RIYBaxdCrgO7wTTmNbPASSO23RhCTTdSnVu5bshT2lMafbw3PuYPrj9OrBwL23SjzQ5ZXJnH2GARPhgXcqVcUgpmLmWLjKQjxSF6YuEYlPrv0S6qzD6Q4j9G98Vz%2BxWvIhwUWj1wfHqX%2FcmEPtbalMo1FyFYQ5QwqjBsoNvXuowmaJu3RM8LlEzYiXEkCpPp02CJ7jjopYTK8Ipumi800VcmL09OzdlHZikLI2l5LLj90Ih0vNk7pyLwYHu9YeuInfsj%2FVPaNMYqk3hf4PbpNPBo0fhWDrPjH%2FqU8CVapObVnKG9osZVOyZ2uf1KymtELy3R6PLgwAFJemT2n%2FUX1R9XfcyXrtTXFndCryl9LghJY3R%2BY2MMg%2FyL43fW1XFTHMu7FlDjWtaoZxZmCXebZkyvPn1fipWuIc%2FJq%2B%2F0vbEUzTVJzTll19GIXyZr%2B3JnE7yTcHCnAkaqED6KUVDgn6D5U5f0X1QvTXvipzzjiwrCgBZ34awadXsz%2BxUJQCmAjakgkVqC5SnL6Pq5iB8lJqo%2BMFmBydScrSlTZcKDjVCeOIoON63BEepOVRUv4it%2FoEpckUJEjmPvuKpEcskz0kBsdGUwVMfEd6sh7M94XlTe9uX2vpV%2B5nKJXL4P6P5aclU2a%2F56XwAcfX9QCgpdbH8T55drybhBtrquA4HLojdj4cwpwzeIGM0kJ1pWwOC8NhPU5Z2LVB2gQltwllNAuOJ2lofVdPXkxpPVHfOpbK";

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

function transition_to_smoothie() {
  // First animate by scrolling down to the salad item
  var top = $("#smoothie").offset().top - 500;
  $(".content").animate({ scrollTop: top}, 1000, "swing", function() {
    setTimeout(function(){
      $("#smoothie .list-item").addClass("on_tap");

      setTimeout(function(){
        // Next, load the proper new page
        $('body').load("/smoothie.html");
      }, 200)
    },500)
  });
}

function do_transitions(nextState) {
  if (nextState == "ingredients-ready") {
    transition_to_salad();
  } else if (nextState == "list-ingredients") {
    var top = $("#ingrid").offset().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
  } else if (nextState == "instructions-step1") {
    var top = $("#instruc").offset().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
  } else if (nextState == "set-timer") {
    console.log("Starting timer");
    $("#timer-container").show();
    var top = $("#timer").offset().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
    setInterval(function(){
      the_time --;
      var minutes = Math.floor(the_time / 60);
      var seconds = the_time % 60;
      var time_text = "" + minutes + ":" + seconds;
      $("#timer").text(time_text);
    }, 1000)
  }

  if (nextState == "smoothie-ingredients-ready") {
    transition_to_smoothie();
  } else if (nextState == "smoothie-list-ingredients") {
    var top = $("#ingrid").offset().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
  } else if (nextState == "smoothie-instructions-step1") {
    var top = $("#instruc").offset().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
  } else if (nextState == "smoothie-set-timer") {
    console.log("Starting timer");
    $("#timer-container").show();
    var top = $("#timer").offset().top - 500;
    $(".content").animate({ scrollTop: top}, 1000);
    setInterval(function(){
      the_time --;
      var minutes = Math.floor(the_time / 60);
      var seconds = the_time % 60;
      var time_text = "" + minutes + ":" + seconds;
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
      }
    }
  });

  //document.querySelector('#stop').onclick = stream.stop.bind(stream);
});

