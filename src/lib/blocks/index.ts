const _ = require('lodash')
const map = require('async/map');
const each = require('async/each');

import { getBlockRoute } from "../../config/routes";
import { doContentPortalRequest } from "../request";
import { processContent } from "../content/processor";
import { storeContentToDB } from '../store';
import { saveTaxonomyReferences } from "../taxonomy";
import { findUniqueReferences, formatReferences } from './../content/references';

export async function saveBlockReferences(contents: any, options: any) {

  try {

    // If not saving block no need to execute
    if(!options.save)
      return;

    const uniqueBlockItems = await findUniqueReferences(contents, 'block_content');        
    let processedBlockItems: any = [];
    if(uniqueBlockItems.length > 0) {            
      processedBlockItems = await fetchBlockItem(uniqueBlockItems, options); 

      // Find inner block references from block content
      await saveBlockReferences(processedBlockItems, options);

      // Find taxonomy references from block content
      await saveTaxonomyReferences(processedBlockItems, options);
      
      // Save block content
      await storeContentToDB(processedBlockItems);
    }
  } catch(err) {
    throw new Error(err);
  }
}

/**
 * 
 * @param block_ids Array Array of block ids
 * @param item_name 
 */
async function fetchBlockItem(block_ids: any, options: any) {
  
  // Fetching locale countries
  return new Promise(function(resolve, reject) {

    map(block_ids, async (block: any, callback: any) => {
      const blockRoute = getBlockRoute(block.target_id, options);
      const blockResponse = await doContentPortalRequest(blockRoute, { json: true })
      const result = blockResponse.body;
        
      callback(null, processContent(result, {type: 'block'}));

    }, (err: any, results: any) => {
      
      if(err) {
        reject(err);
      }

      // Setting up type for DB query from loopback
      results.map((result: any) => {
        result.template = `${result.type}`
        result.type = `block_content`
      });

      resolve(results);
    })
  })
}






