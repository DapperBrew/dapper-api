import Misc from '../models/misc.model';

/**
 * Get Style list.
 * @returns {Style[]}
 */

const list = (req, res) => {
  Misc.find((err, miscs) => {
    if (err) {
      return res.send(err);
    }
    return res.json(miscs);
  });
};

export default { list };
