const form = document.querySelector("form");
const elAddSocialBtn = document.querySelector(".add-social-btn");
const elSocialDiv = document.querySelector(".show-social");
const elLogOutBtn = document.querySelector(".logout-btn");

elLogOutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("./login.html");
});

axios.defaults.baseURL = "https://nt-devconnector.onrender.com";
const token = localStorage.getItem("token");

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
    console.log(error);
  }
});

elAddSocialBtn.addEventListener("click", (e) => {
  hasSocial = true;
  e.preventDefault();
  elSocialDiv.classList.toggle("hidden");
});
