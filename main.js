import { API_KEY, NOW_PLAYING, UP_COMMING, OPTIONS } from "./env.js";

// Swiper
var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const form = document.querySelector("form");

const removeAll = () => {
  const movies = document.querySelectorAll(".box");

  movies.forEach((movie) => {
    movie.remove();
  });
};

const searchMovie = (event) => {
  event.preventDefault();

  const input = document.querySelector("input");
  const { value } = input;
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}`;

  if (value) {
    removeAll();
    fetch(searchURL)
      .then((respose) => respose.json())
      .then(({ results }) =>
        results.forEach((movie) => {
          createBlock(movie);
        })
      );
  }
};

const openningBlock = ({
  id,
  backdrop_path,
  title,
  overview,
  vote_average,
}) => {
  const Container = document.querySelector(".openning");
  const box = document.createElement("div");
  const boxImg = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  const vote = document.createElement("div");

  box.className = "box";
  boxImg.className = "box-img";
  img.className = "img";
  h3.className = "h3";
  span.className = "span";
  vote.className = "div";

  box.id = id;
  img.src = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  h3.innerText = `${title}`;
  span.innerText =
    overview === "" ? `${title}` : `${overview.substring(0, 16)}...`;
  vote.innerText = `⭐️ ${vote_average}`;

  boxImg.addEventListener("click", () => alert(`영화 id: ${id}`));

  boxImg.append(img);
  box.append(boxImg, h3, span, vote);
  Container.append(box);

  boxImg.append(img);
  box.append(boxImg, h3, span, vote);
  Container.append(box);
};

const commingBlock = ({ id, backdrop_path, title, overview, vote_average }) => {
  const Container = document.querySelector(".comming");
  const box = document.createElement("div");
  const boxImg = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  const vote = document.createElement("div");

  box.className = "box";
  boxImg.className = "box-img";
  img.className = "img";
  h3.className = "h3";
  span.className = "span";
  vote.className = "div";

  box.id = id;
  img.src = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  h3.innerText = `${title}`;
  span.innerText =
    overview === "" ? `${title}` : `${overview.substring(0, 16)}...`;
  vote.innerText = `⭐️ ${vote_average}`;

  boxImg.addEventListener("click", () => alert(`영화 id: ${id}`));

  boxImg.append(img);
  box.append(boxImg, h3, span, vote);
  Container.append(box);

  boxImg.append(img);
  box.append(boxImg, h3, span, vote);
  Container.append(box);
};

fetch(`${NOW_PLAYING}`, OPTIONS)
  .then((response) => response.json())
  .then(({ results }) =>
    results.forEach((movie) => {
      openningBlock(movie);
    })
  )
  .catch((err) => console.error(err));

fetch(`${UP_COMMING}`, OPTIONS)
  .then((response) => response.json())
  .then(({ results }) =>
    results.map((movie) => {
      commingBlock(movie);
    })
  )
  .catch((err) => console.error(err));

form.addEventListener("submit", searchMovie);
