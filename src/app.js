import welcome from './welcome';

welcome('home');

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/users').reply(200, {
  users: [
    { id: 1, name: 'John Smith' }
  ]
});

const template = require('./template.tpl.html');
const output = template({greeting: 'Hello World.'});
console.log(output);

class TBWidget {
  constructor(settings) {
    this.settings = settings;
    this.getData();
  }

  getData() {
    console.log('getData');

    const { type } = this.settings;
    if (type === 'course') {
      // Ajax
      console.log('1');

      axios.get('/users')
        .then((res) => {
          console.log(res);
        });
      debugger;
    } else if (type === 'webinar') {
      // Ajax
      console.log('2');
    }
  }
}

window.TBWidget = TBWidget;
