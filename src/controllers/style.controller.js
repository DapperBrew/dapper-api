import Style from '../models/style.model';

/**
 * Get Style list.
 * @returns {Style[]}
 */

const list = (req, res) => {
  Style.find((err, styles) => {
    if (err) {
      return res.send(err);
    }
    return res.json(styles);
  });
};

export default { list };
