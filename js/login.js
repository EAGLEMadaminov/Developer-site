const form = document.querySelector("form");
const errorMessage = document.querySelector(".error-message");
axios.defaults.baseURL = "https://nt-devconnector.onrender.com";
const elErrorsInfoDiv = document.querySelector(".errors-info");
let token = localStorage.getItem("token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = form[0].value;
  let password = form[1].value;

  let info = {
    email,
    password,
  };

  try {
    let { data } = await axios.post("/api/auth", info, {
      headers: {
        "x-auth-token": `${token}`,
      },
    });
    localStorage.setItem("token", data.token);
    window.location.replace("./dashboard.html");
  } catch (error) {
    let errors = await error.response.data.errors;
    console.log(errors);
    errors.forEach((item) => {
      let p = document.createElement("p");
      p.className = "my-4 mx-4 bg-rose-400 text-xl p-2 text-white";
      p.textContent = item.msg;
      elErrorsInfoDiv.append(p);
    });
    setTimeout(() => {
      elErrorsInfoDiv.innerHTML = "";
    }, 3_000);
  }
});
