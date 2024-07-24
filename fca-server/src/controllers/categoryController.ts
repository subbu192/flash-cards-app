import { Request, Response } from 'express';
import Category from '../models/categoryModel';
import FlashCard from '../models/flashcardModel';

interface CreateOrEditCategoryReqBody {
    name: string,
    user: string,
}

export const createCategory = async (req: Request, res: Response) => {
    const category: CreateOrEditCategoryReqBody = req.body;

    const newCategory = new Category(category);

    newCategory.save()
        .then(() => {
            res.json({ status: 200, message: 'Category created.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to create Category.' });
        })
}

export const editCategory = async (req: Request, res: Response) => {
    const { category_id } = req.params;
    const updated_category: CreateOrEditCategoryReqBody = req.body;

    Category.findOneAndUpdate({ _id: category_id }, updated_category)
        .then(() => {
            res.json({ status: 200, message: 'Category Edited.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to edit category.' });
        });
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { category_id } = req.params;
    const { user } = req.body;
    
    FlashCard.deleteMany({ category: category_id, user: user })
        .then(() => {
            Category.findOneAndDelete({ _id: category_id, user: user })
                .then(() => {
                    res.json({ status: 200, message: 'Category deleted.' });
                })
                .catch((err) => {
                    res.json({ status: 404, message: 'Failed to delete Category.' });
                });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to delete Category.' });
        });
}

export const getFCsFromCategory = async (req: Request, res: Response) => {
    const { category_id } = req.params;

    FlashCard.find({ category: category_id })
        .then((flashcards) => {
            res.json({ status: 200, flashcards: flashcards, message: 'FlashCards Retrieval Successfull.' });
        })  
        .catch((err) => {
            res.json({ status: 404, message: 'FlashCards Retrieval Failed.' });
        });
}