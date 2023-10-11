function getElement(element) {
  return document.querySelector(element);
}

let input = getElement("input"),
  thumbnail_container = getElement(".thumbnail_container"),
  default_innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 20q-2.275 0-3.888-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.313 3.188T18.5 20h-12Zm3.85-3.425q.2 0 .375-.063t.325-.212l4.225-4.225q.3-.3.3-.725t-.3-.725q-.3-.3-.725-.3t-.725.3l-3.5 3.5l-1.4-1.4q-.275-.275-.7-.275t-.7.275q-.3.3-.3.725t.3.7L9.65 16.3q.15.15.325.212t.375.063Z"/></svg>
  <div>Paste video url to see preview</div>`,
  thumbnail_innerHTML = default_innerHTML,
  id,
  imageUrl,
  saveButton = getElement("button");
  thumbnail_container.classList.add("active");

function addThumbnail(value) {
  if(!value.includes("you")) return
    
  if (value.includes("?v=")) {
    id = value.split("?v=")[1].slice(0, 11);
  } else if (value.includes("https://youtu.be/")) {
    id = value.split("https://youtu.be/")[1].slice(0, 11);
  }
  imageUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  thumbnail_innerHTML = `<img src="${imageUrl}" alt="Loading...">`;
  thumbnail_container.innerHTML = thumbnail_innerHTML;
  thumbnail_container.classList.remove("active");
}

input.addEventListener("focus", ({ target }) => {
  target.nextElementSibling.style.transform = `scaleX(1)`;
});
input.addEventListener("blur", ({ target }) => {
  target.nextElementSibling.style.transform = `scaleX(0)`;
});

input.addEventListener("keyup", (e) => {
    if(e.target.value === ""){
        thumbnail_container.innerHTML = default_innerHTML;
        thumbnail_container.classList.add("active");
    }else {
        addThumbnail(e.target.value);
    }
});
