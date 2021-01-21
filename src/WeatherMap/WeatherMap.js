import React, {useState} from "react";
import "./WeatherMap.css";
import up from "./img/up.svg";
import down from "./img/down.svg";
import max from "./img/max.svg";
import min from "./img/min.svg";


export function WeatherMap(props) {
    const [input,setInput] = useState("");
    const [city, setCity] = useState([]);
    const [bool,setBool] = useState(false);
    const [city5Day, setCity5Day] = useState([]);
    let arr = city5Day.map(x=>x.list)[0];
    let dayObj = {};
    arr && arr.map(x => !dayObj.hasOwnProperty(x.dt_txt.slice(0,10)) ?
        dayObj[x.dt_txt.slice(0,10)] = [x] : dayObj[x.dt_txt.slice(0,10)].push(x));

    let newArr = Object.values(dayObj);

    const handleChange = event => {
        setInput(event.target.value);
    };

    const hendleSearch = (e) => {
        e.preventDefault();
        setBool(false);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial`;
        let url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=a8e71c9932b20c4ceb0aed183e6a83bb`;
        fetch(url)
            .then(response => response.json())
            .then(data => setCity([data]))
            .catch((error) => {
                alert("Please enter a valid country or city name...!");
                window.location.reload();
            });
        fetch(url1)
            .then(response => response.json())
            .then(data => setCity5Day([data]));
        document.querySelector(".day5Forecast").style.display = "none";
        setInput("");
    };

   const handle5Forecast = () => {
        city.length && setBool(!bool);
    };

    // console.log(newArr);

   return(
        <div className={"weatherMap"}>
            <h1>Weather map forecast</h1>
            <form action="" onSubmit={hendleSearch} className={"form"}>
                <input type="text" value={input} onChange={handleChange} placeholder={"Country name"}/>
                <button disabled={!input} type="submit">
                    Search
                </button>
            </form>
            <div className={"weatherMap__main"}>
                {
                    city && city.map((x,idx)=>
                        <div key={idx}  className={"weatherMap__main-div"}>
                            <div className={"weatherMap__main-left"}>
                                <h2>{x.name}</h2>
                                <p className={"capLetter"}>Description: {x.weather[0].description}</p>
                                <p>Temperature: {x.main.temp}</p>
                                <p>Feels like: {x.main.feels_like}</p>
                                <p>Pressure: {x.main.pressure}</p>
                                <p>Humidity: {x.main.humidity}</p>
                                <p>Wind: {x.wind.speed}</p>
                                <p>Clouds: {x.clouds.all}</p>
                            </div>
                            <div className={"weatherMap__main-right"}>
                                <img src={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`} alt=""/>
                                <h3 className={"capLetter"}>Main: {x.weather[0].main}</h3>
                                <div className={"max-min"}>
                                    <div className={"max"}>
                                        <img src={max} alt=""/>
                                        <span>{(((x.main.temp_max) - 32) * 5/9).toFixed()}</span>
                                    </div>
                                    <div className={"min"}>
                                        <img src={min} alt=""/>
                                        <span>{(((x.main.temp_min) - 32) * 5/9).toFixed()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <button onClick={handle5Forecast} className={"seeMore"}>
                See 5 day  forecast
                <img src={bool ? up : down} alt=""/>
            </button>
            <div className={"day5Forecast"} style={{display: bool ? "block" :"none"}}>
                {
                    newArr && newArr.map((days,idx) =>
                        <div key={idx} className={"day5Forecast-divs"}>
                            <div className={"border"}>
                                <h2>{days[0].dt_txt.slice(0,10)}</h2>
                            </div>
                            <div className={"hr"}><hr/></div>
                            <div className={"border"}>
                                {days.map((y,id)=>
                                    <div key={id} className={"day5Forecast-divs-cart"}>
                                        <img className={"icon"} src={`http://openweathermap.org/img/wn/${y.weather[0].icon}@2x.png`} alt=""/>
                                        <p className={"p1"}>{y.dt_txt.slice(11)}</p>
                                        <h3>Main: {y.weather[0].main}</h3>
                                        <p>Wind speed: {y.wind.speed}</p>
                                        <div className={"max-min"}>
                                            <div className={"max"}>
                                                <img src={max} alt=""/>
                                                <span>{(y.main.temp_max.toString().split(".")[0])}</span>
                                            </div>
                                            <div className={"min"}>
                                                <img src={min} alt=""/>
                                                <span>{y.main.temp_min.toString().split(".")[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

