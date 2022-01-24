const API = 'd89a0e08-9108-4238-97a8-a35757336636'
let API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=5'
const API_SEARCH_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=%D0%BB%D1%8E%D0%B4&page=1'
let more = document.querySelector('#more')
const inp = document.querySelector('#inp')

getMovies(API_URL)

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API,
    },
  })
  const respData = await response.json()
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 70) {
    return 'green'
  } else if (vote > 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector('#movies')

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div")
    let sortMovieGenre = []

    let movieRating = movie.rating
    if (+movieRating) {
      movieRating = movieRating * 10
    } else {
      movieRating = movieRating.slice(0, 2)
    }
    movie.genres.forEach(function (genre) {
      sortMovieGenre.push(genre.genre)
    })
    movieEl.classList.add("movie")
    movieEl.innerHTML = `
    <div id="movie_content">
    <img class="movie_img" src="${movie.posterUrlPreview}" alt="">
    </div>
    <div id="movie_info">
        <div id="movie_name">${movie.nameRu}</div>
        <div id="movie_category">${sortMovieGenre.slice(0, 3)}</div>
        <div class="movie_average movie_average_${getClassByRate(movieRating)}">${movieRating}</div>
    </div>
  `;
    moviesEl.appendChild(movieEl)
  });
}

let count = 1
more.addEventListener('click', function changeThePage() {
  count++
  let newPage = API_URL + count
  console.log(newPage);
  getMovies(newPage)
})

