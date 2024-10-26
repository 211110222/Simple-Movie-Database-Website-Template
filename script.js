const apiKey = '73da3c2a52ca1beaa0d9360994a2d8a2';

const searchInput = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');
const spinner = document.getElementById('spinner');
const popularMovieList = document.getElementById('popular-movie-list');
const TopRatedMovieList = document.getElementById('top-movies');
const UpcomingMoviesList = document.getElementById('upcoming-movies');

const genreFilter = document.getElementById('genre-filter');
const yearFilter = document.getElementById('year-filter');
const languageFilter = document.getElementById('language-filter');
const ratingFilter = document.getElementById('rating-filter');

// Load genres and popular movies on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchGenres();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
});

searchInput.addEventListener('input', function () {
    const query = searchInput.value;
    if (query.length > 2) {
        fetchMovies(query);
    } else {
        searchResults.innerHTML = '';
        spinner.style.display = 'none';
    }
});

[genreFilter, yearFilter, languageFilter, ratingFilter].forEach(filter => {
    filter.addEventListener('change', fetchFilteredMovies);
});

// Fetch movie search results
function fetchMovies(query) {
    spinner.style.display = 'block';
    searchResults.innerHTML = '';
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
            spinner.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            spinner.style.display = 'none';
        });
}

function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title || result.name}">
            <p>${result.title}</p>
        `;
        movieItem.onclick = () => showDetails(result.id);
        searchResults.appendChild(movieItem);
    });
}

function showDetails(id) {
    window.location.href = `detail.html?id=${id}`;
}

// Fetch popular, top-rated, and upcoming movies
function fetchPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayPopularMovies(data.results);
        })
        .catch(error => console.error('Error fetching popular movies:', error));
}

function fetchTopRatedMovies() {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayTopRatedMovies(data.results);
        })
        .catch(error => console.error('Error fetching top-rated movies:', error));
}

function fetchUpcomingMovies() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayUpcomingMovies(data.results);
        })
        .catch(error => console.error('Error fetching upcoming movies:', error));
}

// Display popular, top-rated, and upcoming movies in the grid
function displayPopularMovies(movies) {
    popularMovieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
        movieItem.onclick = () => showDetails(movie.id);
        popularMovieList.appendChild(movieItem);
    });
}

function displayTopRatedMovies(movies) {
    TopRatedMovieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
        movieItem.onclick = () => showDetails(movie.id);
        TopRatedMovieList.appendChild(movieItem);
    });
}

function displayUpcomingMovies(movies) {
    UpcomingMoviesList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
        movieItem.onclick = () => showDetails(movie.id);
        UpcomingMoviesList.appendChild(movieItem);
    });
}

// Fetch and display genre options
async function fetchGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        const data = await response.json();
        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

// Fetch movies based on filters
function fetchFilteredMovies() {
    spinner.style.display = 'block';
    searchResults.innerHTML = '';

    const genre = genreFilter.value;
    const year = yearFilter.value;
    const language = languageFilter.value;
    const rating = ratingFilter.value;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&primary_release_year=${year}`;
    if (language) url += `&with_original_language=${language}`;
    if (rating) url += `&vote_average.gte=${rating}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
            spinner.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching filtered movies:', error);
            spinner.style.display = 'none';
        });
}