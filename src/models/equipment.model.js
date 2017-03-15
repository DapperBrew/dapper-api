import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  // basic info
  name: String,
  recipeType: String,
  efficiency: String,
  batchSize: String,
  topOffWater: String,
  // mash
  mashTunVolume: String,
  mashTunWeight: String,
  mashTunMaterial: String,
  mashTunDeadspace: String,
  mashThickness: String,
  // lauter
  lauterTunDeadspace: String,
  // boil
  boilTime: String,
  boilLossPerHour: String,
  boilTopUp: String,
  // Fermentation
  trubChillerLoss: String,
  fermenterLoss: String,
  fermenterTopUp: String,
  // Advanced
  mashTunSpecificHeat: String,
  grainVolume: String,
  boilTemperature: String,
  wortShrinkage: String,
  grainAbsorption: String,

});

export default mongoose.model('Equipments', EquipmentSchema);


// mash tun addition
