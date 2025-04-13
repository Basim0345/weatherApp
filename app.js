function weatherApplication() {
    let cityName = document.querySelector("#cityName").value
    console.log(cityName)
    let API_KEY = "85b9397463cc6c02f9ab4feae9b55553"
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            document.querySelector("#result").innerHTML = `${response.data.main.temp}<br>C&deg`
            document.querySelector("#feelsLike").innerHTML = `F/L<br>${response.data.main.feels_like} C&deg`
            // document.querySelector("#humidity").innerHTML=`Humd<br> ${response.data.main.humidity} %`
            document.querySelector("#cname").innerHTML = `${response.data.sys.country}`
            document.querySelector("#cloud").innerHTML = `${response.data.weather[0].main}`
            const offsetInSeconds = response.data.timezone;
            updateClockWithTimezone(offsetInSeconds);
            console.log(response)

            let condition = response.data.weather[0].main.toLowerCase(); // lowercase
let conditionClass = '';

if (condition.includes('cloud')) conditionClass = 'clouds';
else if (condition.includes('rain')) conditionClass = 'rain';
else if (condition.includes('snow')) conditionClass = 'snow';
else if (condition.includes('clear')) conditionClass = 'clear';
else if (condition.includes('thunder')) conditionClass = 'thunderstorm';
else conditionClass = 'Default';

document.body.className = '';
document.body.classList.add(conditionClass);
console.log("Applied background class:", conditionClass);
// let condition = response.data.weather[0].main; // e.g., 'Clear', 'Rain', etc.

// Normalize to your known styles
const knownConditions = ['Clear', 'Rain', 'Clouds', 'Snow', 'Thunderstorm'];
// let conditionClass = knownConditions.includes(condition) ? condition : 'Default';

// Set class on body
document.body.className = ''; // clear previous class
document.body.classList.add(conditionClass);


        })
        .catch(function (error) {
            document.querySelector("#result").innerHTML = "eror"
            document.querySelector("#feelsLike").innerHTML = "eror"
            document.querySelector("#humidity").innerHTML = "eror"
            // document.querySelector("#cname").innerHTML = "eror"
        })
}
// function clock() {
//     let time = moment().format('LTS');
//     let [mainTime, ampm] = time.split(' '); // Split into ["1:23:45", "PM"]

//     document.getElementById("clock").innerHTML =`${mainTime}<span style="font-size: 0.6em; vertical-align: super; margin-left: 2px;">${ampm}</span>
//     `;
// }
// setInterval(clock, 1000);
// clock(); 

let intervalId; // to store the setInterval reference

function updateClockWithTimezone(offsetInSeconds) {
    if (intervalId) clearInterval(intervalId); // clear previous interval if any

    function update() {
        const utc = moment.utc(); // get current UTC time
        const localTime = utc.add(offsetInSeconds, 'seconds');
        document.getElementById("clock").innerHTML = localTime.format('hh:mm:ss A');
    }

    update(); // run immediately
    intervalId = setInterval(update, 1000); // update every second
}
