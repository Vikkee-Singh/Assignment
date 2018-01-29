import mongoose from 'mongoose';
import Pumps from './pumps';

const Schema = mongoose.Schema;

//= ===============================
// Purchases Schema
//= ===============================
const PurchasesSchema = new Schema({
    PumpID: {
        type: Schema.Types.ObjectId,
        ref: 'Pumps'
    },
    VolumePurchased : {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Purchases', PurchasesSchema);

