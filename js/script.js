const body = document.querySelector('#body');//import code  in body

//create a container to display a cards

const container = document.createElement('div');
container.setAttribute('class', 'container');
body.appendChild(container);


let title = document.createElement("h1");
title.classList.add("text-center");
title.style = "color: goldenrod;";
title.innerText = "REST countries and Weather APIs";
title.id = "title";
container.appendChild(title);



//create a row div to display a cards in row
const row = document.createElement('div');
row.classList.add('row');
row.id = "row";
container.appendChild(row);

//Get api
async function restApi() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    return countries;
}
//after getting countries data
// print the countries data i json in (1) 
// write a function to display card details in (2)
restApi().then(data => {
    console.log(data);/* 1*/
    data.forEach(country => {  /* 2*/
        const maincard = document.createElement("div");
        maincard.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4", "my-3");
        row.appendChild(maincard);


        const card = document.createElement('div');/*create a card element*/
        
        card.classList.add('card', 'h-100',"position-relative",'text-white');
        maincard.appendChild(card);

        let cardhead = document.createElement("div");
        cardhead.classList.add("card-header", "text-white", "text-center", "bg-dark", "fs-4");
        cardhead.innerText = country.name.common.toUpperCase();
        card.appendChild(cardhead);

        const flag = document.createElement('img');/* Add img to card*/
        flag.classList.add('card-img-top');
        flag.id = "flag";
        flag.style="height:30vh"
        flag.setAttribute('src', country.flags.png);
        card.appendChild(flag);

        const cardBody = document.createElement('div');
        cardBody.id = "card-body";
        cardBody.classList.add('card-body','border','boder-black');

        const cardtext = document.createElement("div")/*Add content to card*/
        cardtext.id = "card-text"
        cardtext.classList.add("card-text", "text-center",'mb-5')
        cardtext.innerText = `Capital: ${country.capital} \n Region: ${country.region} \n Population:${country.population} \n Nativename:${country.name.official}`;
        cardBody.appendChild(cardtext);
        card.appendChild(cardBody);


        const WeatherBtn = document.createElement("button");/*Add button to card*/
        WeatherBtn.id = "weather-btn";
        WeatherBtn.classList.add("btn", "btn-primary", 'position-absolute', 'bottom-0', 'start-50','translate-middle-x','my-3');
        WeatherBtn.innerText = "Click for Weather";
        cardBody.appendChild(WeatherBtn);

        const weatherCard = document.createElement("div");
        weatherCard.id = "weatherCard";
        weatherCard.classList.add("d-none", "card-text", "text-center",'mb-5');
        cardBody.appendChild(weatherCard);

        async function weather() {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=e765a09125fc32227a1ee1cfc4ac35db`);
            const weatherData = await weatherResponse.json();
            return weatherData;
        }
        weather().then(data => {
            console.log("sucess");
                
                
            const weatherInfo = document.createElement("div");
            weatherInfo.id = "weatherInfo";
            weatherInfo.classList.add("card-text", "text-center");
            weatherInfo.innerText = `Weather: ${data.weather[0].description} \n Temperature: ${(data.main.temp)} kelvin\n Humidity: ${data.main.humidity} \n Wind Speed: ${data.wind.speed}`;   
            weatherCard.appendChild(weatherInfo);

            closeBtn = document.createElement("button");
            closeBtn.id = "close-btn";
            closeBtn.classList.add("btn", "btn-danger", 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x', 'my-3');
            closeBtn.innerText = "Close";
            weatherCard.appendChild(closeBtn);

            WeatherBtn.addEventListener("click", () => {
                weatherCard.classList.remove("d-none");
                cardtext.classList.add("d-none");
                WeatherBtn.classList.toggle("d-none");
              
            });
            closeBtn.addEventListener("click", () => {
                weatherCard.classList.add("d-none");
                cardtext.classList.remove("d-none");
                WeatherBtn.classList.remove("d-none");
               
            });

        })

    });
})
