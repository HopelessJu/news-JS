import AppController from '../controller/controller';
import { IDataSources } from '../controller/loader';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data?: IDataSources) => this.view.drawNews(data))
        );
        this.controller.getSources((data?: IDataSources) => this.view.drawSources(data));
    }
}

export default App;
