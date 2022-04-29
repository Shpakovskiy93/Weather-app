import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./helper.js";

const key = `c2bfc1034f2d4dafb5fe87b676a6106e`;
export const handleWeatherByGeolacation = () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    const success = async (pos) => {
        const crd = pos.coords;
        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&lang=ru&apiKey=${key}`
        );

        const result = await response.json();
        const weather = await getWeatherData(result.features[0].properties.city);

        resetWeatherContent(result.features[0].properties.city, weather)
    }
    const error = (error) => {
        console.log(error.code + ' ' + error.message);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}