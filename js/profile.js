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

elLogOutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("./login.html");
});
axios.defaults.baseURL = "https://nt-devconnector.onrender.com";
const token = localStorage.getItem("token");

const showLocalTimeFunc = (date) => {
  let time = new Date(date);
  let day = String(time.getDate()).padStart(2, "0");
  let month = String(time.getMonth() + 1).padStart(2, "0");
  let year = String(time.getFullYear()).padStart(2, "0");
  const showTime = `${day}/${month}/${year}`;
  return showTime;
};


const showUniqueProfFunc = async (item) => {
  let { data: info } = await axios.get("/api/profile/me", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  if (info._id === item._id) {
    elEditProfileLink.classList.remove("hidden");
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
  console.log(data);
};

const showProfilesFunc = (item) => {
  const itemDiv = document.createElement("div");
  itemDiv.className =
    "my-4 border bg-[#F4F4F4] justify-between p-4 flex w-full";
  const box = document.createElement("div");
  box.className = "items-center flex";
  const imageDiv = document.createElement("div");
  const image = document.createElement("img");
  image.classList.add("rounded-[50%]");
  image.setAttribute("src", item?.user?.avatar);
  imageDiv.append(image);
  const userInfo = document.createElement("div");
  userInfo.className = "flex flex-col ml-[30px]";
  const userName = document.createElement("h2");
  userName.className = "text-3xl";
  userName.textContent = item?.user?.name;
  const userComp = document.createElement("p");
  userComp.className = "text-xl font-light mt-1";
  userComp.textContent = `${item?.status} at ${item?.company}`;
  const userLocation = document.createElement("p");
  userLocation.className = "mt-5 text-xl font-light";
  userLocation.textContent = item?.location;
  const viewProfBtn = document.createElement("button");
  viewProfBtn.className =
    "text-xl w-[150px] mt-4 p-2 px-5 font-light text-white bg-[#17A2B8]";
  viewProfBtn.textContent = "View profile";
  userInfo.append(userName, userComp, userLocation, viewProfBtn);
  const skillList = document.createElement("ul");
  skillList.className = "flex mr-[200px] text-left flex-col justify-center";
  box.append(imageDiv, userInfo);
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
  let { data } = await axios.get("/api/profile", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  data.forEach(showProfilesFunc);
})();
