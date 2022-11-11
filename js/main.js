const hamburgerIcon = document.querySelector('.hamburger')
const hamburgerCloseIcon = document.querySelector('.hamburger-close')
const secondMenu = document.querySelector('.mobile-menu')
const primaryMenu = document.querySelector('.primary-menu')
const secondMenuContent = document.querySelector('.mobile-menu-content')
const todoItems = document.querySelector('.todo-items')
const content = document.querySelector('.content')
const menuItems = document.querySelector('.menu-items')
const addItemSection = document.querySelector('.add-item-section')
const addProjectSection = document.querySelector('.add-project-section')
const editItemSection = document.querySelector('.edit-item-section')
const editInput = document.querySelector('.edit-input')
const projectTitleInput = document.querySelector('.add-project-title')
const projectDescriptionInput = document.querySelector('.add-project-description')
const projectCards = document.querySelectorAll('.project-card')

let edittedItem;
let activeProject;

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
    populateMenu(primaryMenu, secondMenuContent)
    
}

function populateMenu(menu1=secondMenuContent, menu2=primaryMenu){
    menu1.innerHTML = menu2.innerHTML
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
        menuItems.innerHTML = ''
        for(let item of this.items){
            menuItems.innerHTML += `
            <div class="project-card | text-start bg-gray-500 mt-8 px-8 rounded-md md:rounded-none hover:bg-gray-600" data-index=${item.index}>
                  <h3 class="title">${item.title}</h3>
                  <p class="description text-sm italic">${item.description}</p>
              </div>
            `            
        }
        this.addListeners()
    }
        addListeners(){
            const newProjectBtn = document.querySelectorAll
            ('.icon.add-project')
            const cancelProjectBtn = document.querySelector('.cancel-project')
            const addProjectBtn = document.querySelector('.update-project')
            
            const projectCards = document.querySelectorAll('.project-card')
            projectCards.forEach(projectCard => projectCard.addEventListener('click', activateProject))
            newProjectBtn.forEach(button => button.addEventListener('click', showProject))
            cancelProjectBtn.addEventListener('click', closeAddSection)
            addProjectBtn.addEventListener('click', updateProject)
            
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
                            <input class="todo-input w-4/5 focus:outline-none outline-none border-none" type="text"value="${item.title}" readonly ${disabled} data-index=${item.index}>
                            <div class="btn-container flex gap-2">
                                <img class="icon edit"  src="assets/pencil.png" alt="">
                                <img class="icon delete" src="assets/delete.png" alt="">
                            </div></div>
                            </li>   `
      }
      addItemSection.dataset.activeItem = this.index
      this.addListeners()
      activeProject = this
    }

    addListeners(){
        const editBtns = document.querySelectorAll('.icon.edit')
        const deleteBtns = document.querySelectorAll('.icon.delete')
        const addBtn = document.querySelector('button.add')
        const cancelBtn = document.querySelector('button.cancel')
        const checkboxes = document.querySelectorAll('.check-todo-btn')
        const newTodoBtn = document.querySelector('.add-todo')
        const cancelEditBtn = document.querySelector('.cancel-edit')
        const confirmEditBtn = document.querySelector('.confirm-edit')
        checkboxes.forEach(checkbox => checkbox.addEventListener('click', this.#toggleDisable))
        newTodoBtn.addEventListener('click', () => addItemSection.style.display = 'block')
        addBtn.addEventListener('click', renderItem)
        editBtns.forEach(editBtn => editBtn.addEventListener('click', editItem))
        deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', deleteItem))
        cancelEditBtn.addEventListener('click', closeEditing)
        confirmEditBtn.addEventListener('click', confirmEditing)
            
    }

    
    #toggleDisable(){
        let element = this.nextElementSibling
        element.disabled = !element.disabled
    }

    }


    function activateProject(){
        const projectCards = document.querySelectorAll('.project-card')
        projectCards.forEach(projectCard => projectCard.classList.remove('active'))
        this.classList.add('active')
        let index = this.dataset.index
        let projectItem = findItem(index)
        activeProject = projectItem
        hideSecMenu()
        // debugger
        projectItem.renderContent()
    }

    function closeAddSection(){
        addProjectSection.style.display = 'none'
    }

    function showProject(){
        addProjectSection.style.display = 'block'
        projectTitleInput.value = projectDescriptionInput.value = ''
    }

    function updateProject(){
        let newTitle = projectTitleInput.value
        let newDescription = projectDescriptionInput.value
        if(!(newTitle && newDescription)) {
            alert('Title and Description values must be filled')
        }
        else{
            let newProject = new TodoProject(newTitle, newDescription)
                allProjects.append(newProject)
                    allProjects.renderContent()
                    populateMenu()
                    closeAddSection()
            }
        
    }

    function findItem(index, iter=allProjects){
        let active
        for(let project of iter.items){
        if(project.index = index) {
            active = project
            break
        } 
    }
    return active
}

    function renderItem(){
        let inputItem = document.querySelector('.add-input')
        let inputValue = inputItem.value
            if (!inputValue) inputValue = 'Default Title'
            let index = addItemSection.dataset.activeItem
            
            // Get the index of the rendered project
            active = findItem(index)
            active.append(new TodoItem(inputValue))
            inputItem.value = ''
            addItemSection.style.display = 'none'
            active.renderContent()
        }
    
    function editItem(){
        editItemSection.style.display = 'block'
        edittedItem = this.parentElement.previousElementSibling
        editInput.value = edittedItem.value
        const end = editInput.value.length
        editInput.setSelectionRange(end, end)
        editInput.focus()

    }

    function closeEditing(){
        editItemSection.style.display = 'none'
    }

    function confirmEditing(){
      
        if(!(edittedItem.value == editInput.value || !edittedItem)){
            let index = edittedItem.dataset.index
            const edittedObject = findItem(index, activeProject)
            edittedObject.title = edittedItem.value = editInput.value
        }
        closeEditing()
    }

    function deleteItem(){
        let deletedInput = this.parentElement.previousElementSibling
        let index = deletedInput.dataset.index
        let deletedItem = deletedInput.parentElement
        let itemsList = activeProject.items
        for (let item of itemsList){
            if (item.index == index){
                alert('Are you sure you want to delete this item (No going back after this stage')
                itemsList.splice(itemsList.indexOf(item), 1)
            }
        }
        activeProject.renderContent()
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
