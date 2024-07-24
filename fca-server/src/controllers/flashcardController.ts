import { Request, Response } from 'express';
import Category from '../models/categoryModel';
import FlashCard from '../models/flashcardModel';

interface CreateOrEditFlashCardReqBody {
    category_id: string,
    user_id: string,
    question: string,
    answer: string
}

export const getFlashCard = async (req: Request, res: Response) => {
    const { flashcard_id } = req.params;

    FlashCard.findOne({ _id: flashcard_id })
        .then((flashcard) => {
            res.json({ status: 200, flashcard: flashcard, message: 'Flashcard retrieved.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to retrieve Flashcard.' });
        });
}

export const createFlashCard = async (req: Request, res: Response) => {
    const flashcard: CreateOrEditFlashCardReqBody = req.body;

    const newFlashCard = new FlashCard(flashcard);
    
    newFlashCard.save()
        .then(() => {
            res.json({ status: 200, message: 'Flashcard Added.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to add Flashcard.' });
        });
}

export const editFlashCard = async (req: Request, res: Response) => {
    const { flashcard_id } = req.params;
    const updated_flashcard: CreateOrEditFlashCardReqBody = req.body;

    FlashCard.findOneAndUpdate({ _id: flashcard_id }, updated_flashcard)
        .then(() => {
            res.json({ status: 200, message: 'Flashcard Edited.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to edit Flashcard.' });
        });
}

export const deleteFlashCard = async (req: Request, res: Response) => {
    const { flashcard_id } = req.params;

    FlashCard.findOneAndDelete({ _id: flashcard_id })
        .then(() => {
            res.json({ status: 200, message: 'Flashcard Deleted.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to delete Flashcard.' });
        });
}