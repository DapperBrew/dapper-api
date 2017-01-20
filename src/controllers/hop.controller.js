import Hop from '../models/hop.model';

/**
 * Get Style list.
 * @returns {Style[]}
 */

const list = (req, res) => {
  Hop.find((err, styles) => {
    if (err) {
      return res.send(err);
    }
    return res.json(styles);
  });
};

export default { list };
