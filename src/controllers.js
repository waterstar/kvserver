import mongoose from 'mongoose';
import _ from 'lodash';
const KV = mongoose.model('KV');

export const list_key_value = (req, res) => {
   console.log('list_key_value', req.params, req.query);
   const key = req.params.key;
   const query = [];

   // missing key
   if (!key) return res.status(400).send('/object/key is required');

   // handle timestamp if available
   if (req.query.timestamp) {
      const time_ms = parseInt(req.query.timestamp);
      const timestamp = new Date(time_ms);
      query.push({$match:{'timestamp':{$lte:timestamp}}});
   }
   // handle query without timestamp
   query.push({$match:{'key':{$eq:key}}}, { $sort: { timestamp: -1 } }, { $limit : 1 });

   KV.aggregate(query,(err, kv)=>{
      if (err) res.status(400).send(err);
      var ret = _.map(kv, _.partialRight(_.pick, ['value']));
      res.json(ret[0]);
   });
};

export const add_key_value = (req, res) => {
   console.log('add_key_value', req.body);
   const key = Object.keys(req.body);

   // check data format
   if (key.length < 1) return res.status(400).send('a pair of key value is required');
   if (key.length > 1) return res.status(400).send('only one pair of key value is supported');

   KV.insertMany([{'key':key, 'value':req.body[key]}], (err, kv)=>{
      if (err) return res.status(400).send(err);
      var ret = _.map(kv, _.partialRight(_.pick, ['key', 'value', 'timestamp']));
      res.status(201).json(ret[0]);
   });
};
