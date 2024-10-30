const apiKey = '6d6a7726926c4e1e2cbfbefdf3112379';
const searchInput = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');
const spinner = document.getElementById('spinner');
const popularMovieList = document.getElementById('popular-movie-list');
const topRatedMovieList = document.getElementById('top-movies');
const upcomingMoviesList = document.getElementById('upcoming-movies');

// Redirect to auth.html if not logged in
document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "./Stanly/auth.html";
    }
});

// Load movies on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
});

searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    if (query.length > 2) {
        fetchMovies(query);
    } else {
        searchResults.innerHTML = '';
        spinner.style.display = 'none';
    }
});

// Heuristic Filtering Function
function filterAdultContent(movie) {
    if (movie.adult) return false;

    const restrictedGenres = ['Adult'];
    const adultKeywords = [
        'erotic', 'sex', 'explicit', 'nude', 'mature', 
        'softcore', 'complicated relationship', 'sensual', 'seductive', 
        'affair', 'provocative', 'lust', 'romantic obsession'
    ]; 

    if (movie.genre_ids && movie.genre_ids.some(genre => restrictedGenres.includes(genre))) {
        return false;
    }

    const lowerTitle = (movie.title || '').toLowerCase();
    const lowerOverview = (movie.overview || '').toLowerCase();
    if (adultKeywords.some(keyword => lowerTitle.includes(keyword) || lowerOverview.includes(keyword))) {
        return false;
    }

    return true;
}

// Fetch certification for each movie
async function fetchCertification(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const usCertifications = data.results.find(cert => cert.iso_3166_1 === 'US');
        if (usCertifications) {
            const certification = usCertifications.release_dates[0]?.certification;
            return certification;
        }
    } catch (error) {
        console.error(`Error fetching certification for movie ${movieId}:`, error);
    }
    return null;
}

// Main fetch function with certification and keyword filtering
async function fetchMovies(query) {
    spinner.style.display = 'block'; 
    searchResults.innerHTML = ''; 

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false`);
    const data = await response.json();
    
    const filteredResults = [];
    for (const movie of data.results) {
        const passesFilter = filterAdultContent(movie);
        const certification = await fetchCertification(movie.id);

        if (passesFilter && (!certification || !['R', 'NC-17', '18', '19', 'TV-MA'].includes(certification))) {
            filteredResults.push(movie);
        } else {
            console.log(`Filtered out: ${movie.title} due to certification ${certification}`);
        }
    }
    displayResults(filteredResults);
    spinner.style.display = 'none';
}

function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        if (result.poster_path) {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title || result.name}">
            `;
            movieItem.onclick = () => showDetails(result.id, 'movie');
            searchResults.appendChild(movieItem);
        }
    });
}

// Navigate to detail page
function showDetails(id, type) {
    window.location.href = `detail.html?id=${id}&type=${type}`;
}

// Fetch popular movies from TMDB
async function fetchPopularMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&include_adult=false`);
    const data = await response.json();

    const filteredMovies = [];
    for (const movie of data.results) {
        const passesFilter = filterAdultContent(movie);
        const certification = await fetchCertification(movie.id);

        if (passesFilter && (!certification || !['R', 'NC-17', '18', '19', 'TV-MA'].includes(certification))) {
            filteredMovies.push(movie);
        }
    }
    displayPopularMovies(filteredMovies);
}

// Display popular movies in the grid
function displayPopularMovies(movies) {
    popularMovieList.innerHTML = '';
    movies.forEach(movie => {
        if (movie.poster_path) {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            movieItem.onclick = () => showDetails(movie.id, 'movie');
            popularMovieList.appendChild(movieItem);
        }
    });
}

// Fetch Top Rated movies from TMDB
async function fetchTopRatedMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&include_adult=false`);
    const data = await response.json();

    const filteredMovies = [];
    for (const movie of data.results) {
        const passesFilter = filterAdultContent(movie);
        const certification = await fetchCertification(movie.id);

        if (passesFilter && (!certification || !['R', 'NC-17', '18', '19', 'TV-MA'].includes(certification))) {
            filteredMovies.push(movie);
        }
    }
    displayTopRatedMovies(filteredMovies);
}

// Display top rated movies in the grid
function displayTopRatedMovies(movies) {
    topRatedMovieList.innerHTML = '';
    movies.forEach(movie => {
        if (movie.poster_path) {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            movieItem.onclick = () => showDetails(movie.id, 'movie');
            topRatedMovieList.appendChild(movieItem);
        }
    });
}

// Fetch Upcoming movies from TMDB
async function fetchUpcomingMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&include_adult=false`);
    const data = await response.json();

    const filteredMovies = [];
    for (const movie of data.results) {
        const passesFilter = filterAdultContent(movie);
        const certification = await fetchCertification(movie.id);

        if (passesFilter && (!certification || !['R', 'NC-17', '18', '19', 'TV-MA'].includes(certification))) {
            filteredMovies.push(movie);
        }
    }
    displayUpcomingMovies(filteredMovies);
}

// Display upcoming movies in the grid
function displayUpcomingMovies(movies) {
    upcomingMoviesList.innerHTML = '';
    movies.forEach(movie => {
        if (movie.poster_path) {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            movieItem.onclick = () => showDetails(movie.id, 'movie');
            upcomingMoviesList.appendChild(movieItem);
        }
    });
}
function logout() {
    localStorage.removeItem("loggedInUser"); // Remove the login flag
    window.location.href = "./Stanly/auth.html"; // Redirect to login page
}
