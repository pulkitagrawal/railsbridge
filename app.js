var itemTemplate = $('#templates .item')
var list         = $('#list')

var addItemToPage = function(itemData) {
  var item = itemTemplate.clone()
  item.attr('data-id',itemData.id)
  item.find('.description').text(itemData.description)
  if(itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
}
var loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/pulkitagrawal/"
})

loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData)
  })
})

$('#add-form').on('submit', function(event) {
  itemDescription = event.target.itemDescription.value
  event.preventDefault()
  var creationRequest = $.ajax({
  type: 'POST',
  url: "http://listalous.herokuapp.com/lists/pulkitagrawal/items",
  data: { description: itemDescription, completed: false }
  })
  creationRequest.done(function(itemDataFromServer) {
  addItemToPage(itemDataFromServer)
  $(event.target.itemDescription).val('')
  })
})

$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
  isItemCompleted = item.hasClass('completed')
  var itemId = item.attr('data-id')
  var updateRequest = $.ajax({
    type: 'PUT',
    url: "https://listalous.herokuapp.com/lists/pulkitagrawal/items/" + itemId,
    data: { completed: !isItemCompleted }
  })
  updateRequest.done(function(itemData) {
  if (itemData.completed) {
    item.addClass('completed')
  } else {
    item.removeClass('completed')
  }
  })
})

$('#list').on('click', '.delete-button', function(event) {
  var item = $(event.target).parent()
  var itemId = item.attr('data-id')
  var deleteRequest = $.ajax({
    type: 'DELETE',
    url: "https://listalous.herokuapp.com/lists/pulkitagrawal/items/" + itemId,
  })
  item.remove()
})
