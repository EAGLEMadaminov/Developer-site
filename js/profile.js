const elShowInfoDiv = document.querySelector(".show-info");
const elAllInfoDiv = document.querySelector(".all-info");
const elPersonalInfo = document.querySelector(".person-info");
const userName = document.querySelector(".person-name");
const userCompany = document.querySelector(".company");
const elUserLocation = document.querySelector(".location");
const elSocialList = document.querySelector(".social-list");
const elUserBio = document.querySelector(".user-bio");
const elSkillList = document.querySelector(".skill-list");
const elExperienceDiv = document.querySelector(".experience");
const elEducationDiv = document.querySelector(".education");
const elEditProfileLink = document.querySelector(".edit-profile-link");
const elLogOutBtn = document.querySelector(".logout-btn");
const elShowGithubRepos = document.querySelector(".show-github-repos");
const elLoadingEffect = document.querySelector(".loading-effects");
const elWithToken = document.querySelector(".with-token");
const elWothoutToken = document.querySelector(".without-token");

axios.defaults.baseURL = "https://nt-devconnector.onrender.com";
const token = localStorage.getItem("token");

if (token) {
  elWithToken.classList.remove("hidden");
  elWothoutToken.classList.add("hidden");
}

elLogOutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("./login.html");
});

const showLocalTimeFunc = (date) => {
  let time = new Date(date);
  let day = String(time.getDate()).padStart(2, "0");
  let month = String(time.getMonth() + 1).padStart(2, "0");
  let year = String(time.getFullYear()).padStart(2, "0");
  const showTime = `${day}/${month}/${year}`;
  return showTime;
};

const showGithubRepofunc = (item) => {
  const repoDiv = document.createElement("div");
  repoDiv.className = "border my-5 flex justify-between p-5";
  const name = document.createElement("a");
  name.textContent = item.name;
  name.className = "text-[#17A2B8] font-semibold text-xl";
  name.setAttribute("href", item.clone_url);
  name.setAttribute("target", "_blank");
  let startsDiv = document.createElement("div");
  startsDiv.className = "flex flex-col";
  const starts = document.createElement("p");
  starts.textContent = `Stars ${item.stargazers_count}`;
  starts.className = "p-1 px-2 bg-[#17A2B8] text-white text-center font-light";
  const watchers = document.createElement("p");
  watchers.textContent = `Watchers ${item.watchers_count}`;
  watchers.className = "bg-[#343A40] text-center my-2 text-white font-light";
  const forks = document.createElement("p");
  forks.textContent = `Forks ${item.forks_count}`;
  forks.className = "bg-gray-400 p-1 px-2 text-center font-light";
  startsDiv.append(starts, watchers, forks);
  repoDiv.append(name, startsDiv);
  elShowGithubRepos.append(repoDiv);
};

const showUniqueProfFunc = async (item) => {
  if (token) {
    let { data: info } = await axios.get("/api/profile/me", {
      headers: {
        "x-auth-token": `${token}`,
      },
    });
    if (info._id === item._id) {
      elEditProfileLink.classList.remove("hidden");
    }
  }

  if (item.githubusername) {
    try {
      let { data: github } = await axios.get(
        `/api/profile/github/${item.githubusername}`,
        {
          headers: {
            "x-auth-token": `${token}`,
          },
        }
      );

      github.forEach(showGithubRepofunc);
    } catch (error) {
      console.log(error);
    }
  }

  elShowInfoDiv.innerHTML = "";
  elAllInfoDiv.innerHTML = "";
  let loading = document.createElement("p");
  loading.className = "text-3xl text-center mt-4 ";
  loading.textContent = "Loading ...";
  elAllInfoDiv.append(loading);
  const { data } = await axios.get(`/api/profile/user/${item.user._id}`, {
    headers: {
      "x-auth-token": `${token}`,
    },
  });

  elPersonalInfo.classList.remove("hidden");
  userName.textContent = item?.user?.name;
  userCompany.textContent = `${item?.status} at ${item?.company}`;
  elUserLocation.textContent = item?.location;
  elUserBio.textContent = item?.bio;
  item.skills.forEach((one) => {
    const li = document.createElement("li");
    li.textContent = `✔ ${one}`;
    li.className = "mx-4 text-xl";
    elSkillList.append(li);
  });
  item.experience.forEach((element) => {
    const from = showLocalTimeFunc(element.from);
    let to = "";
    if (element.to) {
      to = showLocalTimeFunc(element.to);
    } else {
      to = "Now";
    }
    const oneDiv = document.createElement("div");
    oneDiv.className = "border-b-[2px] my-5 pb-4";
    const compName = document.createElement("h2");
    compName.className = "text-xl font-semibold";
    compName.textContent = element?.company;
    const period = document.createElement("p");
    period.textContent = `${from} - ${to}`;
    const position = document.createElement("p");
    position.innerHTML = `<span class="font-semibold">Position:</span> ${element?.title}`;
    const location = document.createElement("p");
    location.innerHTML = `<span class="font-semibold">Location:</span> ${element?.location}`;
    const description = document.createElement("p");
    description.innerHTML = `<span class="font-semibold">Description:</span> ${element?.description}`;
    let all = [compName, period, position, location, description];
    all.forEach((el) => {
      el.classList.add("my-3");
    });
    oneDiv.append(compName, period, position, location, description);
    elExperienceDiv.append(oneDiv);
  });

  item.education.forEach((edu) => {
    const from = showLocalTimeFunc(edu.from);
    let to = "";
    if (edu.to) {
      to = showLocalTimeFunc(edu.to);
    } else {
      to = "Now";
    }
    const oneDiv = document.createElement("div");
    oneDiv.className = "border-b-[2px] my-5 pb-4";
    const eduName = document.createElement("h2");
    eduName.className = "text-xl font-semibold";
    eduName.textContent = edu?.school;
    const period = document.createElement("p");
    period.textContent = `${from} - ${to}`;
    const position = document.createElement("p");
    position.innerHTML = `<span class="font-semibold">Degree:</span> ${edu?.degree}`;
    const location = document.createElement("p");
    location.innerHTML = `<span class="font-semibold">Field Of Study:</span> ${edu?.fieldofstudy}`;
    const description = document.createElement("p");
    description.innerHTML = `<span class="font-semibold">Description:</span> ${edu?.description}`;
    let all = [eduName, period, position, location, description];
    all.forEach((el) => {
      el.classList.add("my-3");
    });
    oneDiv.append(eduName, period, position, location, description);
    elEducationDiv.append(oneDiv);
  });
  loading.remove();
  let one = data.social;
  const socialArr = [
    data.website,
    one.youtube,
    one.twitter,
    one.instagram,
    one.linkedin,
    one.facebook,
  ];
  let iconstArr = [
    ` <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-globe"
      viewBox="0 0 16 16"
    >
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472M3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
    </svg>`,
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      fill="currentColor"
      class="bi bi-youtube"
      viewBox="0 0 16 16"
    >
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z" />
    </svg>`,
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-twitter"
      viewBox="0 0 16 16"
    >
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15" />
    </svg>`,
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-instagram"
      viewBox="0 0 16 16"
    >
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    </svg>`,
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-linkedin"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
    </svg>`,
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-facebook"
      viewBox="0 0 16 16"
    >
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
    </svg>`,
  ];
  socialArr.forEach((item, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", item);
    link.setAttribute("target", "_blank");
    link.innerHTML = iconstArr[index];
    li.append(link);
    if (item) {
      elSocialList.append(li);
    }
  });
};

const showProfilesFunc = (item) => {
  const itemDiv = document.createElement("div");
  itemDiv.className =
    "my-4 border bg-[#F4F4F4] justify-center md:justify-between  p-4 flex w-full";
  const box = document.createElement("div");
  box.className = "items-center justify-center  flex-wrap flex";
  const image = document.createElement("img");
  image.classList.add("rounded-[50%]");
  image.setAttribute("src", item?.user?.avatar);
  const userInfo = document.createElement("div");
  userInfo.className =
    "flex mt-10 md:mt-0 flex-col items-center md:items-start md:ml-[30px]";
  const userName = document.createElement("h2");
  userName.className = "text-2xl md:text-3xl";
  userName.textContent = item?.user?.name;
  const userComp = document.createElement("p");
  userComp.className = "md:text-xl md:font-light mt-1";
  userComp.textContent = `${item?.status} at ${item?.company}`;
  const userLocation = document.createElement("p");
  userLocation.className = "mt-5 md:text-xl md:font-light";
  userLocation.textContent = item?.location;
  const viewProfBtn = document.createElement("button");
  viewProfBtn.className =
    "text-xl w-[150px] mt-4 p-2 px-5 font-light text-white bg-[#17A2B8]";
  viewProfBtn.textContent = "View profile";
  userInfo.append(userName, userComp, userLocation, viewProfBtn);
  const skillList = document.createElement("ul");
  skillList.className =
    "hidden md:flex mr-[200px] text-left flex-col justify-center";
  box.append(image, userInfo);
  item.skills.forEach((one) => {
    const skill = document.createElement("li");
    skill.textContent = `✔ ${one}`;
    skillList.append(skill);
  });
  itemDiv.append(box, skillList);
  elShowInfoDiv.append(itemDiv);
  viewProfBtn.addEventListener("click", () => showUniqueProfFunc(item));
};

(async function getProfiles() {
  elLoadingEffect.classList.remove("hidden");
  let { data } = await axios.get("/api/profile", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  data.forEach(showProfilesFunc);
  elLoadingEffect.classList.add("hidden");
})();
