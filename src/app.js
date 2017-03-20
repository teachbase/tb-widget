import welcome from './welcome';

welcome('home');

import axios from 'axios';

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

      axios.get('https://api.github.com/users/enrikoLabriko')
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
