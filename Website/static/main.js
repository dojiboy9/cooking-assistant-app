
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "V%2BBnYNObG62wKLTdIW%2F8dzDNWJgl3uvQ05rbzEhLAxpgbSN%2BSISMpQMxC62KYbEt%2Fn8HxX%2BsHLDGrGIjcCMk83NcMKKhuN1Gsr3OHcr29vmg482XM3VspBqczwx80dIn3bZfXCW1I7VGi%2Fq3JGlYTMmbUwICphBUluMQ9595T83Al0otNTfrxLvEBfaWuO7OhuQLsj2ycIRaw89N%2BNPyBbYx%2F8NvzvN589ZBvWeY7j3k4R%2BE6Nb9oITF26JH6NGDdfsxtRsEyXlBIBjGo81GIDfOMnhIFZgvLCETtYaVpURts8O6%2FikT%2FiBVn6kzUHvOCfxYEY2bxGqDNJmykuhmko45D55W9LlbQTklwJ41JrMznfqmRXZI8ap7IDJRczjkJ5ccR%2FjnEVMRT2UJP0dESaRdA2zKU8%2B71FRpvh5dJyzBexNbdF6hpkTRoZa2kR%2FbW6uvcGsJptMOEWyNAU3WR2pA48IJ5P8DFOESxzCfX8PPsAlCipfeIX%2FuX1z4XAMFBKA3U%2B%2FXh8%2B1K0Vt%2BliM0FkW%2FyS1p0oobLKxRoTh%2B21e72QI9AxEd4Y5S1V6mZa6rtj1PYujYNsMvJrorSOzxHUR2eWFM22iXxh5XN3wOnnvWvFeVhgSGN%2Bl%2BB9BGEmQTf3eTevf9x9aG7GpcX3%2BpzrvUEQdoOHeucaYaMt46StlUq3ZEyzuDmVa68N1VtitFLJnO%2FZHVSOPbIeqwO2vRQDHX9SWIr%2BJ54ufexkII4u2yXbjTFSo90SgrSlka5AiWCBA3WsT90lj5SVhE2agUyiFBW1eZiJYcGJ0KQV%2FsicJEBkbyZPT4ZKdpBXCndYzTDEXHGu92CkbQiZzT2Fd31%2BTxVD8XK8C";
var stt_key = "PL18KxeP7hWuUrtVbK%2FQsfFp7PMuE08OvaWdJ8P%2BDKf0ZmfA1eVlzzZUFVvcurOhouxoHzqA6y1mIdsolTDqkeshJiprULzIOvTvPZnUCh19rN%2F0GEvevTfLY1Hqj7oTfH3idn6NnXun0rhhw3G1QDboShInJ5Ezqcx6%2F74OFZtgganSh4QDQ6g6zvN0Cpsag%2F4OzlHhdp9F%2Bz8I3iN7EWKIDZNmTAZQF17Dl63ipXhYqSZxJUw%2F8aOHdQ26U8D45FZTuIplXe8%2FEDDZJkAk%2BD05zSKrXN%2FJXF0oXTpNXP4jlKkZbyRlmPTruT%2BFbEDu40XoWWu6%2F4zERes9buYU4AhUJ6C%2F1aDRlIDPisDVN%2FBm9i%2BD13FJbR%2BeSqMKAvnc8LAnTNel12pEQ1zFp1aBqE6bf14LGVLPpDaevd9g7uaIgHLPPBS7sLrFoocSBA3NHHfC7LqkOr0scuBT%2FhigFJeD%2Fthw%2FADUBua7FASgg8O17LZ6E0QBBV1HGIzCqEBYAKlEzab7neG5Pxn2pURS8ZRWru9oAZ2ttx6oIhZqVnHlBakTZbizyS046Ya0cRcS6gtWBxhyNAknmeegXKV%2Fw8xG1zrpvmA0Ya0vab4BiYJrUFU1FWc0QJelnQV3nZxg8mDCm16zxrmwyuD%2F%2FsjC1bDIo%2F6HegheI5GkecJsnC2iNwoTKwYuDRpRFPg7dtjrQs2ksY9Ij1LbX79pZjk%2BFENPFWTQtE3vxQmUiL5mXRQulFGG2BOM3DFGD7R3j7S5%2FYrQDGCFd9hZOwjeLErUoBDX%2B3ShPlKlUNBL%2ByagJ3MwgZaidpG4Nsc1yNDYXXBuhf7ODBOdO0JbTJJT95V7toC0snySmBno";

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
        $('body').load("/fruit_salad");
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

