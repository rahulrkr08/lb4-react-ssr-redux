
const CONTENT_PORTAL_HOST = process.env.CONTENT_PORTAL_HOST || 'http://localhost/bj-content-portal/web';

export interface RouterObject {
    regions: string,
    countries: string,
    media: string
    states: string,
    cities: string,
    pages: string
}

// content_routes is API path of drupal CMS to get the information
const content_routes: RouterObject = {
    "regions": `${CONTENT_PORTAL_HOST}/api/content/{{lang}}/regions`,
    "countries": `${CONTENT_PORTAL_HOST}/api/content/{{lang}}/countries`,
    "states": `${CONTENT_PORTAL_HOST}/api/content/{{lang}}/states`,
    "cities": `${CONTENT_PORTAL_HOST}/api/content/{{lang}}/cities`,
    "pages": `${CONTENT_PORTAL_HOST}/api/content/{{lang}}/pages`,
    "media": `${CONTENT_PORTAL_HOST}/api/media`

};


// tslint:disable-next-line:no-any
let routerKeys: any = Object.keys(content_routes);
export default routerKeys;

/**
 * Making route to fetch information from the drupal CMS
 *
 * @param type type of the item e.g. regions, media etc
 * @param lang Language. Default is 'en'
 * @param uuid Optional. To fetch particular item
 */
// tslint:disable-next-line:no-any
export function getContentRoute(type: any, lang: string = 'en', uuid: string) {

    const key: (keyof RouterObject) = type;
    let content_route: string = content_routes[key] || '';

    if (content_route === '') {
        return '';
    }

    content_route = content_route.replace('{{lang}}', lang);
    return `${content_route}/${uuid}?_format=json`;
}

/**
 * Returns route for fetching information of locales (taxonomy) from the drupal CMS
 * If requesting for locales, then fetch from ENV variable, in drupal one locale only will be there
 *
 * @param {string} id Optional. e.g. Country ID, Locations ID
 *
 * @returns {string} taxonomy locale term url
 */
export function getTaxonomyRoute(id: string = '') {
    return `${CONTENT_PORTAL_HOST}/taxonomy/term/${id}?_format=json`;
}

/**
 * Returns route for fetching information of menus from the drupal CMS
 *
 * @param {string} menu menu name *
 * @returns {string} menu API url
 */
// tslint:disable-next-line:no-any
export function getMenusRoute(menu: any, options: any = { lang: '' }) {
    const lang = options.lang && options.lang !== 'en' ? '/' + options.lang : ''
    return `${CONTENT_PORTAL_HOST}${lang}/entity/menu/${menu}/tree?_format=json`;
}


/**
 * Returns route for fetching information of menus from the drupal CMS
 *
 * @param {string} menu menu name *
 * @returns {string} menu API url
 */
// tslint:disable-next-line:no-any
export function getBlockRoute(menu: any, options: any = { lang: '' }) {
    const lang = options.lang && options.lang !== 'en' ? '/' + options.lang : ''
    return `${CONTENT_PORTAL_HOST}${lang}/block/${menu}?_format=json`;
}

