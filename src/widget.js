import axios from 'axios';
import sanitizeHtml from 'sanitize-html';

import './global.css';

class TBWidget {
  constructor(settings) {
    this.settings = settings;
    this.widgetNode = document.currentScript.parentNode;
    this.getData();
  }

  getData() {
    const {
      host,
      type,
      accountId,
      resourceId
    } = this.settings;

    if (type === 'course') {
      axios.get(`${host}/api/widgets/accounts/${accountId}/course_sessions/${resourceId}`)
        .then((res) => {
          this.render(res.data['course_session']);
        })
    } else if (type === 'meeting') {
      axios.get(`${host}/api/widgets/accounts/${accountId}/meetings/${resourceId}`)
        .then((res) => {
          this.render(res.data.meeting)
        })
    }
  }

  render(data) {
    const { orientation, type } = this.settings;

    let template;
    let styles;

    if (orientation === 'landscape') {
      template = require('./templates/widget-landscape.tpl.html');
      styles = require('./styles/widget-landscape.css');
    } else {
      template = require('./templates/widget.tpl.html');
      styles = require('./styles/widget.css');
    }

    const result = document.createElement('div');
    result.innerHTML = template(Object.assign(data, { styles, type }));

    const description = result.getElementsByClassName(styles.description)[0];
    description.innerHTML = sanitizeHtml(description.innerText);

    this.widgetNode.prepend(result);
  }
}

window.TBWidget = TBWidget;
