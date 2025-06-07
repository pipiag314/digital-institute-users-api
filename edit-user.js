const BASE_URL = "https://davits-api.vercel.app/api/users";
const userId = localStorage.getItem("userId");

const userNameInput = document.getElementById("user-name");
const userLastnameInput = document.getElementById("user-lastname");
const userEmailInput = document.getElementById("user-email");
const userPasswordInput = document.getElementById("user-password");

const editUserForm = document.getElementById("edit-user-form");

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

getUserById(userId).then((data) => {
  userNameInput.value = data.result.firstname;
  userLastnameInput.value = data.result.lastname;
  userEmailInput.value = data.result.email;
  userPasswordInput.value = data.result.password;
});

editUserForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstname = userNameInput.value;
  const lastname = userLastnameInput.value;
  const email = userEmailInput.value;
  const password = userPasswordInput.value;

  const user = { firstname, lastname, email, password };

  fetch(`${BASE_URL}/${userId}`, {
    method: "PUT",
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
        window.location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
