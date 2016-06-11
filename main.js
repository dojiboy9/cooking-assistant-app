
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "qTlj5si5XfR3kUjyVsTbPj3YAPQ1uxEcsw9ZizB4GKSuejh2nuXROfMmMGtWDt0UEUYJ09I84NQES1ILeNBoaN18jGMdS4xp9P6eVOkJnzun0p6oTngI5uOEVsi%2BdttdNeyY0VVxtyLvaWERgi7O7H7VgEgtK6GloliKCcNQcwBlT7eEirKkl7jZWZYCeqnp2XivqmGCjChh2ZxWFniTlfwApbUyckRitMvsWl95Yq8%2FMo57NIejl5ZIXcX6DGsLo9Ra20%2FypFbm7gWXOUgvcrnY1QV2UG7b7KSqcFDZ2b0o8zIMHgyWKZPbQ1S9ByWVD6VTMCc%2FJqgmDMcav3E9E%2B4RN4BNNebUbUVAOH5hpSo%2Bwi%2FRURMp5U7rv28j130q6ILbjzcgC3wpr6sRq0pcLYnw1QkEYf1EpS9GhoAIBAS9WNWDsWOkYhe4gxU1EddyA3Q5q7Wz4e%2FYOSaw5NXx9T%2FORjOSZehodTDAlt0wOEvOn8eAVqT0yq3Fj%2FgG2Tktq2NFHschypMWhjd4snmLbCVnspmCkcfwblhdcu%2FXTDxILF1JQjSYV%2FQSTljRT2F6r%2FyDIlGirl9uf%2BEVqiabk026S65R3yGzJC3gmAyyQMPPVXlHM4kfG91v0RF2tOEJDY5mJhOyKwjeKofflje6cYgMKO9Gj3DkhvMl0rD2yaLsXN5eH0318YZgUvhXj3ET8TuI3P1SOQQV2zR3MIW8L3imc%2BgPF1LaDdeFHWcJ%2F2zr4fmoMhfBwlg4JQWoBEre4jTXqxovN%2FLAD8gCegudjrmLSakMQDTypJr0s5B59z4%2Bx5GRuKGhFUa0HKMasis%2Bs7SbaWQ89BQTKx90xZ3EQbKwTBFd7O2h";
var stt_key = "n7N7h27lzkiSyEQ3zZWCk1ORbaaYoQ385fBF9mD%2BOU6ET6hpS9NARxOhBPSOVQr1PO4M1IB85HJFe0tH0c%2FUyPKvyY%2B7kN6sPYC%2BtgbS5P82ZQIz6cWUvGU0Rl%2BjkgclNoLRPR%2BUlf1gM%2BxeZvF%2BKdcUiu70WxrWTawh8nLjT8Ad3zU7lnJf4j1nh%2BFw2QyO4JgUOnB2l75e%2FQurR%2FjZeCm4Dg7tVNYkBt%2BDfkB4hS5HLAMjntXH779RaMqpHzQFGtaMbvD826aF9jDjX85nlmDBaTfvyBRg73gYjoc3sbIZrRWmArRUl44ZIVotatEP3wQ%2Bf6RHNQyZ%2BFq5sRvIIOxv6Js%2BR6T%2BabWk2tAouwuRekxAKw6pHHaZ%2Bhuc6fUJwDU6Swigr9rIwJwrADEZvoCHPT6CJ%2BNFS20vV4azG%2Fy4V5PXij5mIZxcHWVBe0i8DlebxYgTwU3iGa00aEouSofa9aOI%2FP2%2FdmNc3W1LoHvDrFzL6a3ZKTCIECoV5vFi5rIdAMEnIJPTZ9wr1Pywj8hZ272E5384f5Pqk%2BzK%2F8Gj93oqiEIgKiP7XMmIqd85VF87gH9YnyRCbEzINxySqgpB8VSFouiwmjYia88QehXsPL04e9DngRN%2BOyIZw%2FzrtMtXveFG%2FtY1de9xN5KhBCsQe1Gamjmxcfm0NozAopYEgd32eYY9XTsjaCPjthCdYbG0QS4wb6EXLdmN72vTPgEC%2FndYbH1pOW%2BzAdjfY1mjNbAaHhF7sVEu3Kpdwr1dmXMVsMopaHKZbMQJrl7X1NTZRrmLqkIirH%2BX%2Fc6YNS6IUDWo32X7To9YZ46uYeC4VmL61m4mM%2FQ1WbX0vwRU3AW8%2FTdo%2F%2BRi";

var stream_loaded = false;
var audio;
document.querySelector('#button').onclick = function () {
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

  document.querySelector('#stop').onclick = stream.stop.bind(stream);
};