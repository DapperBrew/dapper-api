import Yeast from '../models/yeast.model';

/**
 * Get Style list.
 * @returns {Style[]}
 */

const list = (req, res) => {
  Yeast.find((err, styles) => {
    if (err) {
      return res.send(err);
    }
    return res.json(styles);
  });
};

export default { list };
