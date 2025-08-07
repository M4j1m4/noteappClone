import mongoose from 'mongoose'
import Note from '../model/notes.model.js'

export const getNote = async(req,res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}

export const createNote = async(req,res) => {
    try {
        const {title, content} = req.body

        const newNote = new Note({title,content})
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}

export const deleteNote = async(req,res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({messsage:"Note Deleted Successfully!"})
    } catch (error) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message:"Note Not Found"})
        }
        console.log(error)
        res.status(500).json({message:"Server Error"})        
    }
}

export const updateNote = async(req,res) => {
    try {
        const {title,content} = req.body

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content}, {new:true})
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})   
    }
}

export const getANote = async(req,res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.status(200).json(note)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})   
    }
}