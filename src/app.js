import welcome from './welcome';

welcome('home');

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const template = require('./template.tpl.html');
// const output = template({greeting: 'Hello World.'});
// console.log(output);

import './style.css';

class TBWidget {
  constructor(settings) {
    this.settings = settings;
    this.mockApiResponses();
    this.getData();
  }

  mockApiResponses() {
    const mock = new MockAdapter(axios);

    // Test
    mock.onGet('/users').reply(200, {
      users: [
        { id: 1, name: 'John Smith' }
      ]
    });

    mock.onGet(`/courses/${this.settings.id}`).reply(200, {
      course: {
        id: this.settings.id,
        title: 'Course title',
        description: 'Course description'
      }
    });

    mock.onGet(`/webinars/${this.settings.id}`).reply(200, {
      course: {
        id: this.settings.id,
        title: 'Webinar title',
        description: 'Webinar description'
      }
    });
  }

  getData() {
    console.log('getData');

    // Test
    axios.get('/users')
      .then((res) => {
        console.log(res);
      });

    const { type } = this.settings;
    if (type === 'course') {
      // Ajax
      console.log('1');

      axios.get(`/courses/${this.settings.id}`)
        .then((res) => {
          console.log(res);
          this.render(res.data.course);
        })
    } else if (type === 'webinar') {
      // Ajax
      console.log('2');
    }
  }

  render(data) {
    const output = template(data);
    console.log(output);
    document.getElementById('tb_widget').innerHTML = output;
  }
}

window.TBWidget = TBWidget;
