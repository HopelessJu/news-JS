import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'efc67b4603d0405282715fa8cd955bb0', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
