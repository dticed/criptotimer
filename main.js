$(document).ready(function () {
  $('.navbar-nav li').on('click', 'a', function() {
    $('.navbar-nav a.active').removeClass('active');
    $(this).addClass('active');
  })
})
