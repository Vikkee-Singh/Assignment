// import autoIncrement  from 'mongoose-auto-increment';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// autoIncrement.initialize(mongoose.connection);
//= ===============================
// Dealers Schema
//= ===============================
const DealersSchema = new Schema({
    DealerName: {
        type: String
    },
    TotalPurchasedVolume: {
        type: Number,
        Default: 0
    }
});

module.exports = mongoose.model('Dealers', DealersSchema);

