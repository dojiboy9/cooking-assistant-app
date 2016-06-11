document.querySelector('#button').onclick = function () {
  var text_to_speech_token = "DdJIO1p1tjj7L2D5ofJ4XuGkIr02FhTHPv0qSvwo7fi2Q%2BMf2Ehg752A2vMox5A2a4P7G0qUXDr%2F2TpXxne6F6AGWf9MtB%2FsstOztqUlibMLC0PduY%2FTxZFIyQWT86kY3It3ow6wLtmRXN6Qhk2hguwH3SyOTjMTzxsXqSsRAHeKLEhnr7Ga4%2F7BT9hPqVKt7SMlrVJidc9XEBzC7OeeR9VAR2w6QwIoanjMkOln814aZie2dGCC5PjZEk9mZdUCLMPJq8oGOS6ovTYb2A1dYUfSAvd7fiOOqWAETMzGk6y7txOkcr2jxUKUzyBOklGJzqhbfrFuRm%2F2Vnh9eh9E%2FZGRGAzlHaZMr5bqo4yQgycbg1AoVGVx3TDGSADRHL4qkJp6i39I%2BoX0Rru%2FWSBM%2BnvsM%2BJxPDhUNmDZpM2qcphrCn9D0YGRXdO%2BXeAdEw46N67z06Q91JXzaI72%2Bl1wI8hggx0d2vVZlHfQUR%2FLnSrk9t7eaC38De4U%2FSCiY3TBCEPO%2BnawF%2BFbNj8C7KhENuSc2lQeir6VRnXnhq4cCBO%2FUvQod%2FmpwzUYLqd78THiyCW808Owa6ZX2BslvMkW3XPT3M8p%2FjNGsVwD6208ztyDfyVpxSqIWMvwVbORN9glJLv3%2FzKVy9pzDKPi3grg9695bdAPTSA7YPKHG4IshnftK8qscPG7oCwXrdDI6mt%2F9c3XuuZhsjCn5Vb9nMuOHWDs97PeHgp1udx1DFFCwg4YptbqnFj5DghdlpKSRwv1covgi2F2A03NoMjGvzrqtCsPOtCxsmR6O%2BcXBFrjK5mTqHulQ%2FMC4YpfLIlbTiOb9enPRdV0%2FrdRsUZ6v74nc0q64R6bQArW";
  var speech_to_text_token = "zNQ5jYsis90z%2BaGhtlsFca9s03ixAsJMWvRctgPveLIYGWqSC93lo6NzE4fC2mBBifZHOkHvXzNlsNVyUVLAfeuNDS2jqrmWwUXUGe%2BogATx4kJQklxB6DakG3Aw0rfUb04YjM09RFLkfoJ%2BTE5Zm2xqurraTuMOXbsOiCi7bb3RwGvMce%2BDbaNtGg%2BQexIvXk6vVjxr3Gel5bX5%2B%2B%2FewLibckuvhxV8s32PhCO8Uu9EiXAaKQVLZNkWLXGAaag%2FHKP2QRglVrKtUUJDh%2BlF3FqZ5bX9HSiwxY6D8fMGKUCZ59tktXqlKF7NxghWuPPR1m9FC5%2FngJI%2B4y4BBUP%2B%2B8U10thaHVCzQ5SWKN74m4jLXbt3FeTSBLr5SXPi3%2F7O7M0t6W5x6RIOiSdAJX2BCjF4ycLeCmjSozsW8xJrKDEVX81jWSRsKuHfKYKpC9aE5Z%2B%2Fe46kKXd%2BaS8%2BqqwLLneCl3%2ButYsvkllE41TD%2FIixIq%2BonFAvOvTAdIuj7bfFfKN12UkXiyfE1Iy4ykvhSdKTFx3CDQqKkt9N1ibL4EL8cwyTpMFrgBKJ5JZlmtpD%2F2hHBX2QF5zvYvwU53ADtasAPfNpcghuPF4euvOytt6qLZZCzlBsahWgRqEkMRgumxTy4cf1vaAlwrOQPmVQJvqUQ6cL2U%2BbA%2BwnWwWTljGNvHXNSrnpD8bEp1mUIewUhgMGnGFACGiFELlPCjj78ANdB05Y8KiDbUYCt5sPafF%2BQx39I%2Fk15qtja1Ls6y6al0wBfWp274a4H8qrBFDp%2Bylz9KI1A4MG2H5PUlKTnjvxMraNb71jf56ysm6fkeyNAODEg8apC6RxWWTuDJfrQIZajEKca%2BF8";

  var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
      token: speech_to_text_token,
      keepMicrophone: true
  });

  stream.setEncoding('utf8'); // get text instead of Buffers for on data events

  // Variables
  var curState = "";

  /*
   * This function takes some text and has Watson say it.
   */
  var watsonSay = function(text) {
    if (!!text) {
      WatsonSpeech.TextToSpeech.synthesize({
        text: text,
        token: text_to_speech_token,
        autoPlay: true,
        voice: "en-US_LisaVoice"
      });
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
    console.error(err);
    stream = undefined;
  });

  stream.on('data', function(data) {
    // Remove punctuation. Make lower case. This is the input text.
    data = data.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    $("#input").text(data);

    // In the state-machine, find the first "command" object
    // whose "words" includes some word said in the input
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

          // Respond
          watsonSay(commands[k].response);

          // Apply the state transition
          // HACK: We have to wait a bit before actually doing this.
          // This is because the "watsonSay" command is asynchronous and will
          // immediately return.
          var nextState = commands[k].goto;
          setTimeout(
            function() {
              setState(nextState);
            },

            (commands[k].responseTime || 3500)
          )
          break;
        }
      }
    }
  });

  document.querySelector('#stop').onclick = stream.stop.bind(stream);
};