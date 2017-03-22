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

    mock.onGet(`/courses/${this.settings.resourceId}`).reply(200, {
      course: {
        id: this.settings.resourceId,
        title: 'Course title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad, at beatae blanditiis, consequatur dicta error esse et hic impedit laboriosam laudantium maiores perspiciatis qui repellat rerum saepe sunt ullam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus!',
        img: {
          src: 'http://cf2.teachbase.ru/system/products/course_sessions/1067/icons/small/845c6d7a765f5a30882d0bbe6118fac11107de59.jpeg',
          alt: 'Иконка курса' // TODO: Вынести в шаблон с условием
        },
        button: {
          text: 'Перейти к курсу', // TODO: Вынести в шаблон с условием
          url: 'http://go.teachbase.ru/stores/conditoria'
        }
      }
    });

    mock.onGet(`/meeting/${this.settings.resourceId}`).reply(200, {
      meeting: {
        id: this.settings.resourceId,
        title: 'Meeting title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad, at beatae blanditiis, consequatur dicta error esse et hic impedit laboriosam laudantium maiores perspiciatis qui repellat rerum saepe sunt ullam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus!',
        host: 'Meeting host',
        img: {
          src: 'http://cf2.teachbase.ru/system/products/course_sessions/1067/icons/small/845c6d7a765f5a30882d0bbe6118fac11107de59.jpeg',
          alt: 'Иконка курса' // TODO: Вынести в шаблон с условием
        },
        button: {
          text: 'Перейти к курсу', // TODO: Вынести в шаблон с условием
          url: 'http://go.teachbase.ru/stores/conditoria'
        }
      }
    });
  }

  getData() {
    const { type } = this.settings;

    if (type === 'course') {
      axios.get(`/courses/${this.settings.resourceId}`)
        .then((res) => {
          this.render(res.data.course);
        })
    } else if (type === 'meeting') {
      axios.get(`/meeting/${this.settings.resourceId}`)
        .then((res) => {
          this.render(res.data.meeting)
        })
    }
  }

  render(data) {
    const { orientation } = this.settings;

    let r = Object.assign(data, { styles });
    let output = template(r);

    if (orientation === 'landscape') {
      r = Object.assign(data, { styles: stylesLandscape });
      console.log(r);
      output = templateLandscape(r);
    }

    document.getElementById('tb_widget').innerHTML = output;
  }
}

window.TBWidget = TBWidget;
