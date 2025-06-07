const userId = localStorage.getItem("userId");
const BASE_URL = "https://davits-api.vercel.app/api/users";

const userTitleH1 = document.getElementById("user-title");
const writePostForm = document.getElementById("write-post-form");
const postTitleInput = document.getElementById("post-title")
const postContentInput = document.getElementById("post-content")
const postImageUrlInput = document.getElementById("post-title")

getUserById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

getUserById(userId)
    .then(data => {
        const fullname = `${data.result.firstname} ${data.result.lastname}`;
        userTitleH1.textContent += fullname;
    })


writePostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = postTitleInput.value;
    const content = postContentInput.value;
    const imageUrl = postImageUrlInput.value;
    const author = localStorage.getItem("userId");

    const post = { title, content, imageUrl, author }

    fetch("https://davits-api.vercel.app/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(data => {
            postTitleInput.value = ""
            postContentInput.value = ""
            postImageUrlInput.value = ""

            if(data.status === 201) {
                Swal.fire({
                    title: "Good job!",
                    text: "Post added successfully",
                    icon: "success"
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
})