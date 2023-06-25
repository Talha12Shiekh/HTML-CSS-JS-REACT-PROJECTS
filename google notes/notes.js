const addbutton = document.getElementById('add');


const updataedata = () =>{
    let textareadata = document.querySelectorAll('textarea');
    const notes = [];

    textareadata.forEach((note)=>{
         return notes.push(note.value);
    });
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes))
}

const addnewnote = (text = "") => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmldata = `<div class="opertaion">
    <button class="edit"> <i class="fa-solid fa-pen-to-square fa-edit"></i></button>
    <button class="delete"><i class="fa-solid fa-trash fa-trash-alt"></i></button>
</div>
<div class="main ${text ? "" : "hidden"}"  ></div>
<textarea class="${text ? "hidden" : ""}" ></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmldata);
    // console.log(note);

    // getting the refrences of edit and delete buttons
    const editbtn = note.querySelector(".edit");
    const dltbtn = note.querySelector(".delete");
    const maindiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");


    // deleting the note 
    dltbtn.addEventListener('click', () => {
        note.remove();
        updataedata();
    });

    maindiv.innerHTML = text;
    textarea.value = text;
    // console.log(text);
//     const tesst = maindiv.innerHTML;
// console.log(tesst);

    editbtn.addEventListener('click', () => {
        maindiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });


    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        // console.log(value);
        maindiv.innerHTML = value;

        // updataedata();
    });







    // toggle using edit icon 



    document.body.appendChild(note)
    // it will appends a node as the last child of a node 
}

// getting data back from localStorage
const notes2 = JSON.parse(localStorage.getItem('notes'));

if (notes2) {
 notes2.forEach((note) => addnewnote(note));   
}

addbutton.addEventListener('click', () => addnewnote());