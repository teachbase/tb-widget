import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const template = require('./template.tpl.html');
const templateLandscape = require('./template-landscape.tpl.html');

import './global.css';
import styles from './style.css';
import stylesLandscape from './style-landscape.css';

class TBWidget {
  constructor(settings) {
    this.settings = settings;
    this.mockApiResponses();
    this.getData();
  }

  mockApiResponses() {
    const mock = new MockAdapter(axios);

    mock.onGet(`/courses/${this.settings.id}`).reply(200, {
      course: {
        id: this.settings.id,
        title: 'Course title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad, at beatae blanditiis, consequatur dicta error esse et hic impedit laboriosam laudantium maiores perspiciatis qui repellat rerum saepe sunt ullam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus!',
        img: {
          src: 'http://cf2.teachbase.ru/system/products/course_sessions/1067/icons/small/845c6d7a765f5a30882d0bbe6118fac11107de59.jpeg',
          alt: 'Иконка курса'
        },
        button: {
          text: 'Перейти к курсу', // TODO: Вынести в шаблон с условием
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

    console.log('222');
    const { orientation } = this.settings;

    let r = Object.assign(data, { styles });
    let output = template(r);

    if (orientation === 'landscape') {
      console.log('landscape');

      r = Object.assign(data, { styles: stylesLandscape });
      console.log(r);
      output = templateLandscape(r);
    }

    document.getElementById('tb_widget').innerHTML = output;
  }
}

window.TBWidget = TBWidget;
