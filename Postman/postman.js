console.log("making a postman clone using js");

//Utility functions

// 1. to get element form string 
function getElementFromString(html) {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
}
// initialize number of variables
let addparamscount = 0;
// Hided the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the users clicks on parms hide the json box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('jsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

// if the users clicks on json box hide the parms box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('jsonBox').style.display = 'block';
});

// if the user clicks on + button add more parameters

let addparam = document.getElementById('Addparam');
addparam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let html = `<div class="form-row my-2">
    <label for="URL" class="col-sm-2 col-form-label">Parameter ${addparamscount + 2}</label>
    <div class="col-md-4">
        <input type="email" class="form-control" id="parameterKey${addparamscount + 2}" placeholder="Enter parameter ${addparamscount + 2} key">
    </div>
    <div class="col-md-4">
        <input type="password" class="form-control" id="parameterValue${addparamscount + 2}"
            placeholder="Enter parameter ${addparamscount + 2} value">
    </div>
    <button  class="btn btn-primary DeleteParam"> - </button>
</div>`;

    //converting the element string to dom node
    let paramElement = getElementFromString(html);
    // console.log(paramElement);
    params.appendChild(paramElement);

    // adding an event listener to remove the parameter on clicking - button

    let DeleteParam = document.getElementsByClassName('DeleteParam');
    for (item of DeleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    };
    addparamscount++;
});

// if the user clicks on submit button
let submit = document.getElementById('Submit');
submit.addEventListener('click', () => {
    // show please wait
    document.getElementById('responsePrism').innerHTML = "Please Wait    Fetching response.....";

    // fetch all the values the users has entered
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name ='Request Type']:checked").value;
    let contentType = document.querySelector("input[name ='Content Type']:checked").value;

    //checking all the values



    // if user has used params option instead of json , collect all the parameters in an object
    if (contentType == "params") {
        data = {};
        for (let i = 0; i < addparamscount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
                console.log(data);
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonText').value;
    }

    
    // if the request type is post invoke the fetch api to create a post request
    
    if (requestType=="GET"){
       
        fetch(url, {
            method: "GET",   
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
        // console.log(data);
    }else{
        fetch(url, {
            method: "POST",
            body : data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },   
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    
});
