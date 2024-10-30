const apiKey = "6d6a7726926c4e1e2cbfbefdf3112379";

function loadFavorites() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Please log in to view your favorites.");
        return;
    }

    const favorites = JSON.parse(localStorage.getItem(`${loggedInUser}_favorites`)) || [];
    console.log("Loaded favorites for user:", loggedInUser, favorites);

    if (favorites.length === 0) {
        document.getElementById("favorites-list").innerHTML = "<p>No favorites yet.</p>";
        return;
    }

    favorites.forEach(favorite => {
        fetchMovieDetail(favorite);
    });
}

function fetchMovieDetail(favorite) {
    const url = `https://api.themoviedb.org/3/${favorite.type}/${favorite.id}?api_key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayFavoriteMovie(data))
        .catch(error => console.error("Error fetching favorite movie:", error));
}

function displayFavoriteMovie(movie) {
    const favoritesList = document.getElementById("favorites-list");
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-item");

    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
    `;

    movieCard.onclick = () => {
        window.location.href = `../detail.html?id=${movie.id}&type=movie`;
    };

    favoritesList.appendChild(movieCard);
}

document.addEventListener("DOMContentLoaded", loadFavorites);
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "auth.html";
}
