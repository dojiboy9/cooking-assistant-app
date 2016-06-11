
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "EBJ4mGEpKmzU9vGAAxms0MOy2mJKRL5dEfJsIr81sEYpUfcYPTPWHdLephdl91aRvBfxuGZYhSKXO%2B%2BDUi%2BbYwfs%2BpESYSieSO1sIOl%2BJMFfjzdcl2fbUdH4Ib5W6A7k1DheFVwz3vIi%2Fl4ieOblbxHqV7g%2FO6FFBQ8DwOShEeCzSoKcA4TEt06cVvZJGYSI1h6waeebq0MxwMqjaRsCUgGAId%2Fg4taNAi%2BBgjHJ3d%2Fw%2BA%2BFcCYr6FW64Bixz5Aao73mbfSb75Q89hVObGeiZyuoiHLdktsR0%2BRma1LHuBEaDh0x1SjBD1ZIJun36VLEKeb%2BdmuJNXNmoV0GVCi0J66BPLUSg%2BGKX1iJ8kmO2bmvTIntY55uNvKdIWlN8MgFmpVQizJS6jorHL1PFzY4qqtN6Bq6LNqCI992rgCk3ptM5jQ9ajLmRcaIsSL8E5nxcrK2o7Eallpv0WKHv9gWVZCtsZTStvVa50OVreGbAoN4GkzP3XH7jsLZvCHWrcIgX244eIdgLnWwc6wmNizcxnePH2B2QikYk1mrEeju5e9DTqONpIDzd7FtEYxsmFkJj6kAbgscv6ZKGlt9u7UIEmh6nQ8uICVhse4R7I5MjaXaVw123Os12MA9KnwNpps52Edm88Oyh5jsP98jz7RP6es%2FJr5blU4vEBRf6W9nFGj4OL8g%2FgkLT9EagtUryhAxbmrUVrYhGrnQqWCk3mGuZF00fZ%2F5oooTP4GdStCoWyRo8qOT3YpPi2ch%2BwckZP6j%2FXCFlYI65JLgLLNH2XFFXErjSYEaQiVZ%2FDZJjLF1eqdA64rnnjoPWaKWloIJ6vA5jN9FVLwVCCEO8N3m29MobACzYIJj%2Fw8j";
var stt_key = "pEpJZ8Nse0YolMn70B23jKxY4V61LiBr1cawXB6MSBiaNo%2Bl4V2Gz8BJK9%2F%2BP6fxSZr5F01wIx6B0SmbvH%2Bdf8ZX4MZ1n0e%2F5pNItam47ZFJEgzUEpblWxh25PRKIgdg5Q9B1DCZDnaHik21%2BahBqPbk4PgNlMQfWk3PTAtZpeQKezNolfdXHwdZKe%2BM8%2BllvjMoKfKqgQ9tR1ToMmGyUETQwiJDexHTGF3kFzsbB7H6LQ%2FsKlMTn14vYXXjgNewNk9Kd41dXAgSCH07Ef8505nmwchwte9gVlh2PsXtaUkTfikzom0Q5puzbwz308xZ3vzjZMiTJxm%2FVE8lCEWTvqI020jW8IG3OA8sTE%2F1LfIEdV60oi3HikT2CYQ%2BFdnyxKz6Kz3lJRyTiDmCWIy5g8%2FXV2GfneXS5BgULs0Ciem61xXEvhFpePXfM7bbne%2BUlnCZc6IohaDS3xM24e5IHgaL5FZ6oAiEh64MZ73eNKiikk4xEzti2zvc8a9U9oSk8I6r%2FOy4xDxlfoksGFxYfoKirTBpTU6tMUcpadDBMu%2F%2B48Dp0K2iWxk2u1%2FUwH0NUyP1lHB8w0MNZXDyphW%2FEj4MQmZy%2B%2BOaOU2i%2Blejw5UQOtkP4mc5y3JDGNNEOphPKbb%2FG0S9AXJ2r0F89Szlawnigux1V%2Flb9G18C6Tek42l9kqZdlhvBoipy8QdwL56RsQav%2BxPc2Es4r8%2B2qm%2FOIO53ehyYzcV%2Bdlz8XpaaeurpKweGKick7twBxIcfMiVJrIQr2QgNzExb552guNK3p4l2dltKzEieNVlZkVWv3pRlmXePcBEPuQg48170tyfUPvKmIW851Cu%2FrMbpSGL%2B5Ba%2FfPXgyuT";

var stream_loaded = false;
var audio;

function transition_to_salad() {
  // First, fade the current page to the left
  //$("#slide").animate({width:'toggle'}, 700);
  // Next, load the proper new page
  $('body').load("/fruit_salad");
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

    if (state == "ingredients-ready") {
      transition_to_salad();
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

