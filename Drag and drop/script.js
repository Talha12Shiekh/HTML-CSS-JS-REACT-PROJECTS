const getElement = element => document.querySelector(element);

let drop_container = getElement(".drop_container"),
drop_h2 = getElement(".drop_container h2");

drop_container.addEventListener("dragenter",function(e){
    e.preventDefault();
    this.classList.add("active");
    // drop_h2.textContent = "Release File to upload"
});

drop_container.addEventListener("dragover",function(e){
    e.preventDefault();
    drop_h2.textContent = "Release File to upload"
});

drop_container.addEventListener("dragleave",function(){
    this.classList.remove("active");
    drop_h2.textContent = "Drop your files here"
});

drop_container.addEventListener("drop",function(e){
    e.preventDefault()
    let droppedFile = e.dataTransfer.files[0];
    // let droppedURL = URL.createObjectURL(droppedFile);
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
        let dataURL = e.target.result;
        let image = document.createElement("img");
        image.src = dataURL;
        image.href = "Loading...";
        this.append(image);
    }
    fileReader.readAsDataURL(droppedFile);
    this.classList.add("none");
    drop_h2.textContent = "Drop your files here"
});


