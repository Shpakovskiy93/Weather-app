export const getWeatherData = async (city) => {
    try {
        const respons = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db1537a183ac133e6280a0a2cdd6a300&lang=ru&units=metric`
        );
        return await respons.json();
    } catch (error) {
        console.error(error);
    }
}