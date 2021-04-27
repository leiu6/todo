//This is a simple to-do script.
//
//This program will have cool features.
//
//Types of fields:
//"name": the name of the list item
//"description": an optional short description of the list item
//"duedate": the date the item is due
//"done" boolean value that says whether the task is done

let list = new Array(); //define a new object for the list

const taskName = document.querySelector('#name'); //get object for text box

const taskDescription = document.querySelector('#description'); //get object for description box

const taskAdd = document.querySelector('#add'); //get the button to add tasks

const pageList = document.querySelector('#list'); //get the <ul> where the list is contained

taskAdd.onclick = getInput;

function getInput() {
    addEntry(taskName.value, taskDescription.value, '11/25/21', true);
    syncLists();
}

function addEntry(name, description, duedate, done) {
    let entry = {
        "name": name,
        "description": description,
        "duedate": duedate,
        "done": done
    };
    list.unshift(entry);
}

function syncLists() {
    pageList.innerHTML = ''; //remove content of page list to re populate
    for (let i = 0; i < list.length; i++) {
        let listItem = document.createElement("LI");
        listItem.innerHTML = list[i]["name"] + list[i]["description"] + list[i]["duedate"] + list[i]["done"];

        pageList.appendChild(listItem);
    }
}
