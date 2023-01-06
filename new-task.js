let addTaskBtn = document.getElementById('add-task');
let addNewTask = document.getElementById('add-new-task');
let addButton  = document.getElementById('add-button');
let overLay    = document.getElementById('overlay');
let closeBtn   = document.getElementById('close-button');
let iconAction = document.getElementsByClassName('icon-section');
let inputField = document.getElementsByTagName('input');
let backButton = document.getElementById('back-icon');
let heading    = document.getElementById('heading');
const addTaskIcon = document.getElementsByClassName('add-task');
const backIcon  = document.getElementById('back-icon');
const fullviewContentHeader = document.getElementById('fullview-content-header');
let counter    = 0;
let taskMaker  = false;
let taskList   = [];
let selectedTile;
let fullView = false;
let enableBackButton;
let newArray = [];

const tilesContainer = document.getElementById('cards-tiles');

addButton.addEventListener('click', function() {
    addNewTask.style.display = 'unset';
    overLay.style.display    = 'unset';

    if(taskMaker) {
        let taskHeader = document.getElementsByClassName('new-task-header');
        taskHeader[0].innerText = 'Add New Task';

        let inputField = document.getElementsByTagName('input');
        inputField[0].value = ''
        inputField[0].setAttribute('placeholder', 'Add new task');

        inputField[1].value = 'Add Task';
        taskMaker = false;
    }
});

closeBtn.addEventListener('click', function() {
    addNewTask.style.display = 'none';
    overLay.style.display = 'none';
});

addTaskBtn.addEventListener('click', function() {
    if(taskMaker) {
        let inputField = document.getElementsByTagName('input');
        let particularField = document.getElementById(selectedTile);

        let li = document.createElement('li');
        let ul = document.createElement('ul');

        li.innerHTML = `<span>${inputField[0].value}</span><button class="done-btn">Done</button`;
        ul.append(li);
        
        particularField.getElementsByClassName('data-list')[0].append(ul);

        addNewTask.style.display = 'none';
        overLay.style.display = 'none';
    } else {
        counter+=1;
        let task = document.getElementById('task').value;
    
        if(task !== '') {
            let taskObj = {
                taskName: task,
                taskClass: `task-${counter}`
            }
    
            taskList.push(taskObj);
            newArray.push(taskObj);
        }

        if(fullView) {
            taskList.forEach((element, index) => {
                if((taskList.length - 1) !== index) {
                    document.getElementById(element.taskClass).style.display = 'flex';
                }
            });
            createTiles(taskList.slice(taskList.length-1));
        } else {
            createTiles(taskList.slice(taskList.length-1));
        }
    }
});

function createTiles(tasksLists) {
    let tile           = document.createElement('div');    // full tile
    let tileTitle      = document.createElement('div');    // tile title
    let horizontalLine = document.createElement('hr');     // after heading horizontal line
    let iconSection    = document.createElement('div');    // tile icon section
    let addTaskBtn     = document.createElement('button'); // add task on tile button
    let deleteTileBtn  = document.createElement('button'); // delete task tile button
    let listItem       = document.createElement('div');

    tasksLists.forEach(element => {

        tile.setAttribute('class', 'tile');
        tile.setAttribute('id', element.taskClass);

        tileTitle.setAttribute('class', 'card-title');
        tileTitle.innerText = element.taskName;

        iconSection.setAttribute('class', 'icon-section');
        iconSection.style.alignSelf = 'end';
        listItem.setAttribute('class', 'data-list');

        addTaskBtn.setAttribute('class', 'task-button')
        addTaskBtn.innerHTML = '<i class="fa-solid fa-circle-plus card-icon"></i>';

        deleteTileBtn.setAttribute('class', 'task-button')
        deleteTileBtn.innerHTML = '<i class="fa-regular fa-trash-can card-icon"></i>';
        iconSection.append(addTaskBtn);
        iconSection.append(deleteTileBtn);

        tile.append(tileTitle);
        tile.append(horizontalLine);
        tile.append(listItem);
        tile.append(iconSection);

        let cardTiles = document.getElementById('cards-tiles');
        cardTiles.appendChild(tile);

        cardTiles.style.justifyContent = 'space-between';
        addNewTask.style.display = 'none';
        overLay.style.display = 'none';
        addTaskIcon[0].style.display = 'unset';
        backIcon.style.display = 'none';
        heading.style.display = 'unset';
        fullviewContentHeader.style.display = 'none';

        taskButton();
    });
}

function taskButton() {
    
    tilesContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('tile') || e.target.classList.contains('data-list')) {
            
            selectedTile = e.target.id || e.target.parentNode.id;
            taskList.forEach((element, index) => {
                if(element.taskClass !== selectedTile) {
                    document.getElementById(element.taskClass).style.display = 'none';
                } 
            });
            let cardTiles = document.getElementById('cards-tiles');
            cardTiles.style.justifyContent = 'center';

            heading.style.display = 'none';
            addTaskIcon[0].style.display = 'none';
            backIcon.style.display = 'flex';
            fullviewContentHeader.innerText = document.getElementById(selectedTile).getElementsByClassName('card-title')[0].innerText;
            fullviewContentHeader.style.display = 'flex';

            fullView = true;
        } else if(e.target.classList.contains('fa-circle-plus')) {
            selectedTile = e.target.parentNode.parentNode.parentNode.id;
            addNewTask.style.display = 'unset';
            overLay.style.display    = 'unset';
            toAddNewTask();
        } else if(e.target.classList.contains('done-btn')) {
            e.target.parentNode.getElementsByTagName('span')[0].style.textDecoration = 'line-through';
            e.target.parentNode.getElementsByTagName('span')[0].style.color='red';
            e.target.parentNode.getElementsByTagName('button')[0].style.display = 'none'
        } else if(e.target.classList.contains('fa-trash-can')) {
            let selectedTileId = e.target.parentNode.parentNode.parentNode.id;
            document.getElementById(selectedTileId).remove();
            taskList.forEach((element, index) => {
                if(element.taskClass === selectedTile) {
                    taskList.splice(index, 1);
                } 
            });
        }
    });
}

function toAddNewTask() {
    taskMaker = true;

    let taskHeader = document.getElementsByClassName('new-task-header');
    taskHeader[0].innerText = 'Add New Item';

    let inputField = document.getElementsByTagName('input');
    inputField[0].value = ''
    inputField[0].setAttribute('placeholder', 'Add new item');

    inputField[1].value = 'Add Item';
}


backButton.addEventListener('click', function() {
    enableBackButton = true;
    taskList.forEach((element, index) => {
        document.getElementById(element.taskClass).style.display = 'flex';
    });
    let cardTiles = document.getElementById('cards-tiles');
    cardTiles.style.justifyContent = 'space-between';

    heading.style.display = 'unset';
    addTaskIcon[0].style.display = 'unset';
    backIcon.style.display = 'none';
    fullviewContentHeader.style.display = 'none';
});
