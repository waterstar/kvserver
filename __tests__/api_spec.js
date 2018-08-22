import frisby from 'frisby';

const host = 'localhost:3000';
let timestamp = '0';

it ('POST 1 key with 2 different values in sequence, expect 201 Created', function () {
   return frisby
      .post(`http://${host}/object`, {
         'hello': 'konichiwa',
      })
      .expect('status', 201)
      .then(()=>{
         timestamp = Date.now();
         return frisby
            .post(`http://${host}/object`, {
               'hello': 'konichiwa2',
            })
            .expect('status', 201);

      });
});

it('Get back the key-value added', function () {
  return frisby.get(`http://${host}/object/hello`)
      .expect('status', 200)
      .expect('json', 'value', 'konichiwa2');
});

it('Get back the key-value added', function () {
  return frisby.get(`http://${host}/object/hello?timestamp=${timestamp}`)
      .expect('status', 200)
      .expect('json', 'value', 'konichiwa');
});