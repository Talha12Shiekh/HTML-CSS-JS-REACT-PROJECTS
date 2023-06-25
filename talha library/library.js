console.log("making a library website");

// making constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// display constructor
function Display() {

}



// add methods to display prototype
Display.prototype.add = function (book) {
   // console.log()("adding the book");
    tablebody = document.getElementById('tablebody');
    let tableinside = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                    </tr>`;
    tablebody.innerHTML += tableinside;
}
Display.prototype.clear = function () {
    let libraryform = document.getElementById('libraryform');
    libraryform.reset();
}

Display.prototype.validate = function (book) {

    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}



Display.prototype.show = function (type,message) {
let alertmessage = document.getElementById('alert');
 alertmessage.innerHTML = `<div class="alert alert-${type}        alert-dismissible fade show" role="alert">
        <strong>Message :</strong> ${message}`;
setTimeout(() => {
    alertmessage.innerHTML = ``;
}, 2000);

}




//add submit event listener
let libraryform = document.getElementById('libraryform');
libraryform.addEventListener('submit', libraryformsubmit);

function libraryformsubmit(e) {
    e.preventDefault();
   // console.log()("you have submitted the form");
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
    let book = new Book(name,author,type);
   // console.log()(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success"," Your book has been successfully added");
    }
    else {
        display.show("primary",' Sorry you cannot add this book');
    }
}