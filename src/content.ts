export interface Rating {
    rating: number;
    user_ratings_total: number;
}

window.addEventListener('load', getAndInsertRating, false);

async function getAndInsertRating(): Promise<void> {
    try {
        const restaurant: string = getRestaurant();
        const geohash: string = getGeohash();
        const rating: unknown = await getRating(restaurant, geohash);

        injectRating(rating);
    } catch (error) {
        console.log(error);
    }
}

function injectRating(rating: any): void {
    const span = document.createElement('span');
    span.innerHTML = ` · ${rating.data.rating} (${rating.data.user_ratings_total})`;
    const div = document.querySelector(
        '#__next div div div[class^="MenuHeader-"] div div div div[class^="MenuHeader-"] div:nth-child(3)'
    );

    if (!div) throw new Error('Could not find suitable place to inject div');

    div.appendChild(span);
}

function getRestaurant(): string {
    const restaurantBlockHtml: HTMLElement | null = document.querySelector(
        '#__next div div div[class^="MenuHeader-"] div div div div[class^="MenuHeader-"] h1'
    );

    const restaurantName: string | undefined = restaurantBlockHtml?.innerText;

    if (!restaurantName)
        throw new Error('Unable to retrieve restaurant name using selector');

    return restaurantName;
}

function getQueryParams(url: string): any {
    const paramArr: string[] = url.slice(url.indexOf('?') + 1).split('&');
    const params: any = {};
    paramArr.map((param) => {
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    });
    return params;
}

function getGeohash(): string {
    const pageURL: string = window.location.href;
    const qParams: any = getQueryParams(pageURL);

    const geohash: string = qParams['geohash'];

    if (!geohash) throw new Error('Could not retrieve geohash for user');

    return geohash;
}

async function getRating(restaurant: string, geohash: string) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            {
                restaurant: restaurant,
                geohash: geohash
            },
            (response) => {
                if (response.success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }
        );
    });
}
