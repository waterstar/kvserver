import mongoose from 'mongoose';
const KV = mongoose.model('KV');

export const list_all_keyvalue = (req, res) => {
   KV.find({}, (err, kv)=>{
      if (err) res.send(err);
      res.json(kv);
   });
};
