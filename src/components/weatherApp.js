import { useEffect, useState } from "react"
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from './weatherApp.module.css';
import Loading from "./loading";

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);

    console.log({ styles });

    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name}`;
    }, [weather]);

    async function loadInfo(city = 'london') {
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);
            const json = await request.json();

            setTimeout(() => {
                setWeather(json);
            }, 2000);


            console.log(json);
        } catch (error) {

        }
    }

    function handleChangeCity(city) {
        setWeather(null);
        loadInfo(city);
    }

    return (
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleChangeCity}></WeatherForm>
            {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}

        </div>
    )
}