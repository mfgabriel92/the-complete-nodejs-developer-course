const yargs = require('yargs')
const fs = require('fs')
const notes = require('./notes')

yargs.version('0.0.1')

yargs.command({
  command: 'list',
  describe: 'List all the notes',
  handler() {
    notes.list()
  }
})

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note content',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const { title, body } = argv
    notes.add(title, body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    const { title } = argv
    notes.remove(title)
  }
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    const { title } = argv
    notes.read(title)
  }
})

yargs.parse()