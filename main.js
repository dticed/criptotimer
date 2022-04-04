$(document).ready(function () {
  $('.navbar-nav li').on('click', 'a', function () {
    $('.navbar-nav a.active').removeClass('active')
    $(this).addClass('active')
  })
 
  $('#btn-btc').on('click', function() {
    console.log('meuzovo')
    $.ajax({
      type: 'GET',
      url: 'https://rest.coinapi.io/v1/exchanges/BINANCE?apikey=B8D30D82-84CA-488C-9497-50A3583A2523',
      success: function (data) {
        $('#binance').text(data[0].exchange_id)
        $('#binanceText').text(data[0].website)
        console.log(data)
      },
    })
  })
})
