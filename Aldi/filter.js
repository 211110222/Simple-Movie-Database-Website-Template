
const genreFilter = document.getElementById("genre-filter"); // Make sure "genre-filter" matches the ID in your HTML
const languageFilter = document.getElementById("language-filter"); // Ensure this matches the actual ID in your HTML
const releaseYearInput = document.getElementById("release-year"); // Adjust ID to match your HTML
const ratingInput = document.getElementById("rating"); // Adjust ID to match your HTML
const resetFiltersButton = document.getElementById("reset-filters");

// Load popular, top rated, and upcoming movies on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchGenres();
    fetchLanguages();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
    showDefaultSections(true); // Menampilkan semua section saat halaman dimuat
    resetFiltersButton.style.display = 'none'; // Sembunyikan tombol reset saat awal
});

// Fungsi untuk mengatur visibility section default
function showDefaultSections(show) {
    const sections = document.querySelectorAll('.popular-movies');
    sections.forEach(section => {
        section.style.display = show ? 'block' : 'none';
    });
    
    // Reset tampilan hasil pencarian jika showing default sections
    if (show) {
        searchResults.innerHTML = '';
    }
}

// Add event listeners for filters
genreFilter.addEventListener('change', handleFilterChange);
releaseYearInput.addEventListener('input', handleFilterChange);
languageFilter.addEventListener('change', handleFilterChange);
ratingInput.addEventListener('input', handleFilterChange);
resetFiltersButton.addEventListener('click', resetFilters); // Event listener untuk tombol reset

// Handler untuk perubahan filter
function handleFilterChange() {
    // Cek apakah ada filter yang aktif
    const isFilterActive = 
        genreFilter.value !== '' || 
        releaseYearInput.value !== '' || 
        languageFilter.value !== '' || 
        ratingInput.value !== '';

    if (isFilterActive) {
        showDefaultSections(false); // Sembunyikan section default
        applyFilters(); // Jalankan filter
        resetFiltersButton.style.display = 'block'; // Tampilkan tombol reset
    } else {
        showDefaultSections(true); // Tampilkan section default
        searchResults.innerHTML = ''; // Bersihkan hasil pencarian
        resetFiltersButton.style.display = 'none'; // Sembunyikan tombol reset
    }
}

// Fungsi untuk mereset filter
function resetFilters() {
    // Reset nilai semua filter
    genreFilter.value = '';
    releaseYearInput.value = '';
    languageFilter.value = '';
    ratingInput.value = '';

    // Tampilkan kembali section default
    showDefaultSections(true);

    // Bersihkan hasil pencarian
    searchResults.innerHTML = '';

    // Refresh tampilan
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();

    // Scroll ke atas halaman
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

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
    genreFilter.innerHTML = '<option value="">Select Genre</option>'; // Reset dan tambah default option
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreFilter.appendChild(option);
    });
}

// Fetch language list from TMDB
function fetchLanguages() {
    fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            populateLanguageDropdown(data);
        })
        .catch(error => console.error('Error fetching languages:', error));
}

function populateLanguageDropdown(languages) {
    languageFilter.innerHTML = '<option value="">Select Language</option>';
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.iso_639_1;
        option.textContent = language.english_name;
        languageFilter.appendChild(option);
 });
}

// Filter section
function applyFilters() {
    const genreId = genreFilter.value;
    const releaseYear = releaseYearInput.value;
    const language = languageFilter.value;
    const minRating = ratingInput.value;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

    if (genreId) url += `&with_genres=${genreId}`;
    if (releaseYear) url += `&primary_release_year=${releaseYear}`;
    if (language) url += `&with_original_language=${language}`;
    if (minRating) url += `&vote_average.gte=${minRating}`;

    spinner.style.display = 'block';
    searchResults.innerHTML = '';
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                displayResults(data.results);
            } else {
                searchResults.innerHTML = '<p class="no-results">No movies found matching your criteria.</p>';
            }
            spinner.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching filtered movies:', error);
            searchResults.innerHTML = '<p class="error-message">Error loading movies. Please try again.</p>';
            spinner.style.display = 'none';
        });
}