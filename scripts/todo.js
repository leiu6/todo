let list = new Array(); //define array of objects for list

const taskName = document.querySelector('#name'); //input for task name
const taskDescription = document.querySelector('#description');
const taskDate = document.querySelector('#duedate');
const taskDone = document.querySelector('#done');

const pageList = document.querySelector('#list'); //the area where the list is on the page

const taskAdd = document.querySelector('#add');

taskAdd.onclick = () => {
    addToList(taskName.value, taskDescription.value, taskDate.value, taskDone.checked);
    syncListToPage();
};

//this function syncs the page DOM and the list object
function syncListToPage() {
    pageList.innerHTML = ''; //reset contents of ul to redraw

    for (let i = 0; i < list.length; i++) {
        let listEntry = document.createElement('LI'); //create the li where the list entry lies

        let checkedString = '';
        if (list[i].done == true) {
            checkString = 'checked';
        }

        listEntry.innerHTML = `
            <div class="check">
                <input type="checkbox" name="task${i}" id="task${i}" ${checkedString}>
            </div>
            <div class="name"><span>${list[i].name}</span></div>
            <div class="description">
                <p>
                    ${list[i].description}
                </p>
            </div>
            <div class="duedate"><span>${list[i].duedate}</span></div>
        `;

        pageList.appendChild(listEntry); //add the list entry to the page
    }
}

//add a user entry to the list array
function addToList(name, description, date, done) {
    let entry = {
        'name': name,
        'description': description,
        'date': date,
        'done': done
    };

    list.unshift(entry);
}
