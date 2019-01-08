const _ = require('lodash')
const map = require('async/map');
const each = require('async/each');

import { getTaxonomyRoute } from "../../config/routes";
import { doContentPortalRequest } from "../request";
import { processContent } from "../content/processor";
import { pickItems } from './../util/util';

import { storeContentToDB } from '../store';
import { findUniqueReferences } from "../content/references";


export function formatLocales(locales: any) {

  const {countries, languages} = locales

  return countries.map((country: any) => {

    let languageIds = country.country_languages.map((countryLangs: any) => countryLangs.target_id)
    let country_languages = languages.filter((lang: any) => languageIds.indexOf(lang.tid) > -1)
    const language_keys = [
      ["name"], 
      ["country_code", "value"], 
      ["country_language_code", "value"],
      ["country_title", "value"],
      ["language_alternate_names", "value"],
      ["language_code", "value"],
      ["root_path", "value"]
    ];

    return {
      "name": country.name,
      "iso2": country.country_code_iso2[0],
      "iso3": country.country_code_iso3[0],
      "country_languages": country_languages.map((countryLang: any) => pickItems(countryLang, language_keys)) 
    }
  })
}

export function findCountryLangIDs(countries: any) {
  const languages = countries.map((country: any ) => country.country_languages )
  return _.uniq(_.flatten(languages))
}


export async function saveTaxonomyReferences(contents: any, options: any) {

  // If not saving taxonomy no need to execute
  if(!options.save)
    return;

  const uniqueTaxoItems = await findUniqueReferences(contents, 'taxonomy_term');
  let processedTaxoItems: any = [];

  if(uniqueTaxoItems.length > 0) {            
    processedTaxoItems = await fetchTaxonomyItem(uniqueTaxoItems);
    storeContentToDB(processedTaxoItems);
  }
}

/**
 * 
 * @param taxonomy_ids Array Array of taxonomy ids
 * @param item_name 
 */
export async function fetchTaxonomyItem(taxonomy_ids: any) {
 
  // Fetching locale countries
  return new Promise(function(resolve, reject) {

    map(taxonomy_ids, async (taxo: any, callback: any) => {
      const taxonomyRoute = getTaxonomyRoute(taxo.target_id);
      const taxonomyResponse = await doContentPortalRequest(taxonomyRoute, { json: true })

      const result = taxonomyResponse.body;
        
      callback(null, processContent(result, {type: 'taxonomy'}));

    }, (err: any, results: any) => {
      
      if(err) {
        reject(err);
      }

      // Setting up type for DB query from loopback
      results.map((result: any) => result.type = 'taxonomy');

      resolve(results);
    })
  })
}
