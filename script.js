const apiKey = '73da3c2a52ca1beaa0d9360994a2d8a2';
const searchInput = document.getElementById('search-bar');
const headerSearchInput = document.getElementById('header-search-bar');
const searchResults = document.getElementById('search-results');
const spinner = document.getElementById('spinner');
const popularMovieList = document.getElementById('popular-movie-list');
const TopRatedMovieList = document.getElementById('top-movies')
const UpcomingMoviesList = document.getElementById('upcoming-movies')

// Load popular movies on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchPopularMovies();
});
// Load Top Rated movies on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchTopRatedMovies ();
});
// Load Upcoming movies on page load
document.addEventListener('DOMContentLoaded', function () {
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

// Fetch movie search results
function fetchMovies(query) {
    spinner.style.display = 'block'; // Show spinner
    searchResults.innerHTML = ''; // Clear previous results

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
            spinner.style.display = 'none'; // Hide spinner
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
        `;
        movieItem.onclick = () => showDetails(result.id, result.media_type);
        searchResults.appendChild(movieItem);
    });
}

// Navigate to detail page
function showDetails(id, movie) {
    window.location.href = `detail.html?id=${id}&type=${movie}`;
}

// Fetch popular movies from TMDB
function fetchPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayPopularMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching popular movies:', error);
        });
}
// Display popular movies in the grid
function displayPopularMovies(movies) {
    popularMovieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
        movieItem.onclick = () => showDetails(movie.id, 'movie');
        popularMovieList.appendChild(movieItem);
    });
}
// Fetch Top Rated movies from TMDB
function fetchTopRatedMovies() {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayTopRatedMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching Top Rated movies:', error);
        });
}
// Display popular movies in the grid
function displayTopRatedMovies(movies) {
    TopRatedMovieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
        movieItem.onclick = () => showDetails(movie.id, 'movie');
        TopRatedMovieList.appendChild(movieItem);
    });
}
// Fetch Upcoming movies from TMDB
function fetchUpcomingMovies() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayUpcomingMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching Upcoming movies:', error);
        });
}
// Display popular movies in the grid
function displayUpcomingMovies(movies) {
    UpcomingMoviesList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
        movieItem.onclick = () => showDetails(movie.id, 'movie');
       UpcomingMoviesList.appendChild(movieItem);
    });
}
