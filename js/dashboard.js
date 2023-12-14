const elUserName = document.querySelector(".user-name");
const elLogOutBtn = document.querySelector(".logout-btn");
const elShowInfoDiv = document.querySelector(".hide-info");
const elDeleteUSerBtn = document.querySelector(".delete-user-btn");
const elShowUserInfoDiv = document.querySelector(".show-user-info");
const elExperienceBody = document.querySelector(".experience-body");
const elEducationBody = document.querySelector(".education-body");

axios.defaults.baseURL = "https://nt-devconnector.onrender.com";
const token = localStorage.getItem("token");

(async function getUserInfo() {
  let { data } = await axios.get("/api/auth", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  elUserName.textContent = data.name;
})();

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

const deleteOneExFunc = async (item) => {
  let { data } = await axios.delete(`/api/profile/experience/${item._id}`, {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  elExperienceBody.innerHTML = "";
  getCreatedProfile();
};

const deleteOneEduCateFunc = async (item) => {
  let { data } = await axios.delete(`/api/profile/education/${item._id}`, {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  elEducationBody.innerHTML = "";
  getCreatedProfile();
};

async function getCreatedProfile() {
  const { data } = await axios.get(`/api/profile/me`, {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  if (data) {
    elShowInfoDiv.classList.add("hidden");
    elShowUserInfoDiv.classList.remove("hidden");
  }
  if (data.experience.length > 0) {
    console.log(data.experience);
    data.experience.forEach((item) => {
      const tr = document.createElement("tr");
      tr.className = "my-4";
      const company = document.createElement("td");
      company.textContent = item.company;
      const title = document.createElement("td");
      title.textContent = item.title;
      const from = showLocalTimeFunc(new Date(item.from));
      let to = "Now";
      if (item.to) {
        to = showLocalTimeFunc(new Date(item.to));
      }
      const years = document.createElement("td");
      years.textContent = `${from}- ${to}`;
      const deleteTD = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "bg-rose-500 text-white p-2 px-3";
      deleteTD.append(deleteBtn);
      let all = [company, title, years, deleteTD];
      all.forEach((one) => {
        one.className = "px-5";
      });

      deleteBtn.addEventListener("click", () => deleteOneExFunc(item));
      tr.append(company, title, years, deleteTD);
      elExperienceBody.append(tr);
    });
  }
  if (data.education.length > 0) {
    console.log(data.education);
    data.education.forEach((item) => {
      const tr = document.createElement("tr");
      tr.className = "my-4";
      const company = document.createElement("td");
      company.textContent = item?.school;
      const title = document.createElement("td");
      title.textContent = item?.degree;
      const from = showLocalTimeFunc(new Date(item.from));
      let to = "Now";
      if (item.to) {
        to = showLocalTimeFunc(new Date(item.to));
      }
      const years = document.createElement("td");
      years.textContent = `${from}- ${to}`;
      const deleteTD = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "bg-rose-500 text-white p-2 px-3";
      deleteTD.append(deleteBtn);
      let all = [company, title, years, deleteTD];
      all.forEach((one) => {
        one.className = "px-5";
      });

      deleteBtn.addEventListener("click", () => deleteOneEduCateFunc(item));
      tr.append(company, title, years, deleteTD);
      elEducationBody.append(tr);
    });
  }
}

getCreatedProfile();

let confirmInfo = false;
elDeleteUSerBtn.addEventListener("click", async () => {
  confirmInfo = confirm("Are you sure? This can NOT be undone! ");
  if (confirmInfo) {
    let { data } = await axios.delete("/api/profile", {
      headers: {
        "x-auth-token": `${token}`,
      },
    });
    window.location.replace("./login.html");
    console.log(data);
  }
});
