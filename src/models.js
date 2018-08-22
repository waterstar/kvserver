import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const KVSchema = new Schema({
  key: {
    type: String,
    required: 'give a name for the key'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  value: {
    type: String,
    default: null 
  }
});

export default mongoose.model('KV', KVSchema);
//export default KVSchema;