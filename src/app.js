import welcome from './welcome';

welcome('home');

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const template = require('./template.tpl.html');
// const output = template({greeting: 'Hello World.'});
// console.log(output);

import styles from './style.css';

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
        description: 'Course description',
        img: {
          src: 'http://cf2.teachbase.ru/system/products/course_sessions/1067/icons/small/845c6d7a765f5a30882d0bbe6118fac11107de59.jpeg',
          alt: 'Иконка курса'
        },
        button: {
          text: 'Перейти к курсу',
          url: 'http://go.teachbase.ru/stores/conditoria'
        }
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
    const r = Object.assign(data, { styles });
    const output = template(r);
    document.getElementById('tb_widget').className = styles.tb_widget;
    // document.getElementById('tb_link').className = styles.tb_link;
    document.getElementById('tb_widget').innerHTML = output;
  }
}

window.TBWidget = TBWidget;
