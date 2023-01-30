import { IDataSourceItem } from '../../controller/loader';
import './sources.css';

class Sources {
    draw(data?: IDataSourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data?.forEach((item: IDataSourceItem) => {
            const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true);

            ((sourceClone as HTMLTemplateElement).querySelector('.source__item-name') as HTMLElement).textContent =
                item.name;
            ((sourceClone as HTMLTemplateElement).querySelector('.source__item') as HTMLElement).setAttribute(
                'data-source-id',
                item.id
            );

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
