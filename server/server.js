import express from "express";
import dotenv from "dotenv";
import path from "path";
import postRouter from "./routes/post.js";
import { fileURLToPath } from "url";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();
const app = express();
const { PORT } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/post", postRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
// The server.js file is the entry point of the server. It imports the express module and the dotenv module. It also imports the router from the post.js file, which contains the routes for the posts API.
