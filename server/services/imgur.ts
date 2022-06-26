import fetch from 'node-fetch';
const { IMGUR_CLIENT_ID, IMGUR_CLIENT_SECRET } = process.env;

if (!IMGUR_CLIENT_ID && IMGUR_CLIENT_SECRET) throw new Error('Missing Imgur keys');

const Imgur = {
  createImage: (image: any) => {

  }
}


