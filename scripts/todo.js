const pageList = document.querySelector('#list');
const itemName = document.querySelector('#name');
const itemDueDate = document.querySelector('#duedate');
const header = document.querySelector('.header-text');

let list = new Array();

document.querySelector('#add').onclick = () => addToList(itemName.value, itemDueDate.value, false);

//code to allow header to be renamed
header.onclick = () => {
    let headerContent = header.textContent; //create backup of header content to populate textbox
    header.innerHTML = `
        <input type="text" id="listTitle">
    `;

    let textBox = document.querySelector("#listTitle");
    
    textBox.value = headerContent;
    textBox.select();

    //look for enter key to change header value
    textBox.addEventListener('keydown', (e) => {
        if (e.key == "Enter") {
            if (textBox.value === null) {
                return 0;
            }
            else {
                header.textContent = textBox.value;
            }
        }
    });
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
        let duedateString = '';
        if (list[i].duedate !== undefined && list[i].duedate !== null && list[i].duedate !== '') {
            duedateString = 'Due ' + list[i].duedate;
        }
        entry.innerHTML = `
            <input type="checkbox" class="taskCheck" id="task${i}" onchange="declareDone(${i})">
            <span class="name">${list[i].name}</span>
            <span class="duedate" id="task${i}date">${duedateString}</span>
        `;

        pageList.appendChild(entry);

        document.getElementById('task' + i).checked = false;

        let dueDate = new Date(list[i].duedate);
        let today = new Date();

        if (dateInPast(dueDate,today)) {
            document.getElementById('task' + i + 'date').classList.add('red');
        }
        else {
            document.getElementById('task' + i + 'date').classList.remove('red');
        }

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

var dateInPast = function(firstDate, secondDate) {
    if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
  
    return false;
};
