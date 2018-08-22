import { list_key_value, add_key_value } from './controllers';

const routes = (app) => {

   app.route('/object')
     .get(list_key_value)
     .post(add_key_value);
   
   app.route('/object/:key')
     .get(list_key_value);
};

export default routes;
