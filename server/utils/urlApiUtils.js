
const createUrlApi = async (params) => {

    // function to create an url like in this example
    // https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple

    const urlApi = getUrlTriviaApi();
    const tokenApi = getTokenTriviaApi();
    let paramsApi = params;

    let url = `${urlApi}?token=${tokenApi}`;

    if (paramsApi) {
        paramsApi = Object.keys(paramsApi).map(key => `${key}=${paramsApi[key]}`).join('&');
        url = `${url}&${paramsApi}`;
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

module.exports = { createUrlApi, getTokenTriviaApi, getUrlTriviaApi };