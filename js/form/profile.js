const form = document.querySelector("form");
const elAddSocialBtn = document.querySelector(".add-social-btn");
const elSocialDiv = document.querySelector(".show-social");
const elLogOutBtn = document.querySelector(".logout-btn");
const elErrorsInfoDiv = document.querySelector(".errors-info");

const token = localStorage.getItem("token");
if (!token) {
  window.location.replace("../login.html");
}

elLogOutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("./login.html");
});

axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

let hasSocial = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = form[0].value;
  const company = form[1].value;
  const website = form[2].value;
  const location = form[3].value;
  const skills = form[4].value;
  const githubuser = form[5].value;
  const bio = form[6].value;
  let profile = {
    status,
    company,
    website,
    location,
    skills,
    githubuser,
    bio,
  };
  if (hasSocial) {
    profile.twitter = form[8].value;
    profile.facebook = form[9].value;
    profile.youtube = form[10].value;
    profile.linkedin = form[11].value;
    profile.instagram = form[12].value;
  }
  try {
    let { data } = await axios.post("/api/profile", profile, {
      headers: {
        "x-auth-token": `${token}`,
      },
    });
    window.location.replace("../dashboard.html");
  } catch (error) {
    let errors = await error.response.data.errors;
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

elAddSocialBtn.addEventListener("click", (e) => {
  hasSocial = true;
  e.preventDefault();
  elSocialDiv.classList.toggle("hidden");
});
