import { list_all_keyvalue } from './controllers';

const routes = (app) => {

   // todoList Routes
   app.route('/kv')
     .get(list_all_keyvalue);
     //.get(()=>{ console.log('get key value'); });
     //.post(todoList.create_a_task);


//   app.route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};

export default routes;
