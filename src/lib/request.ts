import * as got from 'got';
import * as _ from 'lodash';

const CONTENT_PORTAL_USERNAME = process.env.CONTENT_PORTAL_USERNAME || 'admin';
const CONTENT_PORTAL_PASSWORD = process.env.CONTENT_PORTAL_PASSWORD || 'admin@123';


export async function doContentPortalRequest(url: string, options: any) {
    try {
        let headers = {
            'accept': 'application/json',
            'content-type': 'application/json',
            "authorization": `Basic ${Buffer.from(`${CONTENT_PORTAL_USERNAME}:${CONTENT_PORTAL_PASSWORD}`).toString('base64')}`
        };

        if (options.headers) {
            headers = _.defaults({}, headers, options.headers)
        }

        let opt = _.defaults({}, { headers }, options)

        return await got(url, opt);

    } catch (error) {
        console.log("Error: doContentPortalRequest");
        throw new Error(error);
    }
};

export async function putRequest(url: string, options: object) {
    try {
        return await got.put(url, options);

    } catch (error) {
        console.log(error);
    }
};
