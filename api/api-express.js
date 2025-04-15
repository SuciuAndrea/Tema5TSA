import express from "express"
import bodyParser from "body-parser"

const api = express()
const port = 3000

let notes = [
  { id: 1, title: "Important note", description: "Do something urgent", label: "Important", isFavorite: false },
  { id: 2, title: "Work task", description: "Finish the project", label: "Work", isFavorite: false },
  { id: 3, title: "Buy groceries", description: "Milk, eggs, bread", label: "Personal", isFavorite: false },
  { id: 4, title: "Meet with friends", description: "Plan a trip", label: "Social", isFavorite: false }
]

api.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
})

api.use(bodyParser.json())

api.get("/api/notes", (req, res) => {
  res.json(notes)
})

api.post("/api/notes", (req, res) => {
  const newNote = req.body
  newNote.id = notes.length + 1
  notes.unshift(newNote)
  res.status(201).json(newNote)
})

api.put("/api/notes/:id", (req, res) => {
  const { id } = req.params
  const index = notes.findIndex(n => n.id === parseInt(id))
  if (index !== -1) {
    notes[index] = { ...notes[index], ...req.body }
    res.status(200).json(notes[index])
  } else {
    res.status(404).json({ error: "Note not found" })
  }
})

api.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== parseInt(id))
  res.status(204).end()
})

api.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
