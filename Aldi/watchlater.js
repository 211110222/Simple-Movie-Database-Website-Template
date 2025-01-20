/* global toggleMode */
const apiKey = '6d6a7726926c4e1e2cbfbefdf3112379';

function loadWatchlater() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Please log in to view your watch later.');
        return;
    }

    const watchlater = JSON.parse(localStorage.getItem(`${loggedInUser}_watchedlater`)) || [];
    console.log('Loaded watch later for user:', loggedInUser, watchlater);

    if (watchlater.length === 0) {
        document.getElementById('watchlater-list').innerHTML = '<p>No watch later yet.</p>';
        return;
    }

    watchlater.forEach((watch) => {
        fetchMovieDetail(watch);
    });
}

function fetchMovieDetail(watch) {
    const url = `https://api.themoviedb.org/3/${watch.type}/${watch.id}?api_key=${apiKey}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWatchLaterMovie(data))
        .catch((error) => console.error('Error fetching watch later movie:', error));
}

function displayWatchLaterMovie(movie) {
    const watchlaterList = document.getElementById('watchlater-list');
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-item');

    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
    `;

    movieCard.onclick = () => {
        window.location.href = `detail.html?id=${movie.id}&type=${watch.type}`;
    };

    watchlaterList.appendChild(movieCard);
}

document.addEventListener('DOMContentLoaded', loadWatchlater);

// eslint-disable-next-line no-unused-vars
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../Stanly/auth.html';
}

document.getElementById('mode-toggle').addEventListener('click', toggleMode);
