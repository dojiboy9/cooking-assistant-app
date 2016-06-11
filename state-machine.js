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
        "words": ["ready", "ingredients", "yes", "yup", "yep", "sure", "yeah"],
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
    "prompt": "You will need three oranges, blah blah, and something else. Cool!?",
    "commands": [
      {
        "words": ["great", "ready", "next", "first step", "yes", "yup", "yep", "instructions", "sure", "yeah", "okay", "ok"],
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
    "prompt": "Set out the large bowl on the table.",
    "commands": [
      {
        "words": ["great", "ready", "next", "step", "yes", "yup", "sure", "yeah", "done", "okay", "ok"],
        "goto": "infinite-loop"
      },

      {
        "words": ["repeat", "again", "what", "didn't", "hear", "sorry"],
        "response": "Sure thing. I said",
        "goto": "instructions-step1"
      }
    ]
  },

  // TODO: instructions-step2, instructions-step3, ..., etc.

  "infinite-loop": {
    "prompt": "I am done accepting commands. Please update the state machine file.",
    "commands": [
      {
        "words": ["suzy", "susie"],
        "response": "I refuse to listen to you any more.",
        "goto": "infinite-loop"
      }
    ]
  }

/*
  "list-ingredients": {
    "prompt": "You will need " + INGREDIENTS,
    "goto" : "instructions"
  },

  "instructions": {
    "prompt": "Are you ready ?"
    "commands": [
      {
        "words": ["I'm ready", "What are the ingredients?", "What do I need"]
        "response": INGREDIENTS
        "goto": "instructions"
      }
    ]
  },
  */
}