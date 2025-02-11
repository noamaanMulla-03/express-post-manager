const output = document.getElementById("posts");
const btn = document.getElementById("get-posts-btn");
const form = document.getElementById("post-form");

const postCard = (post) => {
	return `<div class="card">
                <h3 class="card__title">${post.title}</h3>
                <p class="card__content">${post.content}</p>
                <div class="card__date">
                    April 15, 2022
                </div>
                <div class="card__arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                        <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                    </svg>
                </div>
            </div>`;
};

const getPosts = async () => {
	const res = await fetch("/api/post");

	try {
		if (!res.ok) throw new Error("Failed to fetch posts");

		const posts = await res.json();
		output.innerHTML = "";

		posts.forEach((post) => {
			const postElement = document.createElement("div");
			postElement.innerHTML = postCard(post);
			output.appendChild(postElement);
		});
	} catch (error) {
		console.log(error);
	}
};

btn.addEventListener("click", getPosts);

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(form);

	const title = formData.get("title");
	const content = formData.get("content");

	const res = await fetch("/api/post", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, content }),
	});

	try {
		if (!res.ok) throw new Error("Failed to create post");

		// const newPost = await res.json();
		// const newPostCard = document.createElement("div");

		// newPostCard.innerHTML = postCard(newPost);
		// output.appendChild(newPostCard);
		getPosts();
	} catch (error) {
		alert(error.message);
		console.log(error);
	}
});
