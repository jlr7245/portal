import { gql, useMutation } from '@apollo/client';
import React, { ChangeEvent } from 'react';

const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`;

const UploadFileController = () => {
  const [uploadImage] = useMutation(UPLOAD_IMAGE_MUTATION);

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target, event.target.files);
    if (event.target.validity.valid) {
      console.log(event.target.files?.[0])
      const imageResult = await uploadImage({
        variables: { file: event.target.files?.[0] },
      });
      console.log(imageResult);
    }
  };

  return <input type="file" required onChange={onChange} />;
};

export default UploadFileController;
