import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const template = require('./templates/widget.tpl.html');
const templateLandscape = require('./templates/widget-landscape.tpl.html');

import './global.css';
import styles from './styles/widget.css';
import stylesLandscape from './styles/widget-landscape.css';

class TBWidget {
  constructor(settings) {
    this.settings = settings;
    this.mockApiResponses();
    this.getData();
  }

  mockApiResponses() {
    const mock = new MockAdapter(axios);
    const { accountId, resourceId } = this.settings;

    mock.onGet(`/accounts/${accountId}/courses/${resourceId}`).reply(200, {
      course: {
        id: resourceId,
        type: 'course',
        title: 'Course title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad, at beatae blanditiis, consequatur dicta error esse et hic impedit laboriosam laudantium maiores perspiciatis qui repellat rerum saepe sunt ullam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus!',
        img: {
          src: 'http://cf2.teachbase.ru/system/products/course_sessions/1067/icons/small/845c6d7a765f5a30882d0bbe6118fac11107de59.jpeg',
        },
        button: {
          url: 'http://go.teachbase.ru/stores/conditoria'
        }
      }
    });

    mock.onGet(`/accounts/${accountId}/meeting/${resourceId}`).reply(200, {
      meeting: {
        id: resourceId,
        type: 'meeting',
        title: 'Meeting title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad, at beatae blanditiis, consequatur dicta error esse et hic impedit laboriosam laudantium maiores perspiciatis qui repellat rerum saepe sunt ullam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur dicta enim eos quibusdam quod reiciendis ullam. Corporis doloribus fugiat non provident voluptatum. Debitis dolorum labore laboriosam nostrum possimus!',
        host: 'Meeting host',
        img: {
          src: 'http://cf2.teachbase.ru/system/products/course_sessions/1067/icons/small/845c6d7a765f5a30882d0bbe6118fac11107de59.jpeg',
        },
        button: {
          url: 'http://go.teachbase.ru/stores/conditoria'
        }
      }
    });
  }

  getData() {
    const {
      type,
      accountId,
      resourceId
    } = this.settings;

    if (type === 'course') {
      axios.get(`/accounts/${accountId}/courses/${resourceId}`)
        .then((res) => {
          this.render(res.data.course);
        })
    } else if (type === 'meeting') {
      axios.get(`/accounts/${accountId}/meeting/${resourceId}`)
        .then((res) => {
          this.render(res.data.meeting)
        })
    }
  }

  render(data) {
    const { orientation } = this.settings;

    const output = orientation === 'landscape'
      ? templateLandscape(Object.assign(data, { styles: stylesLandscape }))
      : template(Object.assign(data, { styles }));

    document.getElementById('tb_widget').innerHTML = output;
  }
}

window.TBWidget = TBWidget;
