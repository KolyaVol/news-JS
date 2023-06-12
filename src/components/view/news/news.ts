import './news.css';

interface NewsComponent {
    draw: (data: [Article]) => void;
}

type Article = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
};

class News implements NewsComponent {
    draw(data: [Article]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const template: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        news.forEach((item: Article, idx: number) => {
            const templateElementClone = template?.content.cloneNode(true) as HTMLDivElement;
            const currArticleData = {
                imageUrl: `url(${item.urlToImage || 'img/news_placeholder.jpg'})`,
                authorMetaUrl: item.author || item.source.name,
                publishedDate: item.publishedAt.slice(0, 10).split('-').reverse().join('-'),
                title: item.title,
                sourceName: item.source.name,
                description: item.description,
                url: item.url,
            };
            if (templateElementClone) {
                if (idx % 2) templateElementClone.querySelector('.news__item')?.classList.add('alt');
                templateElementClone
                    .querySelector('.news__meta-photo')
                    ?.setAttribute('style', `background-image: ${currArticleData.imageUrl}`);
                (templateElementClone.querySelector('.news__meta-author') as Node).textContent =
                    currArticleData.authorMetaUrl;
                (templateElementClone.querySelector('.news__meta-date') as Node).textContent =
                    currArticleData.publishedDate;
                (templateElementClone.querySelector('.news__description-title') as Node).textContent = item.title;
                (templateElementClone.querySelector('.news__description-source') as Node).textContent =
                    item.source.name;
                (templateElementClone.querySelector('.news__description-content') as Node).textContent =
                    item.description;
                templateElementClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

                fragment.append(templateElementClone);
            }
        });

        const doc: HTMLElement | null = document.querySelector('.news');
        if (doc) {
            doc.innerHTML = '';
            doc.appendChild(fragment);
        }
    }
}

export default News;
export type { NewsComponent, Article };
