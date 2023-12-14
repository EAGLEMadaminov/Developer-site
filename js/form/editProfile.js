const form = document.querySelector("form");
const elAddSocialBtn = document.querySelector(".add-social-btn");
const elSocialDiv = document.querySelector(".show-social");
const elErrorsInfoDiv = document.querySelector(".errors-info");
const elLogOutBtn = document.querySelector(".logout-btn");

const token = localStorage.getItem("token");
if (!token) {
  window.location.replace("../login.html");
}

elLogOutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("../login.html");
});

axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

let hasSocial = false;

(async function getUSerInfo() {
  let { data } = await axios.get("/api/profile/me", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  console.log(data);
  form[0].value = data.status;
  form[1].value = data?.company;
  form[2].value = data?.website;
  form[3].value = data?.location;
  form[4].value = data?.skills.toString();
  form[5].value = data?.githubusername;
  form[6].value = data?.bio;
  form[8].value = data?.social.twitter;
  form[9].value = data?.social.facebook;
  form[10].value = data?.social.youtube;
  form[11].value = data?.social.linkedin;
  form[12].value = data?.social.instagram;
})();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = form[0].value;
  const company = form[1].value;
  const website = form[2].value;
  const location = form[3].value;
  const skills = form[4].value;
  const githubusername = form[5].value;
  const bio = form[6].value;
  let profile = {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
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
    console.log(data);
  } catch (error) {
    console.log(error);

    let p = document.createElement("p");
    p.className = "my-4 mx-4 bg-rose-400 text-xl p-2 text-white";
    p.textContent = error.message;
    elErrorsInfoDiv.append(p);
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
