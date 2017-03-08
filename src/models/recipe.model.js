/* eslint-disable func-names */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  style: String,
  efficiency: String,
  batchVolume: String,
  postBoilVolume: String,
  boilTime: String,
  recipeType: String,
  fermentables: [
    {
      _id: false,
      name: String,
      key: String,
      weight: String,
      unit: String,
      srm: String,
      fermentableType: String,
      inMash: Boolean,
      afterBoil: Boolean,
      potential: String,
    },
  ],
  hops: [
    {
      name: String,
      key: String,
      weight: String,
      time: String,
      stage: String,
      hopType: String,
      alpha: String,
    },
  ],
  yeasts: [
    {
      _id: false,
      name: String,
      supplier: String,
      supplierId: String,
      key: String,
      averageAttenuation: String,
      minTemp: String,
      maxTemp: String,
    },
  ],
  miscs: [
    {
      _id: false,
      name: String,
      key: String,
      amount: String,
      amountUnit: String,
      time: String,
      timeUnit: String,
      stage: String,
    },
  ],
  efficiencyType: String,
  equipmentProfile: String,
  boilVolume: String,
  trubChillerLoss: String,
  mashTemp: String,
}, {
  timestamps: true,
});

export default mongoose.model('Recipes', RecipeSchema);
