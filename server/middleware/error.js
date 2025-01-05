const notFound = (req, res, next) => {
	const error = new Error(
		`Not Found - ${req.method} ${req.protocol}://${req.get("host")}${
			req.originalUrl
		}`
	);
	error.status = 404;
	next(error);
};

const errorHandler = (err, req, res, next) => {
	if (err.status)
		return res.status(err.status).json({ message: err.message });

	res.status(500).json({ message: "Internal Server Error" });
};

export { notFound, errorHandler };
