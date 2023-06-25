console.log("making a news website");
// 6e83f3941d1a4fdf818192919f5e6619
let api = `6e83f3941d1a4fdf818192919f5e6619`;
let newsacordian = document.getElementById('newsacordian');

const xhr = new XMLHttpRequest();

xhr.open('GET', `https://newsapi.org/v2/top-headlines?q=trump&apiKey=${api}`, true);

xhr.onload = function () {

    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        // console.log(articles);
        let newshtml = "";
        articles.forEach((element, index) => {
            let news = `
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0" >
                                    <button class="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                    <b style="color:red;">Breaking news : ${index + 1}&ensp;</b>${element["title"]}
                                    </button>
                                </h2>
                            </div>
                    
                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsacordian">
                                <div class="card-body" ">
                                    ${element["content"]}<a href="${element["url"]}" target="_blank">Read more here</a>

                                </div>
                            </div>
                        </div>
            </div>`;
            newshtml += news;
        });
        newsacordian.innerHTML = newshtml;
    } else {
        console.log("some error occurred");
    }
}
xhr.send();



let searchinput = document.getElementById('searchinput');
searchinput.addEventListener('input', searchnews);

function searchnews(e) {
    e.preventDefault();
    let searchval = searchinput.value;

    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((element) => {
        let cardstext = element.getElementsByTagName('h2')[0];
        if (cardstext) {
            let innertext = cardstext.innerText || cardstext.textContent;
            if (innertext.toLowerCase().includes(searchval)) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }


    })

}
