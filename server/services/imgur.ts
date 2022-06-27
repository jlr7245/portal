import fetch, { Blob } from 'node-fetch';
import FormData, { Stream } from 'form-data';

const { IMGUR_CLIENT_ID, IMGUR_CLIENT_SECRET } = process.env;

if (!(IMGUR_CLIENT_ID && IMGUR_CLIENT_SECRET)) throw new Error('Missing Imgur keys');

interface File extends Blob {
  name: string;
  lastModified: number;
  createReadStream: () => Stream;
}

const Imgur = {
  createImage: async (image: File) => {
    const fileData = new FormData();
    fileData.append("image", image.createReadStream());
    const imgurResponse = await fetch('https://api.imgur.com/3/image/', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
      },
      body: fileData,
    });
    return await imgurResponse.json();
  },
};

export default Imgur;
