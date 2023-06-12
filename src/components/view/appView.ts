import News from './news/news';
import Sources from './sources/sources';
import { CurrentSources } from './sources/sources';
import type { NewsComponent, Article } from './news/news';
import type { ResData, SourceType } from '../controller/loader';

interface CurrAppView {
    news: NewsComponent;
    sources: CurrentSources;
    drawNews: (data: NewsData) => void;
    drawSources: (data: ResData) => void;
}

type NewsData = {
    articles: [Article];
    status: string;
    totalResults: number;
};

export class AppView implements CurrAppView {
    news: NewsComponent;
    sources: CurrentSources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values as [Article]);
    }

    drawSources(data: ResData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values as [SourceType]);
    }
}

export default AppView;
export type { CurrAppView, NewsData };
