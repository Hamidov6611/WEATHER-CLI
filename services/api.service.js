import https from 'https'
import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'
const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getWeather = async city => {
    // https://api.openweathermap.org/data/2.5/weather

    const token = process.env.Token ?? (await getKeyValue(TOKEN_DICTIONARY.token))
    if(!token) {
        throw new Error("API doesn't exist, -t [API_KEY] for saving token")
    }


    const {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric',
        }
    })

    return data

    // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    // url.searchParams.append('q', city)
    // url.searchParams.append('appid', token)
    // url.searchParams.append('lang', 'en')
    // url.searchParams.append('units', 'metric')

    // https.get(url, response => {
    //     let res = ''
    //     response.on('data', (chank) => {
    //         res += chank
    //     })
    //     response.on('end', () => {
    //         console.log(res)
    //     })
    // })
}

export {getWeather, getIcon}