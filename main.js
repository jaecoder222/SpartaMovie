import { API_KEY } from "./env.js";

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
          openningBlock(movie);
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
  const container = document.querySelector(".openning");
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
  container.append(box);
};

const commingBlock = (movie) => {
  const container = document.querySelector(".comming");
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

  box.id = movie.id;
  img.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  h3.innerText = `${movie.title}`;
  span.innerText =
    movie.overview === ""
      ? `${movie.title}`
      : `${movie.overview.substring(0, 16)}...`;
  vote.innerText = `⭐️ ${movie.vote_average}`;
  boxImg.addEventListener("click", () => alert(`영화 id: ${movie.id}`));
  boxImg.append(img);
  box.append(boxImg, h3, span, vote);
  container.append(box);
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGM3MDg0MTFmYTQ0OTA0ZjU1MTEyYjg4OGU4NmJiZCIsInN1YiI6IjYyYzM4NGI0NmEzMDBiMDA1OTllYWJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxPuDPcvOeinG_qLSatA6ziItulniuh0dBFyl-Cui6k",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-US&page=1",
  options
)
  .then((response) => response.json())
  .then(({ results }) =>
    results.forEach((movie) => {
      openningBlock(movie);
    })
  )
  .catch((err) => console.error(err));

fetch(
  "https://api.themoviedb.org/3/movie/upcoming?language=ko-US&page=1",
  options
)
  .then((response) => response.json())
  .then(({ results }) =>
    results.map((movie) => {
      commingBlock(movie);
    })
  )

  .catch((err) => console.error(err));

form.addEventListener("submit", searchMovie);
