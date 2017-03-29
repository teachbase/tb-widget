import axios from 'axios';

import './global.css';

class TBWidget {
  constructor(settings) {
    this.settings = settings;
    this.getData();
  }

  getData() {
    const {
      type,
      accountId,
      resourceId
    } = this.settings;

    if (type === 'course') {
      axios.get(`/api/widgets/accounts/${accountId}/course_sessions/${resourceId}`)
        .then((res) => {
          this.render(res.data.course);
        })
    } else if (type === 'meeting') {
      axios.get(`/api/widgets/accounts/${accountId}/meeting/${resourceId}`)
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
