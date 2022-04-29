import { getWeatherData } from "./api.js"
import { createHeader } from "./header.js";
import { CreatePageContent } from "./pageContent.js";

const app = async () => {
    const weather = await getWeatherData(JSON.parse(localStorage.getItem('city')) || 'Киев');
    const header = createHeader(weather.name);
    const pageContent = CreatePageContent(weather);
    document.body.append(header, pageContent);
}
app();