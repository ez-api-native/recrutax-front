import RNFetchBlob from 'rn-fetch-blob';
import {ENTRYPOINT} from '~/config/entrypoint';
import {token} from '~/lib/asyncStorage';

const upload = async file => {
  return RNFetchBlob.fetch(
    'POST',
    `${ENTRYPOINT}/media_objects`,
    {
      Authorization: `Bearer ${await token()}`,
      'Content-Type': 'multipart/form-data',
    },
    [
      {
        name: 'file',
        filename: file.name,
        type: file.type,
        data: RNFetchBlob.wrap('file://' + file.uri),
      },
    ],
  ).then(res => res.json());
};

export default upload;
