module.exports = [
  {
    message: 'What is the command name?',
    name: 'name',
    type: 'input',
    validate: (answer) => {
      if (answer.trim() !== '') {
        return true
      }
    },
  },
]
