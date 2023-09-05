const input = document.getElementById('input')
const searchList = document.getElementById('search-list')
const main = document.getElementById('main')
const body = document.getElementById('body')
const item = document.getElementById('item')
const mid = document.getElementById('mid')
const heading = document.getElementById('heading')

async function loadMovie(searchTerm) {
    var URL = `https://www.omdbapi.com/?s=${searchTerm}&apikey=9648785`
    var res = await fetch(`${URL}`)
    var data = await res.json()
    //console.log(data.Search)
    if (data.Response == 'True') displaySearchResult(data.Search)
}

function findMovies() {
    let searchTerm = (input.value).trim()
    if (searchTerm.length > 0) {
        searchList.style.display = 'block'
        loadMovie(searchTerm)
    } else {
        searchList.style.display = 'none'
    }
}

function displaySearchResult(movies) {
    searchList.innerHTML = '';
    for(let idx = 0; idx < movies.length; idx++) {
        let movieList = document.createElement('div')
        movieList.dataset.id = movies[idx].imdbID
        movieList.classList.add('list-movie')
        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster;    
        } else {
            moviePoster = "image-not-found.png"
        }
        movieList.innerHTML = `
        <div class="list-movie">
            <div class="poster">
               <img src='${moviePoster}'>
            </div>
            <div class="poster-details">
               <li class="title">${movies[idx].Title}</li>
               <li class="year">${movies[idx].Year}</li>
            </div>
       </div>`;
       searchList.appendChild(movieList)
    }
    loadMovieDetails()
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.list-movie') 
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.style.display = 'none'
            input.value = '';
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9648785`)
            const movieDetails = await result.json()
            displayMovieDetails(movieDetails)
            //console.log(movieDetails)
            //console.log(movie.dataset.id)
        })
        //console.log(movie)
    })
}

function displayMovieDetails(details) {
    main.innerHTML = `
    <div class="movie-thumbnail">
       <img src='${(details.Poster != 'N/A') ? details.Poster : 'image-not-found.png'}' alt="movie poster">
    </div>
    <div class="details">
       <p style="color: yellow;">${details.Title}</p>
       <p class="letters"><b>Plot: </b>${details.Plot}</p>
       <p class="letters"><b>Genre: </b>${details.Genre}</p>
       <p class="letters"><b>Writer(s): </b>${details.Writer}</p>
       <p class="letters"><b>Actors: </b>${details.Actors}</p>
       <p class="letters"><b>Released: </b>${details.Released}</p>
       <p class="letters"><b>Runtime: </b>${details.Runtime}</p>
       <p class="letters"><b>Director: </b>${details.Director}</p>
       <p class="letters"><b>Ratings: </b>${details.Ratings[1] ? details.Ratings[1].Source + ' ' + details.Ratings[1].Value : 'N/A'}</p>
       <p class="rated"><b>Rated: </b>${details.Rated}</p>
    </div>
    `
}

function toggle() {
    if(item.innerHTML === '<i class="dark-mode fa-regular fa-sun fa-2x" style="color: #ffffff;"></i>') {
        item.innerHTML = '<i class="fa-regular fa-moon fa-2x"></i>'
        body.style.backgroundColor = '#A9A9A9'
        mid.style.backgroundColor = 'white'
        input.style.backgroundColor = '#A9A9A9'
        heading.style.color = 'black'
    } else {
        item.innerHTML = '<i class="dark-mode fa-regular fa-sun fa-2x" style="color: #ffffff;"></i>'
        body.style.backgroundColor = 'black'
        mid.style.backgroundColor = '#454545'
        input.style.backgroundColor = 'white'
        heading.style.color = 'white'
    }
}

item.addEventListener('click', toggle)

window.addEventListener('click', (event) => {
    if (event.target.className != 'input') {
        searchList.style.display = 'none'
    }
})

/*input.addEventListener('click', show)*/
//<p><b>Ratings: </b>${details.Ratings[1].Source + ' ' + details.Ratings[1].Value}</p>