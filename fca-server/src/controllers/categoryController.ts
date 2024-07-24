import { Request, Response } from 'express';
import Category from '../models/categoryModel';
import FlashCard from '../models/flashcardModel';

interface CreateCategoryReqBody {
    name: string,
    user: {
        name: string,
        email: string,
        id: string
    }
}

interface EditCategoryReqBody {
    name: string,
    user: {
        name: string,
        email: string,
        id: string
    },
    new_name: string
}

export const createCategory = async (req: Request, res: Response) => {
    const { name, user }: CreateCategoryReqBody = req.body;

    const newCategory = new Category({
        name: name,
        user: user.id,
    })

    newCategory.save()
        .then(() => {
            res.json({ status: 200, message: 'Category created.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to create Category.' });
        })
}

export const editCategory = async (req: Request, res: Response) => {
    const { name, user, new_name }: EditCategoryReqBody = req.body;

    Category.findOneAndUpdate({ name: name, user: user.id }, { name: new_name })
        .then(() => {
            res.json({ status: 200, message: 'Category Name Changed.' });
        })
        .catch((err) => {
            res.json({ status: 404, message: 'Failed to change category name.' });
        });
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { name, user }: CreateCategoryReqBody = req.body;

    const category = await Category.findOne({ name: name, user: user.id });
    
    FlashCard.deleteMany({ category: category?._id, user: user.id })
        .then(() => {
            Category.findOneAndDelete({ name: name, user: user.id })
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