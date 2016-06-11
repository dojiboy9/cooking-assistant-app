
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "sqaAbecYYi%2BULx3nKlrY%2BWuE2UUWh8KyoI9fIQks6yQsCrsnlDqdeWgJHB0Ug%2BUFhC9tEj%2BNpTjGO3iM2U%2FDo5rQ%2FbQ7WylRbPc42CxwdYgoY2SmObOykWkWr3Gd1G6BF9UVtyHHUtt2epJBvTN7NQjjwmUS67pIegQT82EOxW4SHTY1w92JkF7JP%2BcczYqNW5lFwGid6Z3QsI21Y85UkFV3fYkVAX1ocbOsgqSsuld1zTxvMXzLfxBmVRku%2BU65xT2Ehw6j2XOr4FtkR0LlJQG05LB%2Bc1yMeVTIdxpYXNuriURJ6h%2F4yZR3JcmbqvxtDDSuLWqSuv5tQ9OORH3tjeevwWFY2CKH0RUgb145f5AXKyHKbfDVgUOHtqSajYAiCtFcvXIzur%2Fj73E7bksLh8X78aSKFeHhc2Zoxky1GMmC0zGMKaD89Z%2BcjWQnULDbjnIFoi0OphwvKVbqDIcnhRq92iA5RLnHdmKXIiI9xG%2FofwZc8l5VHFD2RFdUWMNIKxZBAPAHfZrhm4ZgVFWhPnFmVNcS17ZMndrQme3kXLUezMokyBJNHLb4TOog0HHPGzrb49FBhKkTjqRAJc5Ftw7hM7jrDH06DjLctdszBu1QfjYB7bFf0ZjdY2KSSmt1wbuWCQi31oauIxpAr3VI3Jl%2FnL1KXNQd5DzFMMy98QUD2cTElHzh1Uoy7X1V3RNSKtyTU8u2PBI%2FhvBvhaEOXAbV9GOJhF6ojryqiCwB%2Fpmr4%2BMchZE0pdpPjbNkvXBDq0oX2UOBmuAWpOJnFlJfqDMCtJkvQAlcGg%2Fgf%2FUjJDI7xcb1E0RenSn0f6EcPFifiVzBrHZpQn%2BkUvqt%2BHapql34I%2F2xpClP";
var stt_key = "%2FvfQ%2F6OQUy5rlfFhYrLvTu5%2FxPs24NPfQyy3IutHptqNlT2PTO1WAKKfzBx9qrdETAtxPFE0h1hfMufdFSd24lTFcdJhnciRlyP04j6CrDrom7xpQg01dk0arTL2D1ZsqhXD%2FgKAWFieKWg0e%2BDnpR%2FLi6%2FxgBzUKPIBu%2By1J%2BYtWRRFtFwY%2F%2FxcH1mPHTOBx2xGBAl6LjxracG4z0IW7unU7ROb8MtVMJAiDVUdhABzUyU6c9P%2FS7w%2FM77jOJdeH68GEf4rXhDHrRpA96pVMOpsCnZkA65RwId9Gww0oOsVKYLXMfdRpb7VeKlwusgziqxFTOl3yYdGrUmb4ycCgWgZsPAXRpqiKBfd8Dfti4HA%2BFC45kgXen1a1ELpbydZPtLqSM2DjDSsIM4gBLKuANHXt4u2zHQNgKvgg5yUidyC5BbuubDV1vy%2FDv7FTldbmm4KbQz1L11zH9YGLXzue7YVYfVw%2FDdBRcc17KDOK%2F6VO5pz4k2hrN4QbI1WppMkve%2B9fE%2FKp2DTEVH2abNfKC0FUPYn0a3jBsZskB9yiDUM%2BGJS4Zkbs16V7V2pyR2dcd3S13VAxSDkNW183YpqW95ketdFPRQAsa6CZtUQxDfJjD1Y3MBBU1dM8kllD9Pm%2FphvnwjdLyHOTVS4U33HP1G1EgKq0Efik4OB%2Fy66v50%2B3OUW%2FXRIF%2FJDjZvuP7eTWTPUWNFH4uxeeruC8fXZTjlQLomz8aDIL621yp%2BcozEYHU8Vdyfn0z58V0Q7bc7Pwd16YwkFINUZJbytqgotCu6OEOlJuDeva%2B3LB8PzCxxdVxHmie3CvfsvPn6wtiFFoJBL%2Bv9xFESSuDR0BGgENV%2BZv%2BhWv7nd";

var stream_loaded = false;
var audio;

var failed = 0;

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
          found = true;
          var nextState = commands[k].goto;

          // Respond. Upon completion, apply the state transition.
          watsonSay(commands[k].response, function() {
            setState(nextState);
          });

          break;
        }
      }

      if (failed == 2) {
        failed = 0;
        found = true;
        var nextState = commands[k].goto;

        // Respond. Upon completion, apply the state transition.
        watsonSay(commands[k].response, function() {
          setState(nextState);
        });
      } else
      if (!found) {
        stream.pause();
        watsonSay("Sorry, I didn't quite catch that!", function() {
          window.setTimeout(2000);
          stream.resume();
        });
        failed += 1;
      }
    }
  });

  //document.querySelector('#stop').onclick = stream.stop.bind(stream);
});

