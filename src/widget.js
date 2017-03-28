import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import './global.css';

class TBWidget {
  constructor(settings) {
    this.settings = settings;
    this.mockApiResponses();
    this.getData();
  }

  mockApiResponses() {
    const mock = new MockAdapter(axios);
    const { accountId, resourceId } = this.settings;

    mock.onGet(`/accounts/${accountId}/course_sessions/${resourceId}`).reply(200, {
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
      axios.get(`/accounts/${accountId}/course_sessions/${resourceId}`)
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

    let template;
    let styles;

    if (orientation === 'landscape') {
      template = require('./templates/widget-landscape.tpl.html');
      styles = require('./styles/widget-landscape.css');
    } else {
      template = require('./templates/widget.tpl.html');
      styles = require('./styles/widget.css');
    }

    document.getElementById('tb_widget').innerHTML = template(Object.assign(data, { styles }));
  }
}

window.TBWidget = TBWidget;
