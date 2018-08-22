import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const KVSchema = new Schema({
  kvname: {
    type: String,
    required: 'give a name for the key'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  kvvalue: {
    type: String,
    default: null 
  }
});

export default mongoose.model('KV', KVSchema);
//export default KVSchema;