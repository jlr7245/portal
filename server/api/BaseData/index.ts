import { GraphQLString } from "graphql";
import { Request } from 'express';
import { StatusError } from "../../utils";

export const query = {
  googleKey: {
    type: GraphQLString,
    description: 'Key for the Google Places autocomplete',
    resolve: (_root: any, _args: {}, _req: Request) => {
      if (!process.env.MAPS_API_KEY) throw new StatusError(500, 'No maps key');
      return process.env.MAPS_API_KEY;
    }
  }
}
