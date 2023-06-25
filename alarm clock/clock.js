let submitbtn = document.getElementById('submitbtn');
let audio = new Audio('music.mp3');
const ringbell = () => {
    audio.play();
}

const ringalarm = (e) => {
    e.preventDefault();
    let alarminput = document.getElementById('alarminput');
    alarmdate = new Date(alarminput.value);
    // console.log(`setting alarm for this date ${alarmdate}`);

    now = new Date();

    let alarmdif = alarmdate - now;
    console.log(alarmdif);
    if (alarmdif >= 0) {
        setTimeout(() => {
            ringbell();
        }, alarmdif);
    }
}
submitbtn.addEventListener('click', ringalarm);


