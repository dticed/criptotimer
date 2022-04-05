const apiLocalData = []

$(document).ready(function () {
  $('.navbar-nav li').on('click', 'a', function () {
    $('.navbar-nav a.active').removeClass('active')
    $(this).addClass('active')
  })

  updateValues()

  $('#btnBtc').on('click', updateValues)
})

function updateValues() {
  $('#cryptos-table').html('')
  $.ajax({
    type: 'GET',
    url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20solana%2C%20cardano&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    success: function (data) {
      data.forEach((element) => {
        const crypto = {
          id: element.id,
          current_price: element.current_price,
        }

        createTable(element)
        checkPrices(apiLocalData, element)

        const index = apiLocalData.findIndex(
          (object) => object.id === element.id
        )

        if (index === -1) {
          apiLocalData.push(crypto)
        } else {
          
        }
      })
    },
  })
}

function checkPrices(array, object) {
  
}

function createTable(element) {
  var tr = $('<tr></tr>')
  var td1 = $('<td></td>')
  var img = $('<img>')
  img.attr('src', element.image)
  img.attr('alt', 'btcLogo')
  img.addClass('crypto-images')
  td1.append(img)

  var td2 = $('<td id="' + element.id + '"></td>')
  td2.append(element.name)

  var td3 = $('<td></td>')
  td3.append(element.current_price)

  var td4 = $('<td></td>')
  td4.append(element.market_cap)

  tr.append(td1)
  tr.append(td2)
  tr.append(td3)
  tr.append(td4)
  $('#cryptos-table').append(tr)
}
