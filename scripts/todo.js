let list = new Array(); //define array of objects for list

const taskName = document.querySelector('#name'); //input for task name
const taskDate = document.querySelector('#duedate');

const pageList = document.querySelector('#list'); //the area where the list is on the page

const taskAdd = document.querySelector('#add');

const headerText = document.querySelector('.header-text');

let header = document.createElement('h1');
header.textContent = 'my list';
headerText.appendChild(header);

headerText.onclick = () => {
    headerText.innerHTML = `
        <input type="text" id="headerInput" name="headerInput">
        `;

    let headerInput = document.getElementById('headerInput');
    headerInput.value = header.textContent;
    triggerFocus(headerInput);

    document.addEventListener("keyup", function(event) {
        if (event.code === 'Enter') {
            if (headerInput.value !== '') {
            headerText.innerHTML = `
                <h1>${headerInput.value}</h1>
            `;
            header.textContent = headerInput.value;
            }
        }
    });
}

taskAdd.onclick = () => {
    addToList(taskName.value, taskDate.value, false);
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
            <div class="duedate"><span>Due ${list[i].duedate}</span></div>
        `;

        pageList.appendChild(listEntry); //add the list entry to the page
    }

    //now lets do an additional loop to check if any boxes need to be checked

}

//add a user entry to the list array
function addToList(name, date, done) {
    let entry = {
        'name': name,
        'duedate': date,
        'done': done
    };

    list.unshift(entry);
}

function triggerFocus(element) {
    var eventType = "onfocusin" in element ? "focusin" : "focus",
        bubbles = "onfocusin" in element,
        event;

    if ("createEvent" in document) {
        event = document.createEvent("Event");
        event.initEvent(eventType, bubbles, true);
    }
    else if ("Event" in window) {
        event = new Event(eventType, { bubbles: bubbles, cancelable: true });
    }

    element.focus();
    element.dispatchEvent(event);
}
