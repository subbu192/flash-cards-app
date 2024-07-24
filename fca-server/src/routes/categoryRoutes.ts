import express, { IRouter } from "express";

import { createCategory, deleteCategory, editCategory, getFCsFromCategory } from "../controllers/categoryController";

const router: IRouter = express.Router();

router.get('/:category_id', getFCsFromCategory);

router.post('/', createCategory);

router.put('/', editCategory);

router.delete('/', deleteCategory);

export default router;