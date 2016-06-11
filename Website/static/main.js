
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "ZLCmaSyRCPIBrjqnviRGMdWsP7m6ll632hZ7ztW3CC4RFCqOewhPIa%2BNwMlS1O7WffXtSLjabVjHQtgWeYU65ibvxJ8QUuL0%2F6aK%2Fi7I8tVJ%2BSK4whsSNcGeU0qpcQQ2eyXvfR5b27EVY%2BYfAtXEc4v%2FgT3MjRVyxb4d2t%2BscTA5e%2FsDydYCLOh9luZ763Ur724VdgE%2FJyaRjxKMgpeL9PX%2FmZieRKpqmR2WeIEweRzwY5XnXJBQ2qFu2dklvpim9ylI0Rg5UwMZysYWAaOgwki3xqQlTJgugzAesspRKNTMnn1DKHIkqKK1bAXAzjRJiIc2vo%2Bg80OKeyWskQ8E3mt8gTJhbHOHBp2U%2B9w2VgPVH8tWLEYFFoCv29y0Lx4Yi9Yi154dBq2IxXuv%2BqOsRgjkhFWWxdTvGfl2D3bAHCFXDIrtKdZBBlBpQqIPSjfZ%2Fi2mS5AsQIpgcdDtLwMSVzLZjhNKDIk2wzORzatsB7VJcxoeRpxMKk7Krp3sYAe8VlHFsvPw%2FSYJMjnAd%2FW4BSYTr2JAln%2Bji2p9OSIj9UJN05qj3jXAqy%2BwPbZs7S0d2V8M2DE2PNXo3Z84uc%2BJHW7JiGYo6VlIET3ezSWTUVIzKY5YMFwnh0aT730JJNSccXCA35VILaCTkQ6%2BvAu0bUBD0nrj%2F1zkbfV%2FimScswS8EPnPIlnXDSYZ95P6w3puOSzrf7uKg%2F8UZ31bW%2B3KbFgxWZFCNsXu0A9TqeLbI4ELUqQs63NWjxQ5aZE42FbAw2k4%2B8X42dyf5YXqYB%2Bw0z%2B6tZtqSkf6RIUF594vYeGShvBRnBto1ez1oFa%2FJJVFgdL3bNOG6i%2FNxjB5YFtKGJSLN4XJzFYD";
var stt_key = "YTpjHN529A3cJxKu2OKeYo%2Bg84hmudTXoLzSy7mdtEvEvv2HaQpIcmV8yJEzsUzbAxjFDTEtHWjG7CnVFOTsDLYa2IfchQIwXLlw5biJhIapMXW6x3mM2b2AY5vq%2BmE%2BzGgjY6gxMGO96Ur4re6xamXwy6Mi%2Foax7O7MuiFzPLODyWJDhUk7mo0Z9ft7y4VgaAkEUw0yvAyHuTTbK%2F348uDTYQ7LvbAFQ%2BuiZjC1AgFuKEsKKbg4hiohUsnPEwLOIxXUvpOS%2Bt1TOaXKTpcevyWpTDswkJGmtHjEIW57oOf5TWfIiezVkrlG1TCw4P2JmV2HBnHhwcPnogdzl3AJ0oKNAk%2FFcXD6CJ0AG70b1Yl%2BKAUzXIjGlo%2FVXAund2%2BmwflIBGe1gtmnRWCsz46ZcPYldVnpoSrfTdtlAvU8C01%2BrU8%2Fg6LCpRigIBJJ%2B0QmHANdRO0ofilyQr8biGHSBtZd3pV%2Bw%2F7WGoBxOE5e9SH%2B8KjKPCHFOGE1gdv9Y7qp%2FPOLp%2FjW3jAnRYf7vIPX15YXrG6RMhm1C%2F%2BycqM8M51je9Yp%2BXwL5kOMQd9UZ5cTcsUa%2FO6EQWBa8m%2B8f5TBPT8ALKeMISxGgUqNJcRPIbxw6a1twKwQ7OL%2F%2B8CJAl9pEZ%2F4gdqRlRFaa9HxOOV%2FVgcpYfDkFN86G4h3b4aJz2WPzgvWnObLZ%2Fi4DDSVuBjdu%2FQgLK9B2rCmUCbOCZ4Dfv1i1VoepHAf91tXlNhOdN3IkXBm%2BbHGyDxrq%2Frl7Mpsco5EKDbsuAXn%2F6mdf2n51zTAerjcSoE0PgzeWzR%2BlIqznDCSNqgnNcH%2FKwMZp5XYfjD%2BZw2GZdkWmBm0tCVqvhc3X3JSl1BE";

var stream_loaded = false;
var audio;
$("#mic-button").click(function () {
  if (stream_loaded) return;
  stream_loaded = true;

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

