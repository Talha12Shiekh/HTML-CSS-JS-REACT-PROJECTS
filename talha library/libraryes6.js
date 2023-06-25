//  console.log("this is the es6 version of project 2");

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
        
    }
}



class Display {
    add(book) {
     
        let tablebody = document.getElementById('tablebody');
        let tableinside = `<tr id="tablerow">
                                 <td>${book.name}</td>
                                 <td>${book.author}</td>
                                 <td>${book.type}</td>
                                 <td><button type="submit" class="btn" style="background:red;color:#fff;">Delete
                                 book</button></td>
                                 <td><button type="submit" class="redbtn" style="background: blue;
                                 color: #fff;
                                 padding: 6px;
                                 border: 2px solid transparent;
                                 width: 47px;
                                 border-radius: 5px;" onclick="redbtn(event)">IMP</td>
                         </tr>`;
        tablebody.innerHTML += tableinside;
    }

    clear() {
        let libraryform = document.getElementById('libraryform');
        libraryform.reset(); 
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    delete(){
let tablebody = document.getElementById('tablebody');
tablebody.addEventListener('click',(e)=>{
   let target = e.target;
   if(target.classList.contains('btn')){
    target.parentElement.parentElement.remove();
   }

})
    }
        
//     red(){
// // let tablebody = document.getElementById('tablebody');
// // tablebody.addEventListener('click',(e)=>{
// //    let target = e.target;
// //    if(target.classList.contains('redbtn')){
// //     target.parentElement.parentElement.classList.toggle('red');
// //    }
// // });
// let redbtn = document.getElementsByClassName('redbtn');

//     }

storage(){
    let localBook =  JSON.parse(localStorage.getItem('book'));
    console.log(localBook);
    if (localBook == null) {
        console.log("bri");
booksobj == [];
} else {
    booksobj == localBook;
    console.log("hi");
}
console.log(localBook);
}

    show(type,message) {
        let alertmessage = document.getElementById('alert');
        let text;
        if(type == "success"){
            text = "Success :";
        }else{
            text = "Error :";
        }
         alertmessage.innerHTML = `<div class="alert alert-${type}        alert-dismissible fade show" role="alert">
                <strong>${text}</strong> ${message}`;
        setTimeout(() => {
            alertmessage.innerHTML = ``;
        }, 2000);
        
        }
}

function seacrchfunction() {
    // event.preventDefault();
    
    let filter = document.getElementById('searchtxt').value.toUpperCase();
    let table = document.getElementById('tablebody');
    let tr = table.getElementsByTagName('tr');

    for(var i= 0; i < tr.length ;i++){
let td = tr[i].getElementsByTagName('td')[0];
if(td){
    let innertext = td.textContent || td.innerHTML;
    if (innertext.toUpperCase().includes(filter)) {
        tr[i].style.display = "";
    }else{
        tr[i].style.display = "none";
    }
}
}
}

function redbtn(event) {
    let target = event.target;
    target.parentElement.parentElement.classList.toggle('red');
}



function clearbtn() {
        let tablebody = document.getElementById('tablebody');
        if (confirm(`Do you really want to "Delete" all books`)) {
            tablebody.remove();
        }
}

let libraryform = document.getElementById('libraryform');
libraryform.addEventListener('submit', libraryformsubmit);

function libraryformsubmit(e) {

//  console.log("clicking");
    e.preventDefault();
   //// //  //  console.log()("you have submitted the form");
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('Author').value;
    let type;
    let science = document.getElementById('Science');
    let computer = document.getElementById('Computer');
    let entertaining = document.getElementById('Entertaining');

    if (science.checked) {
        type = science.value;
    }
    else if (computer.checked) {
        type = computer.value;
    }
    else if (entertaining.checked) {
        type = entertaining.value;
    }
    
   //// //  //  console.log()(book);
   let book = new Book(name,author,type);
   
   localStorage.setItem('book',JSON.stringify(book));
   let booksobj = [];
   booksobj.push(book);
   console.log(booksobj);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success"," Your book has been successfully added");
        display.delete();
        display.storage();
    }
    else {
        display.show("danger",' Sorry you cannot add this book');
        display.storage();
    }
}