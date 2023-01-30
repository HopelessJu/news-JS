export interface IOption {
    [key: string]: string;
}

export interface IDataSourceItem {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface IArticleSource {
    id: string;
    name: string;
}

export interface IDataArticlesItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: IArticleSource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface IDataSources {
    status: string;
    sources?: IDataSourceItem[];
    articles?: IDataArticlesItem[];
    totalResults?: number;
}

class Loader {
    baseLink: string;
    options: IOption;

    constructor(baseLink: string, options: IOption) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: IOption },
        callback = (data?: IDataSources) => {
            console.info(data);
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: IOption, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: IDataSources) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
