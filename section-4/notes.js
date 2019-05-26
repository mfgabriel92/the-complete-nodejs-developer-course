const fs = require('fs')
const print = require('./print')

/**
 * Loads the notes file
 * @returns {object} - the parsed notes file's content
 */
_loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()

    return JSON.parse(dataJson)
  } catch (e) {
    return []
  }
}

/**
 * Saves a new note into the file
 * 
 * @param {string} note - the note itself to be saved
 */
_saveNote = (note) => {
  const dataJson = JSON.stringify(note)
  fs.writeFileSync('notes.json', dataJson)
}

/**
 * Checks for an existing title in the notes file
 * 
 * @param {object} notes - the notes file object
 * @param {string} title - the title of the note
 * @returns {boolean} - if there is the title in the document
 */
_isPresent = (notes, title) => {
  return notes.find(n => n.title === title)
}

/**
 * Lists all the notes
 * 
 * @returns {object} - the notes in JSON format
 */
list = () => {
  const notes = _loadNotes()

  print.s('Your notes')
  return notes.forEach(note => console.log(note));
}

/**
 * Reads one note by its title
 * 
 * @param {string} title - the title of the note to read
 * @returns {object} the JSON of the chosen note
 */
read = (title) => {
  const notes = _loadNotes()
  const theNote = _isPresent(notes, title) 

  if (!theNote) {
    print.e("Note not found")
    return
  }

  console.log(theNote)
}

/**
 * Adds a new note to the notes file
 * 
 * @param {string} title - the title of the new note
 * @param {string} body - the body of the new note
 */
add = (title, body) => {
  const notes = _loadNotes()

  if (_isPresent(notes, title)) {
    print.e("Title already taken")
    return
  }

  notes.push({
    title,
    body
  })

  _saveNote(notes)
  print.s('Note saved')
}

/**
 * Removes a note from the notes file
 * 
 * @param {string} title - the title to look for
 */
remove = (title) => {
  const notes = _loadNotes()
  
  if (!_isPresent(notes, title)) {
    print.e('Note not found')
    return
  }

  const newNotes = notes.filter(note => note.title !== title)

  _saveNote(newNotes)
  print.s('Note erased')
}

module.exports = {
  list,
  read,
  add,
  remove
}