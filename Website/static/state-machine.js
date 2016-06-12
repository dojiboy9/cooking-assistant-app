var stateMachine = {
  "home": {
    "prompt": "Hello, what would you like to make today?",
    "commands": [
      {
        "words": ["fruit", "food", "salad", "solid", "its all", "it's all", "its", "eccentrics our"],
        "response": "Fruit Salad. Delicious!",
        "goto": "ingredients-ready"
      },

      {
        "words": ["smoothie", "juice", "mixed", "berr", "smoothy", "frozen"],
        "response": "A smoothie! That's delicious",
        "goto": "smoothie-ingredients-ready"
      },
    ]
  },

  /*
   * FRUIT SALAD HERE
   */
  "count-servings": {
    "prompt": "How many servings would you like to make?",
    "commands": [
      {
        "words": ["one"],
        "response": "OK. Let's make one serving.",
        "goto": "ingredients-ready",
      },

      {
        "words": ["two"],
        "response": "OK. Two servings? You got it.",
        "goto": "ingredients-ready",
      },

      {
        "words": ["three"],
        "response": "OK. That's a lot of food.",
        "goto": "ingredients-ready",
      },

      {
        "words": ["four"],
        "response": "OK. Let's make four servings.",
        "goto": "ingredients-ready",
      },

      {
        "words": ["five"],
        "response": "OK. It's a party! Let's make five servings!",
        "goto": "ingredients-ready",
      }
    ]
  },

  "ingredients-ready": {
    "prompt": "Are you ready for the ingredients?",
    "commands": [
      {
        "words": ["yes", "yup", "yep", "sure", "yeah", "m ready", "i am", "great"],
        "response": "OK. Here we go!",
        "goto": "list-ingredients"
      }
    ]
  },

  "list-ingredients": {
    "prompt": "You will need 1 banana, 1 cup of grapes, 1 cup of strawberries, and ¼ cups of orange juice. Are you ready?",
    "commands": [
      {
        "words": ["great", "m ready", "next", "first step", "yes", "yup", "yep", "instructions", "sure", "yeah", "okay", "ok", "i am"],
        "response": "Let's begin!",
        "goto": "instructions-step1"
      }
    ]
  },

  "instructions-step1": {
    "prompt": "Slice 1 banana and add to a large bowl.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "instructions-step2"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "instructions-step1"
      }
    ]
  },

  "instructions-step2": {
    "prompt": "Add 1 cup of grapes to bowl.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "instructions-step3"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "instructions-step2"
      }
    ]
  },

  "instructions-step3": {
    "prompt": "Slice 1 cup of strawberries and add to bowl.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "instructions-step4"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "instructions-step3"
      }
    ]
  },

  "instructions-step4": {
    "prompt": "Pour ¼ cups of orange juice over the fruit and mix to coat.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "instructions-step5"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "instructions-step4"
      }
    ]
  },

  "instructions-step5": {
    "prompt": "Cover and refrigerate for 30 minutes. Would you like me to set a timer?",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok", "please"],
        "goto": "set-timer"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "instructions-step4"
      }
    ]
  },

  "set-timer": {
    "prompt": "Your timer has been set for 30 minutes.",
    "commands": [
      {
        "words": ["thank", "awesome", "great", "suzy", "susie", "next", "excellent"],
        "goto": "end"
      }
    ]
  },

  "end": {
    "prompt": "Yay! You are done. Just sit back and relax. You deserve it!",
    "commands": []
  },

  /*
   * SMOOTHIE BEGINS HERE
   */
  "smoothie-count-servings": {
    "prompt": "How many servings would you like to make?",
    "commands": [
      {
        "words": ["one"],
        "response": "OK. Let's make one serving.",
        "goto": "smoothie-ingredients-ready",
      },

      {
        "words": ["two"],
        "response": "OK. Two servings? You got it.",
        "goto": "smoothie-ingredients-ready",
      },

      {
        "words": ["three"],
        "response": "OK. That's a lot of food.",
        "goto": "smoothie-ingredients-ready",
      },

      {
        "words": ["four"],
        "response": "OK. Let's make four servings.",
        "goto": "smoothie-ingredients-ready",
      },

      {
        "words": ["five"],
        "response": "OK. It's a party! Let's make five servings!",
        "goto": "smoothie-ingredients-ready",
      }
    ]
  },

  "smoothie-ingredients-ready": {
    "prompt": "Are you ready for the ingredients?",
    "commands": [
      {
        "words": ["yes", "yup", "yep", "sure", "yeah", "m ready", "i am", "great"],
        "response": "OK. Here we go!",
        "goto": "smoothie-list-ingredients"
      }
    ]
  },

  "smoothie-list-ingredients": {
    "prompt": "You will need half a banana, 1 cup of frozen mixed berries, and 1 cup of milk. Are you ready to begin?",
    "commands": [
      {
        "words": ["great", "m ready", "next", "first step", "yes", "yup", "yep", "instructions", "sure", "yeah", "okay", "ok", "i am"],
        "response": "Let's begin!",
        "goto": "smoothie-instructions-step1"
      }
    ]
  },

  "smoothie-instructions-step1": {
    "prompt": "Slice 1 banana and add it to the blender.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "smoothie-instructions-step2"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "smoothie-instructions-step1"
      }
    ]
  },

  "smoothie-instructions-step2": {
    "prompt": "Add 1 cup of frozen mixed berries.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "smoothie-instructions-step3"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "smoothie-instructions-step2"
      }
    ]
  },

  "smoothie-instructions-step3": {
    "prompt": "Add one cup of milk.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "smoothie-instructions-step4"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "smoothie-instructions-step3"
      }
    ]
  },

  "smoothie-instructions-step4": {
    "prompt": "Use the ice-crush setting on the blender, and blend until smooth. Add more milk if needed.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok", "thanks", "excellent"],
        "goto": "smoothie-instructions-step5"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "smoothie-instructions-step4"
      }
    ]
  },

  "smoothie-instructions-step5": {
    "prompt": "Enjoy your delicious smoothie!",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok", "please"],
        "goto": "smoothie-end"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "smoothie-instructions-step4"
      }
    ]
  },

  "smoothie-set-timer": {
    "prompt": "Your timer has been set for 30 minutes.",
    "commands": [
      {
        "words": ["thank", "awesome", "great", "suzy", "susie", "next", "excellent"],
        "goto": "smoothie-end"
      }
    ]
  },

  "smoothie-end": {
    "prompt": "",
    "commands": []
  },
}