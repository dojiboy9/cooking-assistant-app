var stateMachine = {
  "home": {
    "prompt": "Hello, what would you like to make today?",
    "commands": [
      {
        "words": ["fruit", "salad"],
        "response": "Fruit Salad. Yummmy. Delicious!",
        "goto": "count-servings"
      }
    ]
  },

  "count-servings": {
    "prompt": "How many servings would you like to make?",
    "commands": [
      {
        "words": ["one"],
        "response": "OK. One serving it is.",
        "goto": "ingredients-ready",
      },

      {
        "words": ["two"],
        "response": "OK. Two servings? You got it.",
        "goto": "ingredients-ready",
      },

      {
        "words": ["three"],
        "response": "OK. That's a lot of food. But three servings it is!",
        "goto": "ingredients-ready",
      },

      {
        "words": ["four"],
        "response": "OK. Let's make four servings.",
        "goto": "ingredients-ready",
      },

      {
        "words": ["five"],
        "response": "OK. Five servings it is!",
        "goto": "ingredients-ready",
      }
    ]
  },

  "ingredients-ready": {
    "prompt": "Are you ready for the ingredients?",
    "commands": [
      {
        "words": ["yes", "yup", "yep", "sure", "yeah", "m ready"],
        "response": "OK. Here we go!",
        "goto": "list-ingredients"
      },

      {
        "words": ["serving", "back"],
        "goto": "count-servings"
      },

    ]
  },

  "list-ingredients": {
    "prompt": "You will need 1 banana, 1 cup of grapes, 1 cup of strawberries, and ¼ cups of orange juice. Are you ready?",
    "commands": [
      {
        "words": ["great", "m ready", "next", "first step", "yes", "yup", "yep", "instructions", "sure", "yeah", "okay", "ok"],
        "response": "Let's begin!",
        "goto": "instructions-step1"
      },

      {
        "words": ["repeat", "again", "ingredients", "what", "didn't", "hear", "sorry"],
        "response": "Not a problem.",
        "goto": "list-ingredients"
      },

      {
        "words": ["serving"],
        "response": "Sure.",
        "goto": "count-servings"
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
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
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
    ]
  },

  "infinite-loop": {
    "prompt": "",
    "commands": []
  }
}