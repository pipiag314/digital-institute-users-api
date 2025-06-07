const BASE_URL = "https://davits-api.vercel.app/api/users";

const fetchUsersBtn = document.getElementById("fetch-users-btn");
const usersTable = document.querySelector(".users-table");
const userForm = document.getElementById("user-form");

const loader = document.getElementById("loader");

const error = document.getElementById("error");

const userNameInput = document.getElementById("name");
const userLastNameInput = document.getElementById("lastname");
const userEmailInput = document.getElementById("email");
const userPasswordInput = document.getElementById("password");
const repeatPasswordInput = document.getElementById("repeatPassword");
const addAndFetchInput = document.getElementById("addAndFetch");
const submitFormBtn = document.getElementById("submit-btn");

const fetchUsers = async () => {
  try {
    loader.classList.remove("hidden");
    const response = await fetch(BASE_URL);
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
};

const addNewUser = async (user) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      }),
    });
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
};

const deleteUser = (id) => {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      alert("deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

const editUser = (id) => {
  localStorage.setItem("userId", id);
  window.location.href = "edit-user.html"
}

const writePost = (id) => {
  localStorage.setItem("userId", id)
  window.location.href = "write-post.html"
}

const renderUsers = () => {
  usersTable.innerHTML = `
        <tr>
            <th>N</th>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
        </tr>
    `;
  fetchUsers().then((data) => {
    loader.classList.add("hidden");
    data.result.forEach((user, i) => {
      usersTable.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${user._id}</td>
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>
                          <button onclick="writePost('${user._id}')" class="success-btn">
                          Write Post
                          </button>
                          <button onclick="editUser('${user._id}')" class="edit-btn">
                            Edit User
                          </button>
                          <button onclick="deleteUser('${
                            user._id
                          }')" class="delete-btn">
                              Delete
                          </button>
                        </td>
                    </tr> 
                `;
    });
  });
};
renderUsers();

const submitForm = () => {
  addNewUser({
    name: userNameInput.value,
    lastname: userLastNameInput.value,
    email: userEmailInput.value,
    password: userPasswordInput.value,
  }).then((data) => {
    if (addAndFetchInput.checked) {
      renderUsers();
    }

    userNameInput.value = "";
    userLastNameInput.value = "";
    userEmailInput.value = "";
    userPasswordInput.value = "";
    repeatPasswordInput.value = "";
    addAndFetchInput.checked = false;
    console.log(data);
    alert(`user "${data.result.firstname}" added to the database`);
  });
};

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // validate passwords
  if (userPasswordInput.value !== repeatPasswordInput.value) {
    error.classList.remove("hidden");
    return;
  }
  error.classList.add("hidden");

  submitForm();
});

fetchUsersBtn.addEventListener("click", () => {
  renderUsers();
});
