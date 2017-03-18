import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  // basic info
  name: String,
  recipeType: String,
  efficiency: String,
  batchSize: String,
  // mash & lauter
  mashTunVolume: String,
  mashTunWeight: String,
  mashTunMaterial: String,
  mashTunDeadspace: String,
  mashThickness: String,
  lauterTunDeadspace: String,
  mashTempAdjust: Boolean,
  // boil
  boilTime: String,
  boilOff: String,
  boilTopUp: String,
  // Fermentation
  trubLoss: String,
  fermenterLoss: String,
  fermenterTopUp: String,
  // Advanced
  enableAdvanced: Boolean,
  specificHeat: String,
  boilTemp: String,
  wortShrinkage: String,
  grainVolume: String,
  grainAbsorption: String,

});

export default EquipmentSchema;
