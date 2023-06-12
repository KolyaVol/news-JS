import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'b7f715a966f74f07979f961d5e8a6aaf',
        });
    }
}

export default AppLoader;
