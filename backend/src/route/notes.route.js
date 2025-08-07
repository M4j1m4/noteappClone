import express from "express";
import { getNote,createNote,deleteNote,updateNote,getANote } from "../controller/notes.controller.js";

const router = express.Router()

router.post("/", createNote);
router.get("/", getNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);
router.get("/:id", getANote);

export default router