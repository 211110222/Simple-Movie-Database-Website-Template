const apiKey = '6d6a7726926c4e1e2cbfbefdf3112379';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const mediaType = 'movie';

// Fetch movie details
function fetchMovieDetails(movieId, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${apiKey}&append_to_response=videos`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
            fetchRelatedMovies(movieId, mediaType); // Fetch related movies after movie details
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

// Display movie details on the page
function displayMovieDetails(movie) {
    document.getElementById('movie-title').textContent = movie.title || movie.name;
    document.getElementById('release-date').textContent = `Release Date: ${movie.release_date || movie.first_air_date}`;
    document.getElementById('duration').textContent = `Duration: ${movie.runtime || movie.episode_run_time} minutes`;
    document.getElementById('summary').textContent = movie.overview;

    const trailer = movie.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    if (trailer) {
        document.getElementById('movie-trailer').src = `https://hnembed.cc/embed/movie/${movieId}`;
    } else {
        document.getElementById('movie-trailer').src = `https://vidsrc.dev/embed/movie/${movieid}`; // Fallback if no trailer
    }
}

// Fetch related movies
function fetchRelatedMovies(movieId, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}/similar?api_key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRelatedMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching related movies:', error);
        });
}

// Display related movies in slider
function displayRelatedMovies(movies) {
    const slider = document.getElementById('related-movies-slider');
    slider.innerHTML = ''; // Clear previous related movies

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title || movie.name}">
        `;
        movieItem.onclick = () => showDetails(movie.id, 'movie');
        slider.appendChild(movieItem);
    });
}

// Navigate to the detail page of the related movie
function showDetails(id, type) {
    window.location.href = `detail.html?id=${id}&type=${type}`;
}

// Fetch movie details on page load and load theme
document.addEventListener('DOMContentLoaded', function () {
    loadTheme();  // Load saved theme
    fetchMovieDetails(movieId, mediaType);  // Fetch movie details
});

// Attach toggle event listener for theme
document.getElementById('mode-toggle').addEventListener('click', toggleMode);
