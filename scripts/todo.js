const pageList = document.querySelector('#list');
const itemName = document.querySelector('#name');
const itemDueDate = document.querySelector('#duedate');
const header = document.querySelector('.header-text');

let list = new Array();

document.querySelector('#add').onclick = () => addToList(itemName.value, itemDueDate.value, false);

//code to allow header to be renamed
header.onclick = () => {
    header.setAttribute('contenteditable', '');
    header.setAttribute('role', 'textbox');
};

function declareDone(i) {
    if (document.getElementById('task' + i).checked == true) {
        list[i].done = true;
        document.getElementById('task' + i).parentElement.classList.add('disabled');
    }
    else {
        list[i].done = false;
        document.getElementById('task' + i).parentElement.classList.remove('disabled');
    }
}

function addToList(name, duedate, done) {
    //don't allow submission if input fields are empty
    if (itemName.value === '') {
        return null;
    }

    //add entry to array of list items
    list.push({
        "name": name,
        "duedate": duedate,
        "done": done
    });

    //loop through the array and put it on the page
    pageList.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        let entry = document.createElement('LI');
        entry.innerHTML = `
            <input type="checkbox" id="task${i}" onchange="declareDone(${i})">
            <span class="name">${list[i].name}</span>
            <span class="duedate">Due ${list[i].duedate}</span>
        `;

        pageList.appendChild(entry);

        document.getElementById('task' + i).checked = false;

        if (list[i].done == true) {
            document.getElementById('task' + i).checked = true;
            document.getElementById('task' + i).parentElement.classList.add('disabled');
        }
        else {
            document.getElementById('task' + i).checked = false;
            document.getElementById('task' + i).parentElement.classList.remove('disabled');
        }
    }

    //clear the input fields for next item
    itemName.value = '';
    itemDueDate.value = '';
}
