import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Request } from 'express';
//@ts-ignore
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

import { StatusError } from '../../utils';
import { Imgur } from '../../services';

export const query = {
  googleKey: {
    type: GraphQLString,
    description: 'Key for the Google Places autocomplete',
    resolve: (_root: any, _args: {}, _req: Request) => {
      if (!process.env.MAPS_API_KEY) throw new StatusError(500, 'No maps key');
      return process.env.MAPS_API_KEY;
    },
  },
};

export const mutation = {
  uploadImage: {
    type: new GraphQLObjectType({
      name: 'UploadImageType',
      fields: () => ({
        url: { type: GraphQLString },
      }),
    }),
    description: 'Image uploaded from the registration form',
    args: {
      file: { type: GraphQLUpload },
    },
    resolve: async (_root: any, args: { file: any }, req: Request) => {
      try {
        const file = await args.file;
        const uploadedImage = await Imgur.createImage(file);
        console.log(uploadedImage);
        return { url: uploadedImage.data.link };
      } catch (err) {
        console.log(err);
        if (err instanceof Error)
          throw new StatusError(500, 'Problem uploading file', err);
        throw err;
      }
    },
  },
};
