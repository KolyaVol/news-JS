import AppLoader from './appLoader';

interface CurrAppController {
    getSources: (callback: <T>(data?: T) => void) => void;
    getNews: (e: PointerEvent, callback: <T>(data?: T) => void) => void;
}

class AppController extends AppLoader implements CurrAppController {
    getSources(callback: () => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: PointerEvent, callback: () => void) {
        let target = e.target as Element;

        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target !== null) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (newsContainer.getAttribute('data-source') !== sourceId && sourceId !== null) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target.parentNode as Element;
            }
        }
    }
}

export default AppController;
export type { CurrAppController };
