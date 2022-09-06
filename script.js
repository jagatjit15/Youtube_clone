// curl \
/*
  'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=kgf&key=AIzaSyAkETTyXgdm-UYoG48moPT_beX_r_oNt9A' \
  --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  --header 'Accept: application/json' \
  --compressed
*/
let music = document.querySelector("#music");
let movie = document.querySelector("#movie");
let comedy = document.querySelector("#comedy");
let blog = document.querySelector("#blog");
let roast = document.querySelector("#roast");

let search = async () => {
  let query = document.getElementById("query").value;
  let data = await getData(query);
  append(data);
};
let getData = async (query) => {
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyAkETTyXgdm-UYoG48moPT_beX_r_oNt9A`;
  let res = await fetch(url);
  let data = await res.json();
  return data.items;
};

let HomePgae = JSON.parse(localStorage.getItem("HomePgae")) || [];

let append = (data) => {
  let container = document.getElementById("container");
  container.innerText = null;
  data.forEach((ele) => {
    // snippet --> title
    //snippet -->   thumbnails --> medium --> url;
    let card = document.createElement("div");
    card.onclick = () => {
      storeVideo(ele);
    };
    let img = document.createElement("img");
    img.src = ele.snippet.thumbnails.medium.url;
    let h3 = document.createElement("h3");
    h3.innerText = ele.snippet.title;

    card.append(img, h3);
    container.append(card);
  });
};

// storing to localstorage

let storeVideo = (data) => {
  localStorage.setItem("video", JSON.stringify(data));
  window.location.href = "playback.html";
};

// filterBtns

music.onclick = async () => {
  let query = "music";
  let data = await getData(query);
  append(data);
};
movie.onclick = async () => {
  let query = "movie";
  let data = await getData(query);
  localStorage.setItem("HomePgae", JSON.stringify(data));
  append(data);
};
comedy.onclick = async () => {
  let query = "comedy";
  let data = await getData(query);
  append(data);
};
blog.onclick = async () => {
  let query = "blog";
  let data = await getData(query);
  append(data);
};
roast.onclick = async () => {
  let query = "roast";
  let data = await getData(query);
  append(data);
};

// homepage permanent data;

let homePageData = async () => {
  let query = "shorts";
  let data = await getData(query);
  append(data);
};
