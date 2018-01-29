// import autoIncrement  from 'mongoose-auto-increment';
import mongoose from 'mongoose';

import Dealers from './dealers';

const Schema = mongoose.Schema;
// autoIncrement.initialize(mongoose.connection);
//= ===============================
// Pumps Schema
//= ===============================
const PumpsSchema = new Schema({
    DealerID: {
        type: Schema.Types.ObjectId,
        ref: 'Dealers'
    },
});

module.exports = mongoose.model('Pumps', PumpsSchema);

