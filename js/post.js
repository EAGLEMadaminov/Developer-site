const elLogOutBtn = document.querySelector(".logout-btn");
const elUserPosts = document.querySelector(".users-posts");
const form = document.querySelector("form");
const allPostsDiv = document.querySelector(".all-posts");
const elShowUniquPostDiv = document.querySelector(".show-unique-post");
const elBackToPostBtn = document.querySelector(".back-to-post-btn");
const elUniqueUserImage = document.querySelector(".user-image");
const elUserName = document.querySelector(".user-name");
const elUserText = document.querySelector(".user-text");
const elUserPostTime = document.querySelector(".user-post-time");
const elLikeBtn = document.querySelector(".like-btn");
const elLikeCount = document.querySelector(".like-count");
const elDislikeBtn = document.querySelector(".dislike-btn");
const elDislikeCount = document.querySelector(".disliek-count");
const elDiscusCount = document.querySelector(".discus-count");
const elDeleteBtn = document.querySelector(".delete-btn");
const elCommentsDiv = document.querySelector(".post-commetns-div");
const elUniquePostForm = document.querySelector(".unique-post-form");

axios.defaults.baseURL = "https://nt-devconnector.onrender.com";
const token = localStorage.getItem("token");

const showAllCommetnsFunc = (item, userProlie) => {
  let count = 0;
  const time = showLocalTimeFunc(new Date(item.date));
  const postDiv = document.createElement("div");
  postDiv.className = "border flex p-5 my-5";
  imageDiv = document.createElement("div");
  const image = document.createElement("img");
  image.setAttribute("src", item.avatar);
  image.className = "rounded-[50%] w-[100px] h-[100px]";
  const name = document.createElement("p");
  name.textContent = item.name;
  name.className = "text-xl text-[#17ABCD] font-semibold";
  imageDiv.append(image, name);
  imageDiv.className = "ml-20 text-center flex flex-col items-center";
  const infoDiv = document.createElement("div");
  infoDiv.className = "ml-10 flex flex-col justify-around";
  const text = document.createElement("h2");
  text.textContent = item.text;
  text.className = "text-2xl font-light";
  const timeP = document.createElement("p");
  timeP.textContent = `Posted on ${time}`;
  timeP.className = "font-light my-3 text-gray-400";
  const btnsDiv = document.createElement("div");
  const likeBtn = document.createElement("button");
  const likeCount = document.createElement("span");
  if (item?.likes?.length > 0) {
    count = item?.likes?.length;
    likeCount.textContent = count;
  }
  likeCount.className = "ml-2";
  const dislikeBtn = document.createElement("button");
  const discusBtn = document.createElement("button");
  likeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="text-gray-400" height="25" width="25" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>`;
  dislikeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="text-gray-400" height="25" width="25" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>`;
  discusBtn.textContent = "Discussion";
  likeBtn.append(likeCount);
  const comment = document.createElement("span");
  if (item?.comments?.length > 0) {
    comment.textContent = item?.comments.length;
    comment.className =
      "ml-1 bg-white text-[#17A2B8] px-1 rounded-lg text-[14px]";
  } else {
    comment.textContent = "";
  }
  discusBtn.append(comment);
  likeBtn.className = "flex items-center p-2 px-3 bg-[#F4F4F4]";
  dislikeBtn.className = "p-2 px-3 bg-[#F4F4F4]";
  discusBtn.className = "p-2 px-5 text-xl bg-[#17A2B8] text-white";
  btnsDiv.className = "flex gap-4";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "px-3 bg-rose-500 text-xl text-white font-bold";
  btnsDiv.append(likeBtn, dislikeBtn, discusBtn);
  if (item.user === userProlie?._id) {
    btnsDiv.append(deleteBtn);
  }
  infoDiv.append(text, timeP, btnsDiv);
  postDiv.append(imageDiv, infoDiv);
  deleteBtn.addEventListener("click", () => deleteMyPostFunc(item));
  likeBtn.addEventListener("click", () => likePostFunc(item._id, likeCount));
  dislikeBtn.addEventListener("click", () =>
    dislikePostFunc(item._id, likeCount)
  );
  discusBtn.addEventListener("click", () =>
    disCusPostFunc(item, likeCount, comment)
  );
  return postDiv;
};

const deletePostCommetFunc = async (one, item) => {
  let comnetId = one._id;
  let postId = item._id;
  let { data } = await axios.delete(
    `/api/posts/comment/${postId}/${comnetId}`,
    {
      headers: {
        "x-auth-token": `${token}`,
      },
    }
  );
  window.location.reload();
};

const showUniqueCommetnsFunc = async (one, item) => {
  let { data: user } = await axios.get("/api/auth", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  const time = showLocalTimeFunc(new Date(one.date));
  const postDiv = document.createElement("div");
  postDiv.className = "border flex p-5 my-5";
  imageDiv = document.createElement("div");
  const image = document.createElement("img");
  image.setAttribute("src", one.avatar);
  image.className = "rounded-[50%] w-[100px] h-[100px]";
  const name = document.createElement("p");
  name.textContent = one.name;
  name.className = "text-xl text-[#17ABCD] font-semibold";
  imageDiv.append(image, name);
  imageDiv.className = "ml-20 text-center flex flex-col items-center";
  const infoDiv = document.createElement("div");
  infoDiv.className = "ml-10 flex flex-col justify-around";
  const text = document.createElement("h2");
  text.textContent = one.text;
  text.className = "text-2xl font-light";
  const timeP = document.createElement("p");
  timeP.textContent = `Posted on ${time}`;
  timeP.className = "font-light my-3 text-gray-400";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className =
    "px-3 w-[50px] bg-rose-500 text-xl text-white font-bold";

  infoDiv.append(text, timeP);
  if (one.user === user._id) {
    infoDiv.append(deleteBtn);
  }
  postDiv.append(imageDiv, infoDiv);
  deleteBtn.addEventListener("click", () => deletePostCommetFunc(one, item));

  elCommentsDiv.append(postDiv);
};

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = form[0].value;
  let { data } = await axios.post(
    "/api/posts",
    { text },
    {
      headers: {
        "x-auth-token": `${token}`,
      },
    }
  );
  elUserPosts.innerHTML = "";
  form[0].value = "";
  getPosts();
});

const deleteMyPostFunc = async (item) => {
  let { data } = await axios.delete(`/api/posts/${item._id}`, {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  window.location.reload();
  console.log(data);
};

const likePostFunc = async (id, element) => {
  try {
    let { data } = await axios.put(`/api/posts/like/${id}`, undefined, {
      headers: {
        "x-auth-token": `${token}`,
      },
    });
    if (data.length >= 0) {
      element.textContent = data.length;
    } else {
      element.textContent = "";
    }
  } catch (error) {
    console.log(error);
  }
};

const dislikePostFunc = async (id, element) => {
  let { data } = await axios.put(`/api/posts/unlike/${id}`, undefined, {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  if (data.length > 0) {
    element.textContent = data.length;
  } else {
    element.textContent = "";
  }
};

const disCusPostFunc = async (item, element, elDiscus) => {
  let { data } = await axios.get("/api/profile/me", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  let time = showLocalTimeFunc(new Date(item.date));
  allPostsDiv.classList.add("hidden");
  elShowUniquPostDiv.classList.remove("hidden");
  elUniqueUserImage.setAttribute("src", item?.avatar);
  elUserName.textContent = item.name;
  elUserText.textContent = item.text;
  elUserPostTime.textContent = `Posted on ${time}`;
  if (data.user._id === item.user) {
    elDeleteBtn.classList.remove("hidden");
  }
  elDeleteBtn.addEventListener("click", () => deleteMyPostFunc(item));
  if (item?.comments?.length > 0) {
    item.comments.forEach((one) => showUniqueCommetnsFunc(one, item));
  }
  elUniquePostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = elUniquePostForm[0].value;
    let { data } = await axios.post(
      `/api/posts/comment/${item._id}`,
      { text },
      {
        headers: {
          "x-auth-token": `${token}`,
        },
      }
    );
  });
};

elBackToPostBtn.addEventListener("click", () => {
  allPostsDiv.classList.remove("hidden");
  elShowUniquPostDiv.classList.add("hidden");
});

async function getPosts() {
  let { data } = await axios.get("/api/posts", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  let { data: user } = await axios.get("/api/auth", {
    headers: {
      "x-auth-token": `${token}`,
    },
  });

  if (data) {
    elUserPosts.classList.remove("hidden");
    data.forEach((item) => {
      const post = showAllCommetnsFunc(item, user);
      elUserPosts.append(post);
    });
  }
}
getPosts();
