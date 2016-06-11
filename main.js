
// Global Variables
var curState = "";
var acceptInput = 1;

var tts_key = "fuR4VM9FBuzU90mlPVx6LyDdJJyI8K3eRB8uORLhudB41a9S9RsvqQGhMYpjjUTNyuPsqu9xONsmafQSPYRrcbxw7CXMDjEDG0lMB9wVGnd5L2R7NyIAvSEtmkqmUVp7ETfFyZrZUJ9Tjv3FFpyhfmatcFSYvy4O6cbhjwDJK4JP3NG8gA6gXlyVru%2F7uos0W4XS%2BulWfjHHGNBQ9cjHNBtWoWWOTu%2B5nUGghTsUtwN8G4ben1nMZdcS%2FIEXpwuJfteR1fqbAoSLCestQWTJDRj90q86kP%2FBWo9x6SP%2FetrWzx14n8dQspK4bw8qWmxx%2BOi1xXghBuiNegYy1CHasgvzI8tpoFpfsxQttDHT1Uof81a0BgjAUEHL41tGc6LB0Kh%2BtR15yVJKsAbycojlEtYAvgGvL%2Bq6VogNMHR%2B8RCQmUhOx4KP6XLkOITRWhdhlAFHLQPqYI6qA4I%2BiegYBsIP%2FyHcfwY3fVSz7ciZAQ7QJALYq%2BpcylZ5vs%2Bph0ZKdCQghBKE0F%2Fd0Zs%2B7XsoA504E783nWKs0%2BALpo8EUXmOJCmWV6QqXZRUSWhPV2h7gbWAxMGnMAWLITZ0TPG6a2FIcZ4K8VTgRpe1fRIPIjDr6resl9nysDmyEwmsY8R5UBx4G6wygHjZe6keG%2Fha%2BXrbuqpzxSJ4RC%2FTN3CFRZKrLnetPYvWZCpPwR%2FMi3Pn2o7vaIVP1Xn9z6mknE9eyxfNZV2OkHwsFG2eBsXvI%2BOTcGjLv6S%2Fl%2Fv%2Bwl%2FR8V1nb0AkbPuENwffQVRQoub78seONocOi3O8x9e4FWD7eONXKpQFRCUH0YjT%2BWHNaHG2Sv5xhSh8Q12xvmtU5rnfBjklFd03lRH4";
var stt_key = "rsOmx6z7O%2FYJAqBLMpZucV8faB3pafONQVwEA4junUAp%2FrZRoOx7ouusai8E9bF72n1Xo9OAYm4k5ovXwXlmfX5PP675QwHt0XwgNbXYRiygK%2BlNUdRsPAqNhySRreQUSuTrD1Z2Z39j9g1jDIMTYItxLo%2F8Ja63Dbu6ovSI2EKEz%2B%2Fz%2F%2BYGHKVXKEyPJACsrj8WdH1b45gl8xZi3%2BOI2V3BK59rNx7CsArHI35VQg448MBK3xr3muhmEGOnGQ9JLhAkrrOaRu6Ck471YXKFIKPCy9AduCrdymKNZu%2BXm%2Fw9zQ%2BD%2BnqBe%2F%2BGLsZkXFH9vZleYRmAdFYogifVKjPS76tnksNCBWtFZm4dJ%2F6g8qIKNoSezXo6XEXJU%2BAJOhPdG%2B46ny1iBUJB9rt02L%2BWfHKeDHSvxnLGEugN02iiMVP1ZXazsiVYgmRK%2BHLJ93nZv4YPGTLP%2B957iIsREG13imxVG3nU10DY47IivfrcnKc4rdLLVKPegIwtlxPRp0pJ%2FEDJN%2Fylla9QAH0w9oI5iBwYBFyGt1naM8p8I%2FJn5O8ixwn1HeWHz8AEjtbXkeyO%2Brt%2BoOZ3u%2FJF2aNINOJbgx4%2FKB8gTUOIPAr01EZQAqpJ%2FcNGogUuibp76kEM54ii%2FrnY2O0ZWqWyJRID8sIHIBo5fw1H6O2LFYFLVmVmpephL%2FzAMKP%2F%2Bq9c8Qj5Bx%2FkrfN8hokr5Gp1xkwj3nL8X42Z2%2Fy5jLh1C86VKPvu6fphgixl6jxM4DOcQwsTW9wezLP8PtXAP6DGD6yogfEYCXoIYkO8N77KEm68zASH1Vj%2FxpwpefNfRcefp%2FzrKXigy4UZW3ybhe0NTNvlDlDdgG20N5KUBuBr";

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