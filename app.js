function weatherApplication() {
    let cityName = document.querySelector("#cityName").value
    console.log(cityName)
    let API_KEY = "85b9397463cc6c02f9ab4feae9b55553"
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            document.querySelector("#result").innerHTML = `${response.data.main.temp} C&deg`
            document.querySelector("#feelsLike").innerHTML = `F/L ${response.data.main.feels_like} C&deg`
            document.querySelector("#humidity").innerHTML=`Humd ${response.data.main.humidity} %`
            document.querySelector("#cname").innerHTML=`${response.data.sys.country}`
            console.log(response)
        })
        .catch(function (error) {
            document.querySelector("#result").innerHTML = "eror"
            document.querySelector("#feelsLike").innerHTML = "eror"
            document.querySelector("#humidity").innerHTML = "eror"
            // document.querySelector("#cname").innerHTML = "eror"
        })
}
function clock() {
    let time = moment().format('LTS');
    let [mainTime, ampm] = time.split(' '); // Split into ["1:23:45", "PM"]

    document.getElementById("clock").innerHTML =`${mainTime}<span style="font-size: 0.6em; vertical-align: super; margin-left: 2px;">${ampm}</span>
    `;
}
setInterval(clock, 1000);
clock(); 