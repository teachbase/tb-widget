import welcome from './welcome';

welcome('home');

// import

class TBWidget {
  constructor(settings) {
    this.settings = settings;
  }
}

window.TBWidget = TBWidget;
