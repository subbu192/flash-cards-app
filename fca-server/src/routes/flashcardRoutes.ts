import express, { IRouter } from "express";

import { createFlashCard, deleteFlashCard, editFlashCard, getFlashCard } from "../controllers/flashcardController";

const router: IRouter = express.Router();

router.get('/:flashcard_id', getFlashCard);

router.post('/', createFlashCard);

router.put('/:flashcard_id', editFlashCard);

router.delete('/:flashcard_id', deleteFlashCard);

export default router;