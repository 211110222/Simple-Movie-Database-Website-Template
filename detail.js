const apiKey = '6d6a7726926c4e1e2cbfbefdf3112379';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const mediaType = urlParams.get('type') || 'movie';

function fetchMovieDetails(movieId, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${apiKey}&append_to_response=videos`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (filterAdultContent(data)) {
                displayMovieDetails(data);
                fetchRelatedMovies(movieId, mediaType);
            } else {
                alert('This movie is not available due to inappropriate content.');
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

function displayMovieDetails(movie) {
    document.getElementById('movie-title').textContent = movie.title || movie.name;
    document.getElementById('release-date').textContent = `Release Date: ${movie.release_date || movie.first_air_date}`;
    document.getElementById('duration').textContent = `Duration: ${movie.runtime || movie.episode_run_time} minutes`;
    document.getElementById('summary').textContent = movie.overview;

    const trailer = movie.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    if (trailer) {
        document.getElementById('movie-trailer').src = `https://www.youtube.com/embed/${trailer.key}`;
    } else {
        document.getElementById('movie-trailer').textContent = 'Trailer not available';
    }
}

function fetchRelatedMovies(movieId, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}/similar?api_key=${apiKey}&include_adult=false&certification_country=US&certification.lte=PG-13`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.results.filter(movie => filterAdultContent(movie));
            displayRelatedMovies(filteredMovies);
        })
        .catch(error => {
            console.error('Error fetching related movies:', error);
        });
}

function displayRelatedMovies(movies) {
    const slider = document.getElementById('related-movies-slider');
    slider.innerHTML = '';
    movies.forEach(movie => {
        if (movie.poster_path) {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title || movie.name}">
            `;
            movieItem.onclick = () => showDetails(movie.id, movie.media_type || 'movie');
            slider.appendChild(movieItem);
        }
    });
}

function showDetails(id, type) {
    window.location.href = `detail.html?id=${id}&type=${type}`;
}

function toggleFavorite() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Please log in to like movies.");
        return;
    }

    let favorites = JSON.parse(localStorage.getItem(`${loggedInUser}_favorites`)) || [];
    const favoriteEntry = { id: String(movieId), type: mediaType };
    const existingIndex = favorites.findIndex(entry => entry.id === String(movieId));

    if (existingIndex !== -1) {
        favorites.splice(existingIndex, 1);
        alert("Removed from favorites.");
    } else {
        favorites.push(favoriteEntry);
        alert("Added to favorites.");
    }
    localStorage.setItem(`${loggedInUser}_favorites`, JSON.stringify(favorites));
    updateLikeButton();
}

function updateLikeButton() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return;

    const favorites = JSON.parse(localStorage.getItem(`${loggedInUser}_favorites`)) || [];
    const likeButton = document.getElementById("like-button");

    if (favorites.find(entry => entry.id === movieId)) {
        likeButton.textContent = "Unlike";
        likeButton.classList.add("liked");
    } else {
        likeButton.textContent = "Like";
        likeButton.classList.remove("liked");
    }
}

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

function filterAdultContent(movie) {
    if (movie.adult) return false;

    const restrictedGenres = ['Adult', 'Erotic'];
    const adultKeywords = [
        'erotic', 'sex', 'explicit', 'nude', 'mature', 'softcore', 'hardcore',
        'complicated relationship', 'sensual', 'seductive', 'affair', 'provocative', 
        'lust', 'romantic obsession', 'porn', 'sexual', 'scandal', 'temptation', 
        'strip', 'fetish', 'kinky', 'incest', 'taboo', 'voyeur', 'pleasure'
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

document.addEventListener('DOMContentLoaded', function () {
    fetchMovieDetails(movieId, mediaType);
    updateLikeButton();
});
document.getElementById('scroll-left').addEventListener('click', function() {
    document.getElementById('related-movies-slider').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

document.getElementById('scroll-right').addEventListener('click', function() {
    document.getElementById('related-movies-slider').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

const slider = document.getElementById('related-movies-slider');
slider.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        slider.scrollBy({
            left: e.deltaY < 0 ? -100 : 100,
            behavior: 'smooth'
        });
    }
});