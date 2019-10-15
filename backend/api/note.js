import express from 'express'
const router = express.Router()

import Note from '../models/note'

router.post('/note', async(req, res) => {
	const body = req.body
	try {
		const noteDB = await Note.create(body)
		res.status(200).json(noteDB)
	} catch (err) {
		return res.status(500).json({
			message: 'Error',
			err
		})
	}
})

router.get('/note', async(req, res) => {
	try {
		const noteDB = await Note.find()
		res.json(noteDB)
	} catch (err) {
		return res.status(400).json({
			message: 'Error',
			err
		})
	}
})

router.get('/note/:id', async(req, res) => {
	const _id = req.params.id

	try {
		const noteDB = await Note.findById({_id})
		res.json(noteDB)
	} catch (err) {
		return res.status(400).json({
			message: 'Error',
			err
		})
	}
})

router.delete('/note/:id', async(req, res) => {
	const _id = req.params.id

	try {
		const noteDB = await Note.findByIdAndDelete({_id})
		res.json(noteDB)
	} catch (err) {
		return res.status(400).json({
			message: 'Error',
			err
		})
	}
})

// Put actualizar una nota

router.put('/note/:id', async (req, res) => {
	const _id = req.params.id
	const body = req.body

	try {
		const noteDB = await Note.findByIdAndUpdate(_id, body, {new: true})
		res.json(noteDB)
	} catch (err) {
		return res.status(400).json({
			message: 'Error',
			err
		})
	}
})

module.exports = router