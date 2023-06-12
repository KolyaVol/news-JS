type OptionsType = { [key: string]: string };

type RequstObject = {
    endpoint: string;
    options?: OptionsType | Record<string, never>;
};

type Res = {
    ok: boolean;
    status: number;
    statusText: string;
};

type ResData = {
    status: string;
    sources: [SourceType];
    forEach?: (item: SourceType) => void;
};

type SourceType = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

const defaultCallback = (): void => {
    console.error('No callback for GET response');
};

class DataLoader {
    private baseLink: string;
    readonly options: OptionsType;

    constructor(baseLink: string, options: OptionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options = {} }: RequstObject, callback = defaultCallback) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Res) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res as Response;
    }

    makeUrl(options: OptionsType, endpoint: string): string {
        const urlOptions: OptionsType = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: ResData) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default DataLoader;
export type { SourceType, ResData };
