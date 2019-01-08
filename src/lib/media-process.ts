const _ = require('lodash')
const path = require('path')
const request = require('request')

import { pickItems } from './util/util'
import { S3 } from '../config/aws'

const bucket_name = process.env.AWS_BUCKET_NAME || 'banjara-tours'

/**
 * Returns the media object after updating the path's for s3 bucket
 *
 * @param media media object
 * @param uuid unique identifier
 */
const updateMediaInfo = (media: any, uuid: string) => {

  // const now = Date.now();
  const filename = path.basename(media.url)

  const location_path = media.location_path !== "" ? "/" + media.location_path.replace(/^\/|\/$/g, '') : ""; // remove first and last slashes
  const media_path = `/media${location_path}`

  return _.assignIn(media, {
    original_image_path: media.url,
    url: `${media_path}/${filename}`
  })
}


export const uploadMedia = (params: any) => {

  try {
    const { mediainfo, metainfo } = params

    const options: any = {
      uri: mediainfo.originalImagePath,
      encoding: null
    };


    request(options, (error: any, response: any, body: any) => {
      if (error || response.statusCode !== 200) {
        throw new Error("error downloading image:" + mediainfo.originalImagePath);
      } else {
        S3.putObject({
          Body: body,
          Key: mediainfo.url.replace(/^\/|\/$/g, ''),
          Bucket: bucket_name,
          ACL: 'public-read'

        }, (s3Error: any, data: any) => {
          if (s3Error) {
            throw new Error("error uploading image to s3" + metainfo.uuid);
          } else {
            console.log("success uploading to s3", mediainfo.url, metainfo.uuid);
          }
        });
      }
    });
  } catch (err) {
    console.log(err)
  }
}

/**
 *
 */

export function extractMedia(data: any) {

  // TODO: Create object interface for media

  let response: any = {};

  const bundle = pickItems(data, [['bundle', 0]]);
  const uuid = pickItems(data, [['uuid', 0, 'value']]);
  const target_info = _.pick(bundle.bundle, ['target_id', 'target_type'])

  const field_image_key = `field_media_image`;

  const field_media = pickItems(data, [
    [field_image_key, 0],
    [`field_location_path`, 0, 'value']
  ]);

  response = _.pick(
    field_media[field_image_key],
    ['alt', 'title', 'url']
  );

  response.type = target_info.target_id;
  response.location_path = field_media.field_location_path;

  return updateMediaInfo(response, uuid.uuid);
}
