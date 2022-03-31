let navbarItems = document.querySelector('.navbar-nav')

navbarItems.addEventListener('click', function(e) {
  console.log(e.target.innerText)
})