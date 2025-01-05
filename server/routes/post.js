import { Router } from "express";
import {
	getPost,
	getPostById,
	createPost,
	updatePost,
	deletePost,
} from "../controller/post.js";

const router = Router();

router.get("/", getPost);

router.get("/:id", getPostById);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
