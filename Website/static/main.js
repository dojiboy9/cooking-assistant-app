
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "P%2BtGfUJQeKX0cB4cGmUH%2FHj2f0ZVMgMjFlThGijSIVDX719eyaHLUyHkBCj%2B2q6DHrX93VVCqUL9ae8gAuPBcCV0Jhpvry6cU5vx6hNpRe0ZXNbeXtu%2BCwaSqEAri7yjvo%2BgWvbIeDdbaDb7fmH%2B79iK6ZPFOac17L3LGFtNgEri4cxCyqJYmaLny7KFRGyKeqIJLdbtYF2Sw2AAUg1937ipC52fKoRmFhF4dwoUYvN9vx0kgpZhWsBcgkP4Lp5KhW%2FJnM9UIpmIMkbODNTCPBENhrk4E69MtEdVM7h0s14O9XZwW4%2BhyDRh7hg5555VC6e%2Fi1%2FU7vZ0saaHhxVsWc%2B5W0YfaL8qrLb7rLQhGq%2B8%2Fd7rZoJfoz4Afw08DYs%2BtlxSg2ijBIJ34nyOzHUlNCaZ%2FocT39GloolAKoif8bnM5q4DXXIyKUgZn25ZGXENg89UppiMjAmgMA4fv2FFQk0KBSkW0loh5ZcZ2nBCQBd5GciyVBTTjULiarak08Sn2nl4%2Bi5NeLOtYHdjog9Y9Q0aPwThw11kEzJMcQk9usL6wnxWFvLxHiiwgW5DXSYepRI2kdfbgRuPv6TnbfUV%2F4ffTNQAX7WvHDgmfwD%2FdvQBwnVvlAWCH5IxGJbOQbn4CuogHS7BoMREtGCQfySvc1d3D6YfVTE%2FCVeo4lGCw9KW9BW2O63MHHzeqEShZKlKB5x8ApEz3%2FG%2BAJO9C1%2FhZNx%2BuV4Sxnk3jaOfAVx%2FDBGO3SUCgS3oUITRJAYv2O0dCKlNaTP0Z69FIW6Uy4aDNMAjcEKB%2FkADszlsjEjFNrVfQ4ie7ny4QmuGRti0wqZhP8km63%2BBIgLxTgRrGyyXlF%2BzKRXKxlod";
var stt_key = "sNVOGqpIBXQyZm1EWK3vD5YlFpDjNzXQZNHNkZPvhsIbw%2FkO53qKnpGYAiXGHflJuTHC8Q9c%2FFjAT2uSI3w3Gm%2F%2BZyF0f77az9pOhiN0%2F0I%2B6ykw%2F%2BlogpIGaYMZPKYShhAyPlgUvKNPmrxkTU3PT4C2B5uonkvi3CdoHij8VzL3rvZfBfZY0%2Bp7nuhgYk91cCiY4Q%2BiQDL3fRp73QL2%2FeLmam5a55kuQaf6A23d6p3xagcyKEMkJbuidviW64TVuGXDlp8NvbAzxr8jeHIlZZZi%2BxN5JKjxpddEUxAWTPxVxczg%2B4gLNPFgB7HXg8kTP0xM1wOlmAlBzzssXyEVpso2qMLox2v%2FDG%2FwdiRVm7wrvyWNpyTmJNeHGSvkLLKQZUyu5VHU8Z6WTv2dROi2n8aWULyBjvOoQYKUKGtKT8o25l87ldcg8QIILg8V0p2eB%2FccDuw4MseUcqYHgrXBfwvy57%2FiDU3oTRsKrKYaJKqR6rvs%2BcCow3zmu%2BOzk60MUbVhfqbh%2FcCUHBumm%2FzYiaclbQDQpvgNoZJDqaVswBg%2FeXNZfbBn%2FJ59x5oyv8ynYk%2FGxpAGOtWpvacaeGuKyGM5DwnISEiAt1z7fTwMXlfvV9O165gMeMDkZbwzNw3nEPKcRAjVVKH97Wyb5mjW8Ppm2bmQdkKFRNU1LcqByhGEUCbTLy4sDMT49YUASfIogOQdERf39SW1b%2FO%2FEaIL1kK8b1VcaeCke4se%2Fa4OAwCG6pgDfPH%2B4RHNmudxfbZ%2BIYq%2FudDvZEqoN7S9i5EFZFSULAGAfU7gMHSogwerJjeYjE8u0QrnI17Aa4BAdSa%2F4JhJ%2F7RL5Wnd5R3ulNDIg%2FM4PqLjqSGT";

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
    } else {
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

