// eslint-disable-next-line no-unused-vars
function toggleMode () {
  document.body.classList.toggle('light-mode')

  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light')
  } else {
    localStorage.setItem('theme', 'dark')
  }
}

function loadTheme () {
  const theme = localStorage.getItem('theme')

  // Terapkan mode yang disimpan
  if (theme === 'light') {
    document.body.classList.add('light-mode')
  } else {
    document.body.classList.remove('light-mode')
  }
}

window.addEventListener('DOMContentLoaded', loadTheme)
