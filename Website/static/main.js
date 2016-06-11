
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "nGqg7oUVKTswCrGX1rQR%2FW8BZHH8XM6edHAFXvOYjU3638M8WZxsLs5noCoHHwuwW0kNF0VO%2FF3L0ZXwiGZHi2ARKbHwSl2CKHJ1A8wjnDXnPFvdyQdg1NzpI1yV79ZuGAyaTOwNO%2Bp8kCWPFC%2BQFCbYC0fXFDdN2oCP0DYrhnspfltaYvksmlp6o1I56IjPeQogYPVS7uDE5OlssA5NXnuRA2HhBMm8DG3kTzGTNZza2knLqWsU%2F1t%2Bmqqa337V%2BsagZ%2FDTqc%2BwPxiMQJFMeutTzZXeftC9Zj0qnohIRqm9DjxqCw%2FIMWcy5sM375A%2FWjWNz2TlbOqA9V028jFZrIYLb80DuN9yMQRFiQRDyMymAQFUmSZ%2FxTrGHSPgSz6Nh6e1hqQgjpuzlkrynQ%2FVUErbvZndhdZyQZx6q5jiAQLIyaG1%2BpxpyqKkOf1zFj%2BIMmRyRSqWyMAnCeCTkzq9j8DQRkybRml%2FHmqH6ykPOoejQUvbZKwBoKS%2F7075nBI4r4mltYHBZvTmqmdjULVTzEIrigfleLivoyepcdIfrPztsx9ZnxnTfjn5emof9nreyh7id4dBhmTDDPTdUqBfJt370auoYd6jln%2Fy%2BbE5rgVN6JCSgXboWOINK0p1jQK0uTyVT%2BPu5FeXkBCJfhGY3V6dG7ykADA3Hvlbg2eso3fT%2Blz5y%2FPVJFMZU2fJWY%2Bb2P7pYB%2F4Cjd0BKtHyurONeqAU8Jy2HQTy9XE%2FYWAW%2FowXfYsp%2F%2Fx%2Bxfe%2ByUBGzkJTTfEt09TaqbfEz7fLrvR4wy573vm5x6KeWfKX0HKSvlxxb0JxRq%2Fz8ZsrRE3XyoGh6r2E3Hnd7hFMlu1KbYOCVPJMO1TAVZJ";
var stt_key = "5lomA84s4spau2vfW795e9el52HhUHC%2FGSaqHvBjjSy14hpnbAPzWBo7dcaJxj3Q8OtBNnXMwdhwfK2chB8vSXW6yd4bJ9%2BbO12wDO3zpjbfnLb%2F3cgp8ECRMm5ZLnxBkgt01zUMiW1c9MszlMKyUHjH3%2BJtlMkcAPbAzfHo%2BHDz5X7L8ov8Tmljw26dwFi0b%2FUcmiNkGvg5WvmUPf9uP48STC0bjIOVRcTfBZkq%2B9UZUs3u9vc4fyefzLw28LaUwuvoB%2BEcBd7xO4mtE4MyuI%2FnH5Ho0HNsL2CdZVd1yRoQb9MrDxI4qwA9EznawLnxfLfxY%2FM6LVIvss%2B8oZC4vJbK71uQ2LEDs5DtPrK1%2BJfQEuE29RidZYxUn5c8szrtLBKUqX4tsHrpozNNmFDdbYDnRq%2Bd7NOfJMSni9JoA9AgFPpTGpKJXD8z3FP8nANPUE%2FEDJyUfHa2c%2FYVuOpUNEWVXG4tHlc81fhla5BEWMz8XGVCDv1hQje3mJAJAkoJYpvaFCdgLTh5BSdOCAhdWjrR2hhj9%2BoAMH7aPF3dA1sQ1z%2BGbEc7oA7c2KOijr41XF9YkWllXCmq3Dy43A%2B3PVBriNQZWAPw0iYZfcZm%2BIFvYQY0zAIA1KYL6aaM%2FUF7o6i93ZGy6W0j45hNj2qdimyIAn76Loa5X1YD62vReREg10fv3WoTkVm6aMZDcJofO8b0xNlgUd1eEEHM%2B%2F6IDq4grhlLumpxik%2FdczwhdWgVABWYuCScKfl48BYNHk5sb%2FV1gqe2PPZeCuhqHDWzzvOxcha4HTuRwxiIxsJ4fPZb%2BCz6HE3GVVP8Pf2nEIE0HZs0z6q7uJ6yoveYums0QBnG0PwDJVkh";

var stream_loaded = false;
var audio;

var failed = 0;

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
          found = true;
          var nextState = commands[k].goto;

          // Respond. Upon completion, apply the state transition.
          if (nextState == "ingredients-ready") {
            transition_to_salad();
          }
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

