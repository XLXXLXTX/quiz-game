
const createUrlApi = async (params, useToken) => {

    // function to create an url like in this example
    // https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple

    const urlApi = getUrlTriviaApi();
    const tokenApi = getTokenTriviaApi();
    let paramsApi = params;

    let url = ''
    if (useToken) {
        url = `${urlApi}?token=${tokenApi}`;
    }else{
        url = `${urlApi}`;
    }
    

    if (paramsApi) {
        paramsApi = Object.keys(paramsApi).map(key => `${key}=${paramsApi[key]}`).join('&');
        if (!useToken) {
            url = `${url}?${paramsApi}`;
        }else{
            url = `${url}&${paramsApi}`;
        }
    }

    return url;
}

const getTokenTriviaApi = () => {

    // for now, just return the token from the .env file
    // in the future maybe try to handle the token from the API
    // and reset it when it expires, for example:
    // -when we get an error code 3 => Token Not Found Session Token does not exist.
    // -when we get an error code 4 => Token Empty Session Token has returned all possible questions for the specified query. 
    //  Resetting the Token is necessary.
    // idk check this errors in the future 

    return process.env.TOKEN_TRIVIA_API;
}

const getUrlTriviaApi = () => {
    return process.env.URL_TRIVIA_API;
}

const getUrlResetTokenTriviaApi = () => {
    return process.env.URL_RESET_TOKEN;
}

const getUrlNewTokenTriviaApi = () => {
    return process.env.URL_NEW_TOKEN;

}

const requestNewToken = async () => { 
    const url = getUrlNewTokenTriviaApi();

    const response = await fetch(url);

    if (!response.ok) {
        //throw new Error(`HTTP error! Status: ${response.status}\n${response}`);
        console.log(`HTTP error! Status: ${response.status}\n${response}`);
        return false;
    }

    const data = await response.json();

    if (data.response_code === 0) {
        console.log('✅ New token acquired!');
        console.log('⌛ Saving new token ...');
        // save new token in .env file
        const fs = require('fs');
        const dotenv = require('dotenv');
        dotenv.config();

        const envConfig = dotenv.parse(fs.readFileSync('.env'));
        envConfig.TOKEN_TRIVIA_API = data.token;

        const envConfigString = Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n');

        fs.writeFileSync('.env', envConfigString);

        console.log('✅ New token saved!');

        dotenv.config();
    }
}

const resetTokenTriviaApi = async () => {

    // example Url to reset token
    // https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE

    const urlreset = getUrlResetTokenTriviaApi();
    const token = getTokenTriviaApi();

    let url = `${urlreset}${token}`;
    console.log(`⌛ Fetching Trivia API URL to reset the token ... \n\t${url}`);
    const response = await fetch(url);

    if (!response.ok) {
        //throw new Error(`HTTP error! Status: ${response.status}\n${response}`);
        console.log(`HTTP error! Status: ${response.status}\n${response}`);
        return false;
    }

    const data = await response.json();

    if (data.response_code === 0) {
        console.log('✅ Token reseted!');
    }else{
        console.log('❌ Token not reseted!');
        console.log('⌛ Requesting new token ...');

        requestNewToken();
    }

    //console.log('data:', data);

    return true;

}

module.exports = { createUrlApi, getTokenTriviaApi, getUrlTriviaApi, getUrlResetTokenTriviaApi, resetTokenTriviaApi };