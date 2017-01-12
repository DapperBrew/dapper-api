import Fermentable from '../models/fermentable.model';

/**
 * Get Fermentable list.
 * @returns {Fermentable[]}
 */

const list = (req, res) => {
  Fermentable.find((err, fermentables) => {
    if (err) {
      return res.send(err);
    }
    return res.json(fermentables);
  });
};

export default { list };
