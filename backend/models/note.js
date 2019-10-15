import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
	name: { type: String, required: [true, 'is required']},
	description: String,
	uid: Number,
	date: { type: Date, default: Date.now },
	status: { type: Boolean, default: true }
})

const Note = model('Note', noteSchema)
export default Note