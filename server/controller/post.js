let posts = [
	{
		id: 1,
		title: "Post 1",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quasi neque alias consectetur asperiores beatae hic. Itaque officiis commodi at excepturi accusamus, inventore id eum quia ab eius? Aliquam, cum.",
	},
	{
		id: 2,
		title: "Post 2",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quasi neque alias consectetur asperiores beatae hic. Itaque officiis commodi at excepturi accusamus, inventore id eum quia ab eius? Aliquam, cum.",
	},
	{
		id: 3,
		title: "Post 3",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quasi neque alias consectetur asperiores beatae hic. Itaque officiis commodi at excepturi accusamus, inventore id eum quia ab eius? Aliquam, cum.",
	},
];

const getPost = async (req, res) => {
	const limit = parseInt(req.query.limit);

	if (!isNaN(limit) && limit > 0) return res.json(posts.slice(0, limit));

	res.json(posts);
};

const getPostById = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const post = posts.find((post) => post.id === id);

	if (post) return res.json(post);

	const error = new Error(`Post with id ${id} not found`);
	error.status = 404;
	next(error);
};

const createPost = async (req, res, next) => {
	const { title, content } = req.body;

	if (!title || !content) {
		const error = new Error("Include both title and content fields");
		error.status = 400;
		return next(error);
	}

	const id = posts.length + 1;
	const post = { id, title, content };

	posts.push(post);
	res.status(201).json(post);
};

const updatePost = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const post = posts.find((post) => post.id === id);

	if (!post) {
		const error = new Error(`Post with id ${id} not found`);
		error.status = 404;
		return next(error);
	}

	const { title, content } = req.body;
	post.title = title || post.title;
	post.content = content || post.content;

	res.status(200).json(post);
};

const deletePost = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const post = posts.find((post) => post.id === id);

	if (!post) {
		const error = new Error(`Post with id ${id} not found`);
		error.status = 404;
		return next(error);
	}

	posts = posts.filter((post) => post.id !== id);

	res.json({ message: `Post with id ${id} deleted` });
	return res.json(posts);
};

export { getPost, getPostById, createPost, updatePost, deletePost };
// The post.js file contains the routes for the posts API. It defines the following routes:
// GET /api/post - Get all posts
// GET /api/post/:id - Get a post by ID
// POST /api/post - Create a new post
// PUT /api/post/:id - Update a post by ID
// DELETE /api/post/:id - Delete a post by ID
// The file exports the functions for handling these routes.
