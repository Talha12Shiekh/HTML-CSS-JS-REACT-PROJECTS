
const data = [
    {
        name: "Skillbhai",
        age: 18,
        city: "lahore",
        languages: "javascript",
        framework: "bootstrap",
        image: "https://randomuser.me/api/portraits/med/men/80.jpg"
    },

    {
        name: "shiekh",
        age: 20,
        city: "lahore",
        languages: "react js",
        framework: "tailblocks",
        image: "https://randomuser.me/api/portraits/med/men/81.jpg"
    },

    {
        name: "awais",
        age: 22,
        city: "gujranwala",
        languages: "vue js",
        framework: "angular",
        image: "https://randomuser.me/api/portraits/med/men/82.jpg"
    },

    {
        name: "shahbaz",
        age: 24,
        city: "quetta",
        languages: "kaboom js",
        framework: "Django",
        image: "https://randomuser.me/api/portraits/med/men/83.jpg"
    },

    {
        name: "ahsan",
        age: 26,
        city: "islamabad",
        languages: "next js",
        framework: "flask",
        image: "https://randomuser.me/api/portraits/med/men/84.jpg"
    }
];


function cviterator(profiles) {
    let nextindex = 0;
    return {
        next: function () {
            if (nextindex < profiles.length) {
                return {
                    value: profiles[nextindex++],
                    done: false,
                }
            }
            else {
                return {
                    done: true
                }
            }
        }
    }
}

const candidates = cviterator(data);



const nextCV = () => {
    const currentcandidate = candidates.next().value;
    let image = document.getElementById('image');
    let profile = document.getElementById('profile');
    if (currentcandidate != undefined) {


        image.innerHTML = `<img src ="${currentcandidate.image}">`;
        profile.innerHTML = `<ul class="list-group">
    <li class="list-group-item">Name : ${currentcandidate.name}</li>
    <li class="list-group-item">${currentcandidate.age} years old </li>
    <li class="list-group-item">  Lives in  ${currentcandidate.city}</li>
    <li class="list-group-item">Primarily works on ${currentcandidate.languages}</li>
    <li class="list-group-item">Uses ${currentcandidate.framework}</li>
  </ul>`;
    } else {
        alert("Candidate applications are finished!");
        window.location.reload()
    }
};
nextCV();

let profilesbtn = document.getElementById('profilesbtn');
profilesbtn.addEventListener('click', nextCV);





