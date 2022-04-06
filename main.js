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
  $.ajax({
    type: 'GET',
    url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20solana%2C%20cardano&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    success: function (data) {
      data.forEach((element) => {
        const crypto = {
          id: element.id,
          image: element.image,
          name: element.name,
          current_price: element.current_price,
          market_cap: element.market_cap,
        }

        if (apiLocalData.length < data.length) {
          createTable(crypto)
        }
        
        const index = apiLocalData.findIndex(
          (object) => object.id === element.id
          )
          
          if (index === -1) {
            apiLocalData.push(crypto)
          } else {
            checkPrices(index, apiLocalData, element)
          }
        })
    },
  })
}

function checkPrices(index, array, currentElement) {
  if (array[index].current_price !== currentElement.current_price) {
    if(array[index].current_price < currentElement.current_price) {
      console.log(`${array[index].id} subiu`)
      $(`tr[id=${currentElement.id}]`).css('color', '#15e720')
    } else {
      console.log(`${array[index].id} desceu`)
      $(`tr[id=${currentElement.id}]`).css('color', 'red')
    }
    array[index].current_price = currentElement.current_price
    updateTable(array[index])
  }
}

function createTable(element) {
  var tr = $('<tr id="' + element.id + '"></tr>')
  var td1 = $('<td></td>')
  var img = $('<img>')
  img.attr('src', element.image)
  img.attr('alt', `${element.name}logo`)
  img.addClass('crypto-images')
  td1.append(img)

  var td2 = $('<td></td>')
  td2.append(element.name)

  var td3 = $('<td></td>')
  td3.append("$"+element.current_price)

  var td4 = $('<td></td>')
  td4.append(element.market_cap)

  tr.append(td1)
  tr.append(td2)
  tr.append(td3)
  tr.append(td4)
  $('#cryptosTable').append(tr)
}

function updateTable(element) {
  $(`tr[id=${element.id}]`).find('td').eq(2).text(`$${element.current_price}`)
  $(`tr[id=${element.id}]`).find('td').eq(4).text(`$${element.market_cap}`)
}
