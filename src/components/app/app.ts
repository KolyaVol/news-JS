import AppController from '../controller/controller';
import type { CurrAppController } from '../controller/controller';
import { AppView } from '../view/appView';
import type { ResData } from '../controller/loader';
import type { NewsData } from '../view/appView';

interface CurrApp {
    controller: CurrAppController;
    view: AppView;
    start: () => void;
}

class App implements CurrApp {
    controller: CurrAppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const doc = document.querySelector('.sources');
        if (doc !== null) {
            doc.addEventListener('click', <T>(e: T) =>
                this.controller.getNews(e as PointerEvent, (data) => this.view.drawNews(data as NewsData))
            );
            this.controller.getSources((data) => this.view.drawSources(data as ResData));
        }
    }
}

export default App;
