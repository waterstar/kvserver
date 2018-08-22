import mongoose from 'mongoose';
import _ from 'lodash';
const KV = mongoose.model('KV');

export const list_key_value = (req, res) => {
   console.log('list_key_value', req.params, req.query);
   const key = req.params.key;
   if (!key) return res.status(400).send('/object/key is required');
   KV.aggregate([{ $sort: { timestamp: -1 } }, { $limit : 1 }],(err, kv)=>{
      if (err) res.status(400).send(err);
      var ret = _.map(kv, _.partialRight(_.pick, ['value']));
      res.json(ret[0]);
   });
};

export const add_key_value = (req, res) => {
   console.log('add_key_value', req.body);
   const key = Object.keys(req.body);
   if (key.length < 1) return res.status(400).send('a pair of key value is required');
   if (key.length > 1) return res.status(400).send('only one pair of key value is supported');
   KV.insertMany([{'key':key, 'value':req.body[key]}], (err, kv)=>{
      if (err) return res.status(400).send(err);
      var ret = _.map(kv, _.partialRight(_.pick, ['key', 'value', 'timestamp']));
      res.json(ret[0]);
   });
};