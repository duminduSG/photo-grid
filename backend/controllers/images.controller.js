import axios from 'axios';
import probe from 'probe-image-size';
import config from '../config/index';

const getImages = async (req, res) => {
  const endpoint = config.ENDPOINT;
  try {
      const { data: { entries = [] } } = await axios.get(endpoint);
      const images = await Promise.all(
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
      return res.json(images);
  } catch (e) {
      return res.status(500).end();
  }

};

export default getImages;
