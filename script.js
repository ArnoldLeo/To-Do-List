let addbtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addTxt = document.getElementById("note-text");

addbtn.addEventListener("click", (e) => {
    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please add Note Title and Description");
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    showNotes();
});

//Show task on the page
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notes">
        <p class="note-counter">Task ${index + 1}</p>
        <h3 class="note-title">${element.title}</h3>
        <p class="note-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Remove</button>
        <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit</button>
    </div>
    `;
    });

    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = "No Task's Yet! Add a Task using the form above";
    }
}

//Function to Delete task
function deleteNote(index) {
    let confirmDel = confirm("Are you removing this task?");

    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

//Function to edit the task
function editNote(index) {
    let notes = localStorage.getItem("notes");
    //console.log(notes);
    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert("Please clear the form before editing a task");
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);       
    }
    //console.log(notesObj);
    let head=notesObj[index].title;
    // let tail=notesObj[index].text;
    notesObj.findIndex((element) => {
        // console.log(element);
        if(element.title==head){
         addTitle.value = element.title;
         addTxt.value = element.text;
        }
     })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();
function reset() {
    if (confirm("All files will be Cleared!!") === true) {
        localStorage.clear();
    }
    showNotes();
}