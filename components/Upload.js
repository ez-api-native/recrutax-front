import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {PermissionsAndroid, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import upload from '~/lib/blob';

const Upload = ({onChange, type, children}) => {
  const [imagePath, setImagePath] = useState(null);
  const handleChooseFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types[type]],
        });
        if (type === 'images') {
          setImagePath(res.uri);
        }
        const result = await upload(res);
        onChange(result['@id']);
      } else {
        console.log('Read permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <Button onPress={handleChooseFile}>{children}</Button>
      {type === 'images' && imagePath && (
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'stretch',
          }}
          source={{
            uri: imagePath,
          }}
        />
      )}
    </>
  );
};

export default Upload;
