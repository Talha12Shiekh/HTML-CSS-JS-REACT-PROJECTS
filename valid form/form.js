console.log("making a valid form using html and javascript");

// getting the references
const username = document.getElementById('UserName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
let emailvalid = false;
let phonevalid = false;
let uservalid = false;

// adding eventlisteners
username.addEventListener('blur', (e) => {
    e.preventDefault();
    // validate name here
    let regex = /^[a-zA-Z]([0-9a-zA-Z]){2,10}$/
    let str = username.value;
    if (regex.test(str)) {
        username.classList.remove('is-invalid');
        uservalid = true;
    } else {
        username.classList.add('is-invalid');
        uservalid = false;
    }
});

email.addEventListener('blur', (e) => {
    e.preventDefault();
    let regex1 = /^([_\- \. a-zA-Z0-9]+)@([_\- \. a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/;
    let str = email.value;
    if (regex1.test(str)) {
        email.classList.remove('is-invalid');
        emailvalid = true;
    } else {
        email.classList.add('is-invalid');
        emailvalid = false;
    }
});

phone.addEventListener('blur', (e) => {
    e.preventDefault();
    let regex = /^([0-9]){0,11}$/
    let str = phone.value;
    if (regex.test(str)) {
        phone.classList.remove('is-invalid');
        phonevalid = true;
    } else {
        phone.classList.add('is-invalid');
        phonevalid = false;
    }
});


let submit = document.getElementById('submit');

submit.addEventListener('click', (e) => {

    console.log(emailvalid,phonevalid,uservalid);
    e.preventDefault();

if(emailvalid && phonevalid && uservalid){
    let failure = document.getElementById('failure');
    console.log("all three things are valid");
    let success = document.getElementById('success');
    success.classList.add('show');
    failure.classList.remove('show');
    // $("#success").show();
    // $("#failure").hide();

}else{
    console.log(" in all three things one two or all are invalid");
    let failure = document.getElementById('failure');
    failure.classList.add('show');
    success.classList.remove('show');
    // $("#failure").show();
    // $("#success").hide();
}

})