let DARK_MODEBTN = localStorage.getItem("DARK_MODE");
shownotes();

// Declarring all variables
let addtext = document.getElementById('addtxt');
let addtitle = document.getElementById('title');
let addbtn = document.getElementById('addbtn');
let isupdate = false, updateid;
let card = document.getElementById('wholecard');
let h1 = document.getElementById('heading');
let yournotes = document.getElementById('yournotes');
let labeltitle = document.getElementById('labeltitle');
let labelnote = document.getElementById('labelnote');
let navbar = document.getElementsByClassName('navbar')[0];
let form = document.getElementById('searchForm');
let searchtxt = document.getElementById('searchtxt');
let noteselem = document.getElementById('notes');
let darkModebtn = document.getElementById("darkModebtn");
let redcard = document.querySelectorAll("#redcard");
let redbutton = document.querySelectorAll("#redbtn");
const togglbtn = document.getElementById('flexSwitchCheckDefault');
let deletedIcon = document.querySelector(".delete-icon");
let deletednotes = document.querySelector(".deleted-notes");
let choosebtn = document.querySelector("#choosebtn");
let chooseInput = document.querySelector("[type='file']");
let choosenImage = document.querySelector("#choosenImage");
let choosenFile;



// function to clear all notes
function clearstorage() {
    if (confirm("Do you really want to clear all notes:")) {
        localStorage.clear();
        shownotes();
    }
}

//function to show elements from localstorage

function shownotes() {
    let notes = localStorage.getItem('note');
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach((element, index) => {
        let status = element.status == "deleted" ? "deleted" : "";
        let darkMode = localStorage.getItem("DARK_MODE");
        darkMode == "enabled" ? element.enabledarkmode = "enable" : element.enabledarkmode = "disable";

        let imge = element.image
        
        // ${noteDark == "enabled" ? "#254d59 !important" : "white !important"}
        
        html += `<div class="notecard card my-2 mx-1 ${status} ${element.enabledarkmode == "enable" ? "card-background" : "light-background"} " data-id="${element.id}" id="notecard" style="width: 17.5rem;border:1px solid black;max-width:17.5rem;transform:scale(${element.pinned ? 0.8 : 1});" id="notecard">
        <div style="overflow:auto;max-height:45vh;">
        <img src="${imge ? imge : "./nothing.jpg"}" class="card-img-top" alt="Loading..." style="object-fit:cover">
        </div>
        <div class="card-body ${element.completed ? "red" : ""}" style="padding:18px;" id="redcard">
        <div class="buttons" style="display:flex;gap:1rem;margin-left:3rem;">
        <button id="${index}" onclick ="deletenote(this.id)" class="dltbtn"><i class="fa-solid fa-trash fa-trash-alt"></i></button>
        <button id="redbtn" onclick="rednote(${element.id})"><i class="fa-solid fa-circle-exclamation"></i></button>
        <a href="#heading">
        <button id="editbtn" style="margin-top:1rem;" onclick ="editnote(${index} ,'${element.title}','${element.text}','${element.image}')"><i class="fa-solid fa-pen-to-square fa-edit"></i></button></a>
        <button id="redbtn" onclick="pinNote(${element.id})"><i class="fa-solid fa-light fa-thumbtack"></i></button>
        </div>
        <h5 class="card-title ${element.enabledarkmode == "enable" ? "white" : "black"}" id="crd-title">${element.title}</h5>
        <p class="card-text" style="max-height:20vh;overflow:auto;">${element.text}</p>
        <div style="text-align:right;">${element.month}/${element.date}/${element.year}</div>
        </div>
        </div>`
    });

    let noteselem = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteselem.innerHTML = html;
    } else {
        noteselem.innerHTML = `Nothing to show use "add note" to add new notes`;
    }
}

function rednote(redid) {
    let findednote = notesobj.find(element => element.id == redid);
    notesobj.forEach(element => {
        if (element.id == findednote.id) {
            element.completed = !element.completed
        }
    });
    localStorage.setItem('note', JSON.stringify(notesobj));
    shownotes();
}
function pinNote(pinid) {
    let findednote = notesobj.find(element => element.id == pinid);
    notesobj.forEach(element => {
        if (element.id == findednote.id) {
            element.pinned = !element.pinned
        }
    });
    localStorage.setItem('note', JSON.stringify(notesobj));
    shownotes();
}

function restoreNote(id) {
    const noteElement = document.querySelector(`[data-id="${id}"]`);
    noteElement.classList.remove("deleted");
    notesobj.find(note => {
        if (note.id == id) {
            note.status = ""
        }
    });
    localStorage.setItem('note', JSON.stringify(notesobj));
    alldeletednotes();
    deletednotes.classList.toggle("show");
}

function alldeletednotes() {
    deletednotes.querySelectorAll("li").forEach(li => li.remove())
    let html = "";
    notesobj.forEach((note) => {
        if (note.status == 'deleted') {
            if (note.title) {
                html += `<li class="single-note">
                                <p class="title"><b>Title : ${note.title}</b></p>
                                <button class="restore-btn" onclick="restoreNote(${note.id})">Restore</button>
                        </li>`
            } else {
                html += `<li class="single-note">
                                <p class="title"><b>Description : ${note.text}</b></p>
                                <button class="restore-btn" onclick="restoreNote(${note.id})">Restore</button>
                        </li>`
            }
        }
    });
    deletednotes.innerHTML = html || "No deleted notes yet";
}

alldeletednotes()

//function to delete a note
function deletenote(index) {
    let confirmdel = confirm('Are you sure you want to delete this note');
    if (!confirmdel) return;
    notesobj[index].status = 'deleted';
    localStorage.setItem('note', JSON.stringify(notesobj));
    alldeletednotes()
    shownotes();
}



// fucnction to edit a note

function editnote(noteid, notetitle, notetext,image) {
    isupdate = true;
    updateid = noteid;
    addtitle.value = notetitle;
    addtext.value = notetext;
    choosenImage.src = image;
    addbtn.innerText = "Edit note";
    labeltitle.innerHTML = "Edit title"
    labelnote.innerHTML = "Edit description"
}

// function of search functionallity


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputvalue = searchtxt.value;
    Array.from(notecard).forEach((element) => {
        let crdtext = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        searchtxt.addEventListener('input', () => {
            if (!searchtxt.value) {
                element.style.display = "block";
            }
        })
        if (crdtext.includes(inputvalue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
});

choosebtn.addEventListener("click",() => {
    chooseInput.click()
})

chooseInput.addEventListener("change",(e) => {
    choosenFile = URL.createObjectURL(e.target.files[0]);
    choosenImage.src = choosenFile;
})


addbtn.addEventListener('click', () => {
    addbtn.innerText = "Add note";
    labeltitle.innerHTML = "Add title"
    labelnote.innerHTML = "Add description"
    let notes = localStorage.getItem('note');
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let notetitle = addtitle.value;
    let notedes = addtext.value;
    let date = new Date();
    let obj = {
        id: Date.now(),
        title: notetitle,
        text: notedes,
        completed: false,
        status: "",
        image:choosenFile,
        pinned:false,
        month:date.getMonth(),
        date:date.getDate(),
        year:date.getFullYear(),
        enabledarkmode:"enabled"
    }
    if (!isupdate) {
        notesobj.push(obj);
    } else {
        notesobj[updateid] = obj;
        isupdate = false;

    }
    addtitle.value = "";
    addtext.value = "";
    localStorage.setItem('note', JSON.stringify(notesobj));
    notedes.value = "";
    notetitle.value = "";
    shownotes();
});

let darkmode = localStorage.getItem("DARK_MODE");

function removeClasses() {
    navbar.classList.remove('bg-dark');
    navbar.classList.remove('navbar-dark');
}

const darkMode = () => {
    localStorage.setItem("DARK_MODE", "enabled");
    document.body.classList.add("body-background");
    darkModebtn.innerHTML = "Dark Mode Enabled"
    card.classList.add('card-background');
    h1.classList.add('white');
    yournotes.classList.add('white');
    labeltitle.classList.add('white');
    labelnote.classList.add('white');
    addtitle.classList.add('note-background');
    addtext.classList.add('note-background');
    navbar.classList.add('bg-dark');
    navbar.classList.add('navbar-dark');
    noteselem.childNodes.forEach((element) => element.classList.add("note-background"))
}
const lightMode = () => {
    localStorage.setItem("DARK_MODE", "disabled");
    document.body.classList.remove("body-background");
    darkModebtn.innerHTML = "Enable Dark Mode"
    removeClasses();
    card.classList.remove('card-background');
    h1.classList.remove('white');
    yournotes.classList.remove('white');
    labeltitle.classList.remove('white');
    labelnote.classList.remove('white');
    addtitle.classList.remove('note-background');
    addtext.classList.remove('note-background');
    noteselem.childNodes.forEach((element) => element.classList.remove("note-background"))
}

if(darkmode == "enabled"){
    darkMode()
}

togglbtn.addEventListener('click', (e) => {
    darkmode = localStorage.getItem("DARK_MODE");
    if (e.target.checked) {
        darkMode()
    } else  {
        lightMode()
    }
});


deletedIcon.addEventListener('click', () => {
    deletednotes.classList.toggle("show");
})






