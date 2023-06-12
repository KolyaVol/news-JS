import type { SourceType } from '../../controller/loader';
import './sources.css';

interface CurrentSources {
    draw: (data: [SourceType]) => void;
}

class Sources implements CurrentSources {
    draw(data: [SourceType]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        data.forEach((item: SourceType) => {
            if (sourceItemTemp !== null) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLDivElement;
                (sourceClone.querySelector('.source__item-name') as Node).textContent = item.name;

                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        const doc: HTMLElement | null = document.querySelector('.sources');
        doc instanceof HTMLElement ? doc.append(fragment) : '';
    }
}

export default Sources;
export type { CurrentSources };
