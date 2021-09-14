import axios from 'axios';
import probe from 'probe-image-size';

const getImages = async () => {
  const endpoint = process.env.ENDPOINT;
  const { data: { entries = [] } } = await axios.get(endpoint);
  return await Promise.all(
    entries.map(async ({ picture, id }) => {
      const { width, height } = await probe(picture);
      return {
        id,
        src: picture,
        width,
        height,
        isSelected: false,
      };
    }),
  );
};

export default getImages;
