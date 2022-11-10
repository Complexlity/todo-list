const hamburgerIcon = document.querySelector('.hamburger')
const hamburgerCloseIcon = document.querySelector('.hamburger-close')
const secondMenu = document.querySelector('.mobile-menu')
const primaryMenu = document.querySelector('.primary-menu')
const secondMenuContent = document.querySelector('.mobile-menu-content')
const todoItems = document.querySelector('.todo-items')
const content = document.querySelector('.content')
const menuItems = document.querySelector('.menu-items')

hamburgerIcon.addEventListener('click', displaySecMenu)
hamburgerCloseIcon.addEventListener('click', hideSecMenu)


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



class ProjectsList {
    constructor(items = [], count=0){
        this.items = items
        this.count = count
    }
    
    append(item){
        item.index = this.count
        this.items.push(item)
        this.count++
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



class TodoItem{
    constructor(title, checked=true){
        this.title = title
        this.checked = checked
    }
}



class AllProject extends ProjectsList{
    constructor(items,count){
        super()
    }

    renderContent(){
        for(let item of this.items){
            menuItems.innerHTML += `
            <div class="project | text-start bg-gray-700 mt-8 px-8 rounded-md md:rounded-none">
                    <h3 class="title">${item.title}</h3>
                    <p class="description text-sm italic">${item.description}</p>
                </div>
            `
        }
        
    }
}



class TodoProject extends ProjectsList {
    constructor(title, description, items, count){
        super()
        this.title = title
        this.description = description
        this.count = 0
    }

    renderContent(){
        content.innerHTML = `
        <header class="w-4/5 mx-auto">
                    <h2 class="text-center relative">${this.title} <span class="add-item absolute -right-0">Add</span></h2>
                    <hr class=' mx-auto'>
                </header>
                    <ul class="todo-items mx-auto mt-4 w-4/5 px-4 py-4 grid gap-2">      
                  </ul>
      `
      let todoList = document.querySelector('.todo-items')
      for(let item of this.items){
        let isChecked
        let disabled
        if(item.checked == true) {
            isChecked = 'checked'
            disabled = 'disabled'
        }
        else {
            isChecked = ''
            disabled = ''
        }
        todoList.innerHTML += `
        <li class="todo w-full  bg-gray-500 rounded-lg px-4 py-2">
        <div class="todo-text-container">
        <input type='checkbox' class="check-todo-btn rounded-full" ${isChecked}></input>
        <input class="todo-input w-4/5"type="text" class="todo-text" value="${item.title}" readonly ${disabled}>
        <div class="btn-container">
        <i class="delete-todo-btn far fa-trash"></i>
        <i class="edit-todo-btn fas fa-edit"></i>
        </div></div>
        </li>    `
      }
    }

    addListeners(){
        let checkboxes = document.querySelectorAll('.check-todo-btn')
        checkboxes.forEach(checkbox => checkbox.addEventListener('click', this.#toggleDisable))
    }
    
    #toggleDisable(){
        let element = this.nextElementSibling
        element.disabled = !element.disabled
    }

}

let gym = new TodoProject('for gyming', 'going to the workout regularly')
let sleep = new TodoItem('for sleeping')
let wakeUp = new TodoItem('for waking up')
gym.append(sleep)
gym.append(wakeUp)
gym.renderContent()
gym.addListeners()

let allProjects = new AllProject()
allProjects.append(gym)
allProjects.renderContent()