const postsContainer = document.getElementById("posts-container");
const BASE_URL = "https://davits-api.vercel.app/api/posts";

const loader = document.getElementById("loader");

const renderPosts = (posts) => {
  postsContainer.innerHTML = "";
  loader.classList.add("hidden");

  posts.forEach((post) => {
    postsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <ul class="list-group list-group-flush">
                <li class="list-group-item fw-bold">Title: ${post.title}</li>
                <li class="list-group-item">Content: ${post.content}</li>
                <li class="list-group-item">Author ID: ${post.author}</li>
            </ul>
        </div>
        `;
  });
};

const getPosts = () => {
  postsContainer.innerHTML = "";
  loader.classList.remove("hidden");

  fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const posts = data.result;
      renderPosts(posts);
    })
    .catch((error) => console.error("Error:", error));
};

getPosts();
