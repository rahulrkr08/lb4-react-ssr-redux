const _ = require('lodash')
import { retriveCustomFields, retriveMeta, retriveContent } from './extractor';
import { extractMedia, uploadMedia } from '../media-process';
import { saveTaxonomyReferences } from '../taxonomy';
import { saveBlockReferences } from '../blocks';
import { formatReferences } from './references';
const each = require('async/each');


export async function processContents(contents: any, options: any) {

	return new Promise((resolve, reject) => {


		let processedContent: any = [];

		each(contents, async (content: any, callback: any) => {

			let cont: any = processContent(content, options);
			cont.type = options.type // Setting up type for DB query from loopback

			// Parsing content
			processedContent.push(cont);
			callback();

		}, async () => {

			// resolve(processedContent)

			// Find and save block references if any
			await saveBlockReferences(processedContent, options);

			// Find and save taxonomy references if any
			await saveTaxonomyReferences(processedContent, options);

			resolve(processedContent);
		})

	}).catch((err: any) => {
		throw new Error(err);
	})
}


export function processContent(data: any, options: any) {

	let mediainfo: any = {};

	// Common informations from all types of content
	const metainfo = retriveMeta(data, options);
	const content = retriveContent(data, options);
	const custom_fields = retriveCustomFields(data, options);

	if (options.type === 'media') {
		mediainfo = extractMedia(data);
		uploadMedia({
			mediainfo,
			metainfo
		});
	}

	const processedContent = _.merge(content, metainfo, custom_fields, mediainfo);
	formatContent(processedContent, options);

	return processedContent;
}


export function formatContent(content: any, options: any) {

	if (!content.content_id && !content.id) throw new Error("storeToDB: No ID's found on the document")

	if (content.content_id) {
		content._id = `${content.type}:/${options.lang.toLowerCase()}/${content.content_id}`;
		delete content.content_id;
	} else {
		content._id = content.id
	}

	// Formatting any block/taxonomy references
	formatReferences(content, options);
}
