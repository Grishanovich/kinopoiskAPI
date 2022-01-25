const API = 'd89a0e08-9108-4238-97a8-a35757336636'
let API_URL_100 = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page='
let API_URL_250 = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page='
const API_SEARCH_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=%D0%BB%D1%8E%D0%B4&page=1'
let more = document.querySelector('#more')
const inp = document.querySelector('#inp')
let top100 = document.querySelector('#p_top100')
let top250 = document.querySelector('#p_top250')
let radio = document.querySelectorAll('.radio')


getMovies(API_URL_100)

top100.addEventListener('click', function getTop100() {
  
  getMovies(API_URL_100)
  if (!radio[0].checked) radio[0].checked = true
})

top250.addEventListener('click', function getTop250() {
  getMovies(API_URL_250)
  if (!radio[1].checked) radio[1].checked = true
})

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


function showMovies(data) {
  const moviesEl = document.querySelector('#movies')

  data.films.forEach((movie) => {
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
    const movieEl = document.createElement("div")
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


let counterTop100 = 1
let counterTop250 = 1
more.addEventListener('click', function changeThePage() {
  if (radio[0].checked == true) {
    counterTop100++
    let newPage = API_URL_100 + counterTop100
    console.log(newPage);
    getMovies(newPage)
  }
  if (radio[1].checked == true) {
    counterTop250++
    let newPage = API_URL_250 + counterTop250
    console.log(newPage);
    getMovies(newPage)
  }
})

function getClassByRate(vote) {
  if (vote >= 70) {
    return 'green'
  } else if (vote > 5) {
    return 'orange'
  } else {
    return 'red'
  }
}