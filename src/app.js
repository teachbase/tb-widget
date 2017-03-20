import welcome from './welcome';

welcome('home');

const template = require('./template.tpl.html');
const output = template({greeting: 'Hello World.'});
console.log(output);

class TBWidget {
  constructor(settings) {
    this.settings = settings;
  }
}

window.TBWidget = TBWidget;
