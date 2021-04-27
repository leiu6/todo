let list = new Array(); //define array of objects for list

const taskName = document.querySelector('#name'); //input for task name
const taskDate = document.querySelector('#duedate'); //input for task due date
const taskAdd = document.querySelector('#add'); //button to add the task to the list
const pageList = document.querySelector('#list'); //the area where the list is on the page
const headerText = document.querySelector('.header-text'); //the <span></span> where the header's text is located

//Add inital content to the header
let header = document.createElement('h1');
header.textContent = 'my list';
headerText.appendChild(header);

//Add text box for renaming the list if the header is clicked
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

//onclick event for if the task add button is clicked
taskAdd.onclick = () => {
    addToList(taskName.value, taskDate.value, false); //task completion is always marked false for the first time, because you would not be putting it in the list if it was completed.
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

//function from stack overflow that allows cross browser focus triggering. Use to trigger focus to the textbox that appears whenever the header is clicked
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
