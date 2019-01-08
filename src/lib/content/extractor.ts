const _ = require('lodash')
import { pickItems, removeEmptyObjects } from '../util/util';
import { fetchTaxonomyItem } from '../taxonomy';


/**
 * This fucntion extracts the meta informations from the content portal data
 *
 * Meta information contains:
 *
 * - Node ID / Media ID
 * - Language Code
 * - UUID
 * - Created
 * - Last Updated
 * - Status
 *
 * @param data response from content-portal
 * @returns metainfo
 */

export function retriveMeta(data: any, options: any) {

    let node_id_key = ''

    if (options.type === 'media') {
        node_id_key = 'mid';
    } else if (options.type === 'taxonomy') {
        node_id_key = 'tid';
    } else if (options.type === 'block') {
        node_id_key = 'id';
    } else {
        node_id_key = 'nid';
    }

    // Keys Path in API
    const meta_keys = [
        [node_id_key, 0, 'value'],
        ['uuid', 0, 'value'],
        ['langcode', 0, 'value'],
        ['status', 0, 'value'],
        ['type', 0, 'target_id']
    ];

    let meta_data = pickItems(data, meta_keys);
    meta_data.content_id = meta_data[node_id_key];
    delete meta_data[node_id_key];

    return removeEmptyObjects(meta_data)
}

/**
 * This fucntion extracts the custom fields informations from the content portal data
 * Custom fields starts with "fields_"
 * Meta information contains:
 *
 * - Images
 * - Path
 *
 * @param data response from content-portal
 * @returns metainfo
 */

export function retriveCustomFields(field_data: any, options: any) {

    const ret: any = {};

    // Keys Path in API
    // Extracting keys starts with "field_"
    for (let field_key in field_data) {

        // selecting only keys starting with 'field_'
        if (!new RegExp('^field_').test(field_key)) {
            continue;
        }

        const data = field_data[field_key];
        const field_name = field_key.replace('field_', '');

        _.forEach(data, async (d: any) => {

            if (Object.keys(d).length === 1) {
                ret[field_name] = d;
            } else {

                if (typeof ret[field_name] === "undefined")
                    ret[field_name] = []

                ret[field_name].push(d)
            }
        });
    }

    // Retrive path informations
    const path = field_data.path && field_data.path[0];
    if (path && path.alias) {
        ret['path'] = `/${path.langcode.toLowerCase()}${path.alias}`
    }

    return removeEmptyObjects(ret);
}

/**
 * This fucntion extracts the content informations from the content portal data
 *
 * Meta information contains:
 *
 * - Title / Name
 * - Body
 *
 * @param data response from content-portal
 * @returns metainfo
 */

export function retriveContent(data: any, options: any) {

    let title_key = 'title';

    if (options.type === 'media' || options.type === 'taxonomy') {
        title_key = 'name';
    }

    // Keys Path in API
    const meta_keys = [
        [title_key, 0, 'value'],
        ['body', 0, 'processed']
    ];

    return removeEmptyObjects(pickItems(data, meta_keys))
}
