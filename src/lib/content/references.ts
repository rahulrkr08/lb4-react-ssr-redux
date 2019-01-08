const _ = require('lodash')
const each = require('async/each');

const REFERENCE_TYPES = ['block_content', 'taxonomy_term', 'menu_link_content']


export function findUniqueReferences(contents: any, type: any) {

  let contentItemReferences: any = [];
  // Find references of block items from each content

  each(contents, (content: any, callback: any) => {
    contentItemReferences = contentItemReferences.concat(findAllReferences(content, type));
    callback();
  });


  let referenceItems: any = [];

  contentItemReferences.map((references: any) => referenceItems = referenceItems.concat(references.itemIds));


  return referenceItems.filter((obj: any, pos: any, arr: any) => arr.map((mapObj: any) => mapObj['target_id']).indexOf(obj['target_id']) === pos);
}

/**
 * From contents removing all target reference keys and combining it single 'reference' single key
 *
 * @param contents
 * @param options
 */

export function formatReferences(contents: any, options: any = {}) {


  _.map(contents, (content: any) => {

    //References always will be array
    if (!Array.isArray(content))
      return false;


    content.map((cont: any) => {
      if (cont.target_type !== "undefined" && REFERENCE_TYPES.indexOf(cont.target_type) > -1) {

        // Set langugae to the reference
        cont['reference'] = `${cont.target_type}:/${options.lang.toLowerCase()}/${cont.target_id}`

        // Delete the unnecessary keys from taxonomy object
        delete cont["url"];
        delete cont["target_id"];
        delete cont["target_type"];
        delete cont["target_uuid"];
      }
    });
  });
}



function findAllReferences(contents: any, type: any) {

  return _.map(contents, (content: any, contentKey: any) => {
    if (!Array.isArray(content)) return false;

    let itemIds = content.map((cont: any) => {
      if (cont.target_type !== "undefined" && cont.target_type === type) {
        return cont;
      }
      return false;
    })

    // Remove all false value
    itemIds = itemIds.filter(Boolean);

    if (itemIds.length > 0) {
      return { contentKey, itemIds }
    } else {
      return false;
    }
  }).filter(Boolean);
}
