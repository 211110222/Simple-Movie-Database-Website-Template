/* global fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, searchResults, apiKey, spinner displayResults */
const genreFilter = document.getElementById('genre-filter')
const languageFilter = document.getElementById('language-filter')
const releaseYearInput = document.getElementById('release-year')
const ratingInput = document.getElementById('rating')
const resetFiltersButton = document.getElementById('reset-filters')

document.addEventListener('DOMContentLoaded', function () {
  fetchGenres()
  fetchLanguages()
  fetchPopularMovies()
  fetchTopRatedMovies()
  fetchUpcomingMovies()
  showDefaultSections(true)
  resetFiltersButton.style.display = 'none'
})

function showDefaultSections (show) {
  const sections = document.querySelectorAll('.popular-movies')
  sections.forEach((section) => {
    section.style.display = show ? 'block' : 'none'
  })

  if (show) {
    searchResults.innerHTML = ''
  }
}

genreFilter.addEventListener('change', handleFilterChange)
releaseYearInput.addEventListener('input', handleFilterChange)
languageFilter.addEventListener('change', handleFilterChange)
ratingInput.addEventListener('input', handleFilterChange)
resetFiltersButton.addEventListener('click', resetFilters)

function handleFilterChange () {
  const isFilterActive =
    genreFilter.value !== '' ||
    releaseYearInput.value !== '' ||
    languageFilter.value !== '' ||
    ratingInput.value !== ''

  if (isFilterActive) {
    showDefaultSections(false)
    applyFilters()
    resetFiltersButton.style.display = 'block'
  } else {
    showDefaultSections(true)
    searchResults.innerHTML = ''
    resetFiltersButton.style.display = 'none'
  }
}

function resetFilters () {
  genreFilter.value = ''
  releaseYearInput.value = ''
  languageFilter.value = ''
  ratingInput.value = ''

  showDefaultSections(true)

  searchResults.innerHTML = ''

  fetchPopularMovies()
  fetchTopRatedMovies()
  fetchUpcomingMovies()

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function fetchGenres () {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      populateGenreDropdown(data.genres)
    })
    .catch((error) => console.error('Error fetching genres:', error))
}

function populateGenreDropdown (genres) {
  genreFilter.innerHTML = '<option value="">Select Genre</option>'
  genres.forEach((genre) => {
    const option = document.createElement('option')
    option.value = genre.id
    option.textContent = genre.name
    genreFilter.appendChild(option)
  })
}

function fetchLanguages () {
  fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      populateLanguageDropdown(data)
    })
    .catch((error) => console.error('Error fetching languages:', error))
}

function populateLanguageDropdown (languages) {
  languageFilter.innerHTML = '<option value="">Select Language</option>'
  languages.forEach((language) => {
    const option = document.createElement('option')
    option.value = language.iso_639_1
    option.textContent = language.english_name
    languageFilter.appendChild(option)
  })
}

function applyFilters () {
  const genreId = genreFilter.value
  const releaseYear = releaseYearInput.value
  const language = languageFilter.value
  const minRating = ratingInput.value

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`

  if (genreId) url += `&with_genres=${genreId}`
  if (releaseYear) url += `&primary_release_year=${releaseYear}`
  if (language) url += `&with_original_language=${language}`
  if (minRating) url += `&vote_average.gte=${minRating}`

  spinner.style.display = 'block'
  searchResults.innerHTML = ''

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      if (data.results && data.results.length > 0) {
        displayResults(data.results)
      } else {
        searchResults.innerHTML =
          '<p class="no-results">No movies found matching your criteria.</p>'
      }
      spinner.style.display = 'none'
    })
    .catch((error) => {
      console.error('Error fetching filtered movies:', error)
      searchResults.innerHTML =
        '<p class="error-message">Error loading movies. Please try again.</p>'
      spinner.style.display = 'none'
    })
}
