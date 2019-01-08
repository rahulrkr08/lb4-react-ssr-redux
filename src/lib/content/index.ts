import { getContentRoute } from '../../config/routes';
import { doContentPortalRequest } from '../request';

/**
 * This fuction retrives the informaton from content source API which is defined on config/routes.ts
 *
 * @function getContent
 * @param type type of the item
 * @param uuid unique identifier of the item
 */

export async function getContent(type: any, lang: string, uuid: string = "") {

    try {
        const content_url: string = getContentRoute(type, lang, uuid)
        const response = await doContentPortalRequest(content_url, {
            json: true
        })

        return response.body
    } catch (err) {
        throw new Error(err);
    }

}


export * from './processor'
