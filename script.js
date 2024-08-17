//WEATHER APP

const weatherFORM = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "11440d0f82d1d4365a9e411a73580e1a";

weatherFORM.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value;

    if (city){
        try{
            const weatherdata = await getWheatherData(city);
            displayWeatherInfo(weatherdata);
            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a city");
    }
} );

async function getWheatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could Not Fetch Whether");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const {name, 
            main:{temp , humidity},
            weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex"
    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const humiditiyDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("h1");

    cityDisplay.textContent = name;
    tempDisplay.textContent = `${((temp-273.15) * 9/5 +32).toFixed(1)}F`
    humiditiyDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = weatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("temp");
    humiditiyDisplay.classList.add("humidity");
    descDisplay.classList.add("desc");
    emojiDisplay.classList.add("emoji");
     
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humiditiyDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

function weatherEmoji(weatherid){
    switch (true) {
        case (weatherid>=200 && weatherid <300):
            card.style.background = "linear-gradient(180deg, hsl(40, 90%, 58%), hsl(211, 66%, 13%))";
            return "🌩️";
            
        case (weatherid>=300 && weatherid<400):
            card.style.background = 'linear-gradient(180deg,hsl(40, 100%, 75%), hsl(210, 76%, 29%))'
            return "🌦️";
            
        case (weatherid>=500 && weatherid<600):
            card.style.background = "linear-gradient(180deg, hsl(210, 78%, 18%),hsl(210, 100%, 66%))";
            return "🌧️";
            
        case (weatherid>=600 && weatherid<700):
            card.style.background = "linear-gradient(180deg,hsl(210, 60%, 74%), hsl(210, 60%, 74%))";
            return "❄️";
            
        case (weatherid>=700 && weatherid <800):
            card.style.background = "linear-gradient(180deg, hsl(210, 17%, 48%),hsl(210, 59%, 77%))";
            return "🌫️";
            
        case(weatherid===800):
            card.style.background = "linear-gradient(180deg, hsl(210, 100%, 66%), hsl(40, 100%, 75%))";
            return "☀️";
            
        case(weatherid >800):
            card.style.background = "linear-gradient(180deg, hsl(210, 100%, 66%), hsl(40, 79%, 85%))";
            return "⛅";
            
        default:
            card.style.background = "white";
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
