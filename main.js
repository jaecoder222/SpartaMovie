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
// dotenv.config();
// const API_KEY = process.env.API_KEY;
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
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=8dc708411fa44904f55112b888e86bbd`;

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

const createBlock = ({ id, backdrop_path, title, overview, vote_average }) => {
  const container = document.querySelector(".movies-container");
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
  .then(({ results }) => {
    results.forEach((movie) => {
      createBlock(movie);
    });
  })
  .catch((err) => console.error(err));

form.addEventListener("submit", searchMovie);