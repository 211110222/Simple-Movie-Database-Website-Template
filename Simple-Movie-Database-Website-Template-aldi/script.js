// const apiKey = '6d6a7726926c4e1e2cbfbefdf3112379';
// const searchInput = document.getElementById('search-bar');
// const genreFilter = document.getElementById('genre-filter');
// const ratingFilter = document.getElementById('rating-filter');
// // const headerSearchInput = document.getElementById('header-search-bar');
// const searchResults = document.getElementById('search-results');
// const spinner = document.getElementById('spinner');
// const popularMovieList = document.getElementById('popular-movie-list');
// const TopRatedMovieList = document.getElementById('top-movies')
// const UpcomingMoviesList = document.getElementById('upcoming-movies')

// // Load popular movies on page load
// document.addEventListener('DOMContentLoaded', function () {
//     fetchPopularMovies();
//     fetchTopRatedMovies ();
//     fetchUpcomingMovies();
// });

// searchInput.addEventListener('input', function () {
//     const query = searchInput.value;
//     if (query.length > 2) {
//         fetchMovies(query);
//     } else {
//         searchResults.innerHTML = '';
//         spinner.style.display = 'none';
//     }
// });

// // Fetch movie search results
// function fetchMovies(query) {
//     spinner.style.display = 'block'; // Show spinner
//     searchResults.innerHTML = ''; // Clear previous results

//     fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
//         .then(response => response.json())
//         .then(data => {
//             displayResults(data.results);
//             spinner.style.display = 'none'; // Hide spinner
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             spinner.style.display = 'none';
//         });
// }

// function displayResults(results) {
//     console.log(results); // Tambahkan log ini untuk cek data
//     searchResults.innerHTML = '';
//     results.forEach(result => {
//         const movieItem = document.createElement('div');
//         movieItem.classList.add('movie-item');
//         movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title || result.name}">`;
//         movieItem.onclick = () => showDetails(result.id, result.media_type);
//         searchResults.appendChild(movieItem);
//     });
// }

// // Navigate to detail page
// function showDetails(id, type) {
//     window.location.href = `detail.html?id=${id}&type=${type}`;
// }

// // Fetch popular movies from TMDB
// function fetchPopularMovies() {
//     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             displayPopularMovies(data.results);
//         })
//         .catch(error => {
//             console.error('Error fetching popular movies:', error);
//         });
// }
// // Display popular movies in the grid
// function displayPopularMovies(movies) {
//     popularMovieList.innerHTML = '';
//     movies.forEach(movie => {
//         const movieItem = document.createElement('div');
//         movieItem.classList.add('movie-item');
//         movieItem.innerHTML = `
//             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//         `;
//         movieItem.onclick = () => showDetails(movie.id, 'movie');
//         popularMovieList.appendChild(movieItem);
//     });
// }
// // Fetch Top Rated movies from TMDB
// function fetchTopRatedMovies() {
//     fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             displayTopRatedMovies(data.results);
//         })
//         .catch(error => {
//             console.error('Error fetching Top Rated movies:', error);
//         });
// }
// // Display popular movies in the grid
// function displayTopRatedMovies(movies) {
//     TopRatedMovieList.innerHTML = '';
//     movies.forEach(movie => {
//         const movieItem = document.createElement('div');
//         movieItem.classList.add('movie-item');
//         movieItem.innerHTML = `
//             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//         `;
//         movieItem.onclick = () => showDetails(movie.id, 'movie');
//         TopRatedMovieList.appendChild(movieItem);
//     });
// }
// // Fetch Upcoming movies from TMDB
// function fetchUpcomingMovies() {
//     fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             displayUpcomingMovies(data.results);
//         })
//         .catch(error => {
//             console.error('Error fetching Upcoming movies:', error);
//         });
// }
// // Display popular movies in the grid
// function displayUpcomingMovies(movies) {
//     UpcomingMoviesList.innerHTML = '';
//     movies.forEach(movie => {
//         const movieItem = document.createElement('div');
//         movieItem.classList.add('movie-item');
//         movieItem.innerHTML = `
//             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//         `;
//         movieItem.onclick = () => showDetails(movie.id, 'movie');
//        UpcomingMoviesList.appendChild(movieItem);
//     });
// }


// const apiKey = '6d6a7726926c4e1e2cbfbefdf3112379';
// const searchInput = document.getElementById('search-bar');
// const genreFilter = document.getElementById('genre-filter');
// const ratingFilter = document.getElementById('rating-filter');
// const searchResults = document.getElementById('search-results');
// const spinner = document.getElementById('spinner');
// const popularMovieList = document.getElementById('popular-movie-list');
// const TopRatedMovieList = document.getElementById('top-movies');
// const UpcomingMoviesList = document.getElementById('upcoming-movies');

// // Load popular, top rated, and upcoming movies on page load
// document.addEventListener('DOMContentLoaded', function () {
//     fetchGenres();
//     fetchPopularMovies();
//     fetchTopRatedMovies();
//     fetchUpcomingMovies();
// });

// // Add event listeners for filters
// genreFilter.addEventListener('change', applyFilters);
// ratingFilter.addEventListener('input', applyFilters);

// // Fetch genre list from TMDB
// function fetchGenres() {
//     fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             populateGenreDropdown(data.genres);
//         })
//         .catch(error => console.error('Error fetching genres:', error));
// }

// // Populate genre dropdown
// function populateGenreDropdown(genres) {
//     genres.forEach(genre => {
//         const option = document.createElement('option');
//         option.value = genre.id;
//         option.textContent = genre.name;
//         genreFilter.appendChild(option);
//     });
// }

// // Apply filters to movie search results
// function applyFilters() {
//     const genreId = genreFilter.value;
//     const minRating = ratingFilter.value;
//     let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

//     // Add genre filter if selected
//     if (genreId) {
//         url += `&with_genres=${genreId}`;
//     }

//     // Add minimum rating filter if provided
//     if (minRating) {
//         url += `&vote_average.gte=${minRating}`;
//     }

//     // Fetch and display filtered movies
//     spinner.style.display = 'block';
//     searchResults.innerHTML = '';
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             displayResults(data.results);
//             spinner.style.display = 'none';
//         })
//         .catch(error => {
//             console.error('Error fetching filtered movies:', error);
//             spinner.style.display = 'none';
//         });
// }

// // Display search results
// function displayResults(results) {
//     searchResults.innerHTML = '';
//     results.forEach(result => {
//         const movieItem = document.createElement('div');
//         movieItem.classList.add('movie-item');
//         movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title || result.name}">`;
//         movieItem.onclick = () => showDetails(result.id, result.media_type);
//         searchResults.appendChild(movieItem);
//     });
// }

// // Show details for selected movie
// function showDetails(id, type) {
//     window.location.href = `detail.html?id=${id}&type=${type}`;
// }

const apiKey = '6d6a7726926c4e1e2cbfbefdf3112379';
const searchInput = document.getElementById('search-bar');
const genreFilter = document.getElementById('genre-filter');
const ratingFilter = document.getElementById('rating-filter');
const yearFilter =  document.getElementById('release-filter');
const languageFilter =  document.getElementById('language-filter');
const searchResults = document.getElementById('search-results');
const spinner = document.getElementById('spinner');
const popularMovieList = document.getElementById('popular-movie-list');
const TopRatedMovieList = document.getElementById('top-movies');
const UpcomingMoviesList = document.getElementById('upcoming-movies');

// Load popular, top rated, and upcoming movies on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchGenres();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
});

// Add event listeners for filters
genreFilter.addEventListener('change', applyFilters);
ratingFilter.addEventListener('input', applyFilters);

// Fetch genre list from TMDB
function fetchGenres() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            populateGenreDropdown(data.genres);
        })
        .catch(error => console.error('Error fetching genres:', error));
}

// Populate genre dropdown
function populateGenreDropdown(genres) {
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreFilter.appendChild(option);
    });
}

// Apply filters to movie search results
function applyFilters() {
    const genreId = genreFilter.value;
    const minRating = ratingFilter.value;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    // Add genre filter if selected
    if (genreId) {
        url += `&with_genres=${genreId}`;
    }

    // Add minimum rating filter if provided
    if (minRating) {
        url += `&vote_average.gte=${minRating}`;
    }

    // Fetch and display filtered movies
    spinner.style.display = 'block';
    searchResults.innerHTML = '';
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

// Display search results
function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title || result.name}">`;
        movieItem.onclick = () => showDetails(result.id, result.media_type);
        searchResults.appendChild(movieItem);
    });
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

// Show details for selected movie
function showDetails(id, type) {
    window.location.href = `detail.html?id=${id}&type=${type}`;
}