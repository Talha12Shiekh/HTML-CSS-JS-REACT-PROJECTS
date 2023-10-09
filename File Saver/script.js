function getElement(element) {
  return document.querySelector(element);
}

let textarea = getElement("#text_area"),
downloadButton = getElement("#download_btn"),
fileNameInput = getElement("#file_name"),
selectMenu = getElement("select"),
options = document.querySelectorAll("option"),
selectedExtension = options[0].value;

selectMenu.addEventListener("change",({target}) => {
    selectedExtension = target.value
})

downloadButton.addEventListener("click",() => {
    const file = new File([textarea.value],fileNameInput.value,{type:selectedExtension})
    let anchor = document.createElement("a");
    let fileUrl = URL.createObjectURL(file);
    anchor.download = file.name == "" ? "nothing" : file.name;
    anchor.href = fileUrl;
    document.body.append(anchor)
    anchor.click();
}) 