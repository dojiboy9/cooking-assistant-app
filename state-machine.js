var stateMachine = {
  "home": {
    "prompt": "Hello, what would you like to make today?",
    "commands": [
      {
        "words": "salad",
        "response": "Fruit Salad. Yummmy. Delicious!",
        "responseTime": 3500,
        "goto": "count-servings"
      }
    ]
  },

  "count-servings": {
    "prompt": "How many servings would you like to make?",
    "commands": [
      {
        "words": ["one serving"],
        "response": "OK. One serving it is.",
        "responseTime": 3000,
        "goto": "ingredients-ready",
      },

      {
        "words": ["two servings"],
        "response": "OK. Two servings? You got it.",
        "responseTime": 3500,
        "goto": "ingredients-ready",
      },

      {
        "words": ["three servings"],
        "response": "OK. That's a lot of food. But three servings it is!",
        "responseTime": 5000,
        "goto": "ingredients-ready",
      },

      {
        "words": ["four servings"],
        "response": "OK. Let's make four servings.",
        "responseTime": 1000,
        "goto": "ingredients-ready",
      },

      {
        "words": ["five servings"],
        "response": "OK. Five servings it is!",
        "responseTime": 1000,
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
        "responseTime": 2000,
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
        "words": ["great", "ready", "next", "first step", "yes", "yup", "yep", "instructions", "sure", "yeah", "ok", "okay"],
        "response": "Not a problem.",
        "responseTime": 1500,
        "goto": "instructions-step1"
      },

      {
        "words": ["repeat", "again", "ingredients", "what", "didn't", "hear", "sorry"],
        "response": "Not a problem.",
        "responseTime": 1500,
        "goto": "list-ingredients"
      },

      {
        "words": ["serving"],
        "response": "Sure.",
        "responseTime": 1500,
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
        "responseTime": 2000,
        "goto": "instructions-step1"
      }
    ]
  },

  "infinite-loop": {
    "prompt": "Well that was easy!",
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