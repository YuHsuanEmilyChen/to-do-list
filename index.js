const form = document.querySelector('.todo-list')
const addButton = document.querySelector('.add-btn')
const input = document.querySelector('.new-todo')
const todoList = document.querySelector('.my-todo')


// Functions
// Function to add item into Todo List
function addItem(text) {

  let newItem = document.createElement('li')
  newItem.innerHTML = `
  <label>${text}</label>
  <i class="fas fa-trash-alt delete"></i>
  `
  todoList.appendChild(newItem)

}


// Function to check input type
function textCheck(text) {
  return (/[^\t\n\r ]/).test(text)
}

// function to delete item
function deleteItemByIcon(target) {
  const todoNote = JSON.parse(localStorage.getItem('willdoList')) || []
  const deleteItem = target.previousElementSibling.textContent

  target.parentElement.remove()
  deleteStorage(todoNote, deleteItem)
  localStorage.setItem('willdoList', JSON.stringify(todoNote))



}

// function to trigger toggle 
function triggerToggle(target) {
  target.classList.toggle('checked')

}


// function for todo list to delete storage
function deleteStorage(array, item) {
  array.splice(array.indexOf(item), 1)

}


// IIFE to render local storage when refresh
(function renderStorage() {
  const todoNote = JSON.parse(localStorage.getItem('willdoList')) || []
  todoNote.map((item) => {
    addItem(item)
  })
})()


// Event of adding item to the list
form.addEventListener('submit', function eventOnAddBtn(event) {
  const todoNote = JSON.parse(localStorage.getItem('willdoList')) || []
  const inputValue = input.value

  event.preventDefault()

  if (textCheck(inputValue)) {
    addItem(inputValue)
    todoNote.push(inputValue)
    localStorage.setItem('willdoList', JSON.stringify(todoNote))
    input.value = ''
  } else {
    addButton.nextElementSibling.textContent = `Input cannot be blank.`
    input.value = ''
  }

})

// Event of triggering toggle or deleting item
todoList.addEventListener('click', function eventOnToDoItem(event) {
  const target = event.target

  if (target.matches('.delete')) {
    deleteItemByIcon(target)
  } else if (target.matches('label')) {
    triggerToggle(target)

  }
})


