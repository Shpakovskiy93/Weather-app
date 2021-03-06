import { capitalizeFirstLetter, directionOfWind } from "./helper.js";

export const CreatePageContent = (data) => {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const inner = document.createElement('div');
    const iconBlock = document.createElement('img');
    const temperature = document.createElement('h2');
    const units = document.createElement('span');
    const description = document.createElement('p');
    const weatherInfo = document.createElement('div');
    const weatherInfoList = document.createElement('ul');
    const weatherInfoWind = document.createElement('li');
    const weatherInfoPressure = document.createElement('li');
    const weatherInfoHumidity = document.createElement('li');
    const weatherInfoClouds = document.createElement('li');

    section.classList.add('weather');
    container.classList.add('container', 'weather__container');
    inner.classList.add('weather__inner');
    iconBlock.classList.add('weather__icon');
    temperature.classList.add('weather__temperature');
    units.classList.add('weather__units');
    description.classList.add('weather__description');
    weatherInfo.classList.add('weather__info');
    weatherInfoList.classList.add('weather__info-list');
    weatherInfoWind.classList.add('weather__info-item');
    weatherInfoHumidity.classList.add('weather__info-item');
    weatherInfoPressure.classList.add('weather__info-item');
    weatherInfoClouds.classList.add('weather__info-item');

    temperature.textContent = Math.floor(data.main.temp);
    description.textContent = capitalizeFirstLetter(data.weather[0].description);
    iconBlock.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    units.textContent = 'o';

    const createWeatherItemTitle = (text) => {
        const span = document.createElement('span');
        span.textContent = text;
        return span;
    }
    const createWeatherItemContent = (text) => {
        const p = document.createElement('span');
        p.textContent = text;
        return p;
    }

    weatherInfoWind.append(
        createWeatherItemTitle('??????????'),
        createWeatherItemContent(`${data.wind.speed} ??/c, ${directionOfWind(data.wind.deg)}`)
    )
    weatherInfoHumidity.append(
        createWeatherItemTitle('????????????????'),
        createWeatherItemContent(`${data.main.pressure} ????.????.????`)
    )
    weatherInfoPressure.append(
        createWeatherItemTitle('??????????????????'),
        createWeatherItemContent(`${data.main.humidity} %`)
    )
    weatherInfoClouds.append(
        createWeatherItemTitle('????????????????????'),
        createWeatherItemContent(`${data.clouds.all} %`)
    )

    main.append(section);
    section.append(container);
    container.append(inner, description, weatherInfo);
    inner.append(iconBlock, temperature, units);
    weatherInfo.append(weatherInfoList);
    weatherInfoList.append(
        weatherInfoWind,
        weatherInfoPressure,
        weatherInfoHumidity,
        weatherInfoClouds
    );

    return main;
}