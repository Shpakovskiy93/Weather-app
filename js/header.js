import { getWeatherData } from "./api.js";
import { handleWeatherByGeolacation } from "./geolocation.js";
import { cToF, fToC, resetWeatherContent } from "./helper.js";

export const createHeader = (city) => {
    //create HTML elements
    const header = document.createElement('header');
    const headerContainer = document.createElement('div');
    const headerCity = document.createElement('div');
    const headerUnits = document.createElement('div');
    const cityChange = document.createElement('button');
    const cityLocation = document.createElement('button');
    const cityName = document.createElement('h1');
    const unitsC = document.createElement('button');
    const unitsF = document.createElement('button');
    const cityInner = document.createElement('div');
    const searchBlock = document.createElement('div');
    const searcInput = document.createElement('input');
    const searchBtn = document.createElement('button');
    const errorBlock = document.createElement('p');

    //add class from HTML elements
    header.classList.add('header');
    headerContainer.classList.add('container', 'header__container');
    headerCity.classList.add('header__city');
    headerUnits.classList.add('header__units');
    cityChange.classList.add('city__change','btn__reset');
    cityLocation.classList.add('city__location','btn__reset');
    cityName.classList.add('city__name');
    cityInner.classList.add('city__inner');
    unitsC.classList.add('units__c','btn__reset','unit__current');
    unitsF.classList.add('units__f','btn__reset');
    searchBlock.classList.add('search');
    searcInput.classList.add('search__input');
    searchBtn.classList.add('search__btn');
    errorBlock.classList.add('search__error');

    //add text from HTML elements
    searchBtn.textContent = 'ok';
    cityName.textContent = city;
    cityChange.textContent = 'Сменить город';
    cityLocation.textContent = 'Мое местоположения';
    unitsC.textContent = 'C';
    unitsF.textContent = 'F';

    cityChange.addEventListener('click', () => {
        headerCity.innerHTML = '';
        searchBlock.append(searcInput, searchBtn, errorBlock);
        headerCity.append(searchBlock);
    })

    const showError = (message) => {
        errorBlock.classList.add('show__error');
        errorBlock.textContent = message;
    }

    searchBtn.addEventListener('click', async () => {
        if(!searcInput.value) {
            return;
        }
        try {
            const weather = await getWeatherData(searcInput.value);
            if(weather.message) {
                showError(weather.message);
                return;
            }
            resetWeatherContent(weather.name, weather)
        } catch (error) {
            console.log(error);
        }
    })

    unitsC.addEventListener('click', () => {
        if(unitsC.classList.contains('unit__current')) {
            return;
        }
        unitsC.classList.add('unit__current');
        unitsF.classList.remove('unit__current');
        document.querySelector('.weather__units').textContent = 'o';

        const temperature = document.querySelector('.weather__temperature');
        const convertTemperature = fToC(+temperature.textContent);
        temperature.textContent = Math.round(convertTemperature);
    })
    unitsF.addEventListener('click', () => {
        if(unitsF.classList.contains('unit__current')) {
            return;
        }
        unitsF.classList.add('unit__current');
        unitsC.classList.remove('unit__current');
        document.querySelector('.weather__units').textContent = 'f';

        const temperature = document.querySelector('.weather__temperature');
        const convertTemperature = cToF(+temperature.textContent);
        temperature.textContent = Math.round(convertTemperature);
    })

    window.addEventListener('click', e => {
        if(e.target == searcInput || e.target == searchBtn || e.target == cityChange) {
            return;
        } else {
            headerCity.innerHTML = '';
            errorBlock.classList.remove('show__error');
            searcInput.value = '';
            headerCity.append(cityName, cityInner);
        }
    })

    cityLocation.addEventListener('click', handleWeatherByGeolacation)

    header.append(headerContainer);
    headerContainer.append(headerCity, headerUnits);
    cityInner.append(cityChange, cityLocation);
    headerCity.append(cityName, cityInner);
    headerUnits.append(unitsC, unitsF);

    return header;
} 