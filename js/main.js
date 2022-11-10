const hamburgerIcon = document.querySelector('.hamburger')
const hamburgerCloseIcon = document.querySelector('.hamburger-close')
const secondMenu = document.querySelector('.mobile-menu')
const primaryMenu = document.querySelector('.primary-menu')
const secondMenuContent = document.querySelector('.mobile-menu-content')
const todoItems = document.querySelector('.todo-items')

hamburgerIcon.addEventListener('click', displaySecMenu)
hamburgerCloseIcon.addEventListener('click', hideSecMenu)
populateTodoItems(5)


function displaySecMenu(){
    populateMenu()
    secondMenu.style.transform = 'translateX(0)'
    this.style.display = 'none'
    
}

function hideSecMenu(){
    secondMenu.style.transform = 'translateX(100%)'
    setTimeout(() => hamburgerIcon.style.display = 'block', 600)
}

function populateMenu(){
    secondMenuContent.innerHTML = primaryMenu.innerHTML
}

function populateTodoItems(number){
    let item = ` <li class="todo w-full  bg-gray-500 rounded-lg px-4 py-2">
    <div class="todo-text-container">
    <input type='checkbox' class="check-todo-btn"></input>
    <input class="todo-input w-4/5"type="text" class="todo-text" value="A little improvement everyday" readonly>
    <div class="btn-container">
    <i class="delete-todo-btn far fa-trash"></i>
    <i class="edit-todo-btn fas fa-edit"></i>
    </div></div>
    </li>          `
    
    for (let i = 0; i < number; i++){
        todoItems.innerHTML += item
    }
}

class TodoItem{
    constructor(title, checked=false){
        this.title = title
        this.checked = checked
    }
}

class TodoProject {
    constructor(title, description, items=[]){
        this.title = title
        this.description = description
        this.items = items
        this.index = 0
    }
    append(item){
        item.index = this.index
        this.items.push(item)
        this.index++
    }
    
    remove(item){
        for(let projectItem of this.items){
            if (projectItem.index == item.index){
                this.items.splice(projectItem, 1)
                return
            }
        }
    }
}