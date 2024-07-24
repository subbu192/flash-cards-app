import express, { IRouter } from "express";

import { createCategory, deleteCategory, editCategory, getFCsFromCategory } from "../controllers/categoryController";

const router: IRouter = express.Router();

router.get('/:category_id', getFCsFromCategory);

router.post('/', createCategory);

router.put('/:category_id', editCategory);

router.delete('/:category_id', deleteCategory);

export default router;