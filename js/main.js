const hamburgerIcon = document.querySelector('.hamburger')
const hamburgerCloseIcon = document.querySelector('.hamburger-close')
const secondMenu = document.querySelector('.mobile-menu')
const primaryMenu = document.querySelector('.primary-menu')
const secondMenuContent = document.querySelector('.mobile-menu-content')
const todoItems = document.querySelector('.todo-items')
const content = document.querySelector('.content')
const menuItems = document.querySelector('.menu-items')
const addItemSection = document.querySelector('.add-book-section')
const addProjectSection = document.querySelector('.add-project-section')
const editItemSection = document.querySelector('.edit-item-section')
let activeProject;

console.log(editItemSection)
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
    allProjects.addListeners()
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
    constructor(title, checked=false){
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
            this.addListeners()
        }
    }
        addListeners(){
            const addProjectBtn = document.querySelectorAll('.icon.add-project')
            addProjectBtn.forEach(button => button.addEventListener('click', () => addProjectSection.style.display = 'block'))            
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
        <h2 class="text-center relative">${this.title} <span class="flex add-item absolute -right-0 top-0 gap-1"> <span>New</span> <img class='icon add-todo' src="assets/plus-circle.png" alt=""></span></h2>
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
                            <div class="todo-text-container flex gap-2">
                            <input type='checkbox' class="check-todo-btn rounded-full" ${isChecked}></input>
                            <input class="todo-input w-4/5"type="text" class="todo-text" value="${item.title}" readonly ${disabled}>
                            <div class="btn-container flex gap-2">
                                <img class="icon edit"  src="assets/pencil.png" alt="">
                                <img class="icon" src="assets/delete.png" alt="">
                            </div></div>
                            </li>   `
      }
      addItemSection.dataset.activeItem = this.index
      this.addListeners()
    }

    addListeners(){
        const editBtns = document.querySelectorAll('.icon.edit')
        const addBtn = document.querySelector('button.add')
        const cancelBtn = document.querySelector('button.cancel')
        const checkboxes = document.querySelectorAll('.check-todo-btn')
        const newTodoBtn = document.querySelector('.add-todo')
        const cancelEditBtn = document.querySelector('.cancel-edit')
        const confirmEditBtn = document.querySelector('.confirm-edit')
        console.log(confirmEditBtn)
        checkboxes.forEach(checkbox => checkbox.addEventListener('click', this.#toggleDisable))
        newTodoBtn.addEventListener('click', () => addItemSection.style.display = 'block')
        addBtn.addEventListener('click', renderItem)
        editBtns.forEach(editBtn => editBtn.addEventListener('click', editItem))
        cancelEditBtn.addEventListener('click', closeEditing)
            
    }

    
    #toggleDisable(){
        let element = this.nextElementSibling
        element.disabled = !element.disabled
    }

    }

    function renderItem(){
        let inputItem = document.querySelector('.add-input')
        let inputValue = inputItem.value
            if (!inputValue) inputValue = 'Default Title'
            let index = addItemSection.dataset.activeItem
            let active
            
            // Get the index of the rendered project
            for(let project of allProjects.items){
            if(project.index = index) {
                active = project
                break
            } 
        }
            active.append(new TodoItem(inputValue))
            inputItem.value = ''
            addItemSection.style.display = 'none'
            active.renderContent()
        }
    
    function editItem(){
        editItemSection.style.display = 'block'
        let editInput = document.querySelector('.edit-input')
        editInput.value = this.parentElement.previousElementSibling.value
        editInput.select()

    }

    function closeEditing(){
        editItemSection.style.display = 'none'
        
    }


let allProjects = new AllProject()
let gym = new TodoProject('for gyming', 'going to the workout regularly')
allProjects.append(gym)
let sleep = new TodoItem('for sleeping')
let wakeUp = new TodoItem('for waking up')
gym.append(sleep)
gym.append(wakeUp)
allProjects.renderContent()
gym.renderContent()
