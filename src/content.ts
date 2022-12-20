window.addEventListener('load', getAndInsertRating, false);

// Define the getAndInsertRatings function
async function getAndInsertRating(): Promise<void> {
    console.log('-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n');

    try {
        const restaurant: string = getRestaurant();
        const geohash: string = getGeohash();
        const rating: Rating = await getRating(restaurant);
    } catch (error) {
        console.log(error);
    }

    console.log('-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n');
}

function getRestaurant(): string {
    const restaurantBlockHtml: HTMLElement | null = document.querySelector(
        '#__next div div div[class^="MenuHeader-"] div div div div[class^="MenuHeader-"] h1'
    );

    const restaurantName: string | undefined = restaurantBlockHtml?.innerText;

    console.log('------------------------------');
    console.log(restaurantName);
    console.log('------------------------------');

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

interface Rating {
    score: number;
    numReviewers: number;
}

async function getRating(restaurant: string): Promise<Rating> {
    chrome.runtime.sendMessage(
        {
            type: 'ACTIVITY_HISTORY_READY'
        },
        function (response) {
            console.log('>>>>Response: ', JSON.stringify(response));
        }
    );

    const rating: Rating = {
        score: 0,
        numReviewers: 0
    };

    return rating;
}
