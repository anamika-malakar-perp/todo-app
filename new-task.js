let addTaskBtn = document.getElementById('add-task');
let addNewTask = document.getElementById('add-new-task');
let addButton  = document.getElementById('add-button');
let overLay    = document.getElementById('overlay');
let closeBtn   = document.getElementById('close-button');
let iconAction = document.getElementsByClassName('icon-section');
let inputField = document.getElementsByTagName('input');
let backButton = document.getElementById('back-icon');
let heading    = document.getElementById('heading');
let counter    = 0;
let taskMaker  = false;
let taskList   = [];
let selectedTile;

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
        let particularField = document.getElementById(selectedTile)
        let container = document.createElement('div');
        let li = document.createElement('li');
        let ul = document.createElement('ul');

        li.innerHTML = `${inputField[0].value} <button>Done</button`;
        ul.append(li);
        container.append(ul);

        particularField.append(container)

    } else {
        counter+=1;
        let task = document.getElementById('task').value;
    
        if(task !== '') {
            let taskObj = {
                taskName: task,
                taskClass: `task-${counter}`
            }
    
            taskList.push(taskObj);
        }

        if(taskList.length !== 0) {
            createTiles(taskList);
        }
    }
});

function createTiles(taskList) {
    let tile           = document.createElement('div');    // full tile
    let tileTitle      = document.createElement('div');    // tile title
    let horizontalLine = document.createElement('hr');     // after heading horizontal line
    let iconSection    = document.createElement('div');    // tile icon section
    let addTaskBtn     = document.createElement('button'); // add task on tile button
    let deleteTileBtn  = document.createElement('button'); // delete task tile button

    tile.setAttribute('class', 'tile');
    tile.setAttribute('id', taskList[taskList.length - 1].taskClass);

    tileTitle.setAttribute('class', 'card-title');
    tileTitle.innerText = taskList[taskList.length - 1].taskName;

    iconSection.setAttribute('class', 'icon-section');

    addTaskBtn.setAttribute('class', 'task-button')
    addTaskBtn.innerHTML = '<i class="fa-solid fa-circle-plus card-icon"></i>';

    deleteTileBtn.setAttribute('class', 'task-button')
    deleteTileBtn.innerHTML = '<i class="fa-regular fa-trash-can card-icon"></i>';
    iconSection.append(addTaskBtn);
    iconSection.append(deleteTileBtn);

    tile.append(tileTitle);
    tile.append(horizontalLine);
    tile.append(iconSection);

    let cardTiles = document.getElementById('cards-tiles');
    cardTiles.appendChild(tile);

    addNewTask.style.display = 'none';
    overLay.style.display = 'none';
}

tilesContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('tile')) {
        selectedTile = e.target.id;
        addNewTask.style.display = 'unset';
        overLay.style.display = 'unset';
        // toAddNewTask();
        taskList.forEach(element => {
            if(element.taskClass === selectedTile) {
                const elements = document.getElementsByClassName('tile');
                while(elements.length > 0){
                    elements[0].parentNode.removeChild(elements[0]);
                }

                createTiles([element]);
                heading.style.display = 'none';

                let cardTiles = document.getElementById('cards-tiles');
                cardTiles.style.justifyContent = 'center';

                const addTaskIcon = document.getElementsByClassName('add-task');
                const backButton  = document.getElementById('back-icon');
                const fullviewContentHeader = document.getElementById('fullview-content-header');
                addTaskIcon[0].style.display = 'none';
                backButton.style.display = 'flex';
                fullviewContentHeader.innerHTML = e.target.innerText;
                fullviewContentHeader.style.display = 'flex';
            }
        });
    }
});

function toAddNewTask() {
    taskMaker = true;

    let taskHeader = document.getElementsByClassName('new-task-header');
    taskHeader[0].innerText = 'Add New Item';

    let inputField = document.getElementsByTagName('input');
    inputField[0].value = ''
    inputField[0].setAttribute('placeholder', 'Add new item');

    inputField[1].value = 'Add Item';
}
