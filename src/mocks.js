class MockElement {
  constructor() {
    this.tapped = false;
    this.longPressed = false;
    this.tappedTimes = null;
    this.text = '';
    this.scrolled = {
      direction: '',
      distance: 0,
    };
    this.swiped = {
      direction: '',
      speed: '',
      percentage: 0,
    };
  }

  tap() {
    this.tapped = true;
  }

  longPress() {
    this.longPressed = true;
  }

  multiTap(times) {
    this.tappedTimes = times;
  }

  typeText(text) {
    this.text = text;
  }

  replaceText(text) {
    this.text = text;
  }

  clearText() {
    this.text = '';
  }

  scroll(distance, direction) {
    this.scrolled = {direction, distance};
  }

  scrollTo(edge) {
    this.scrolled = {direction: edge};
  }

  swipe(direction, speed, percentage) {
    this.swiped = {direction, speed, percentage};
  }
}

const mockContextDefaults = {matcher: {}, element: new MockElement(), commandRes: undefined};

class MockContext {
  constructor({
    matcher = mockContextDefaults.matcher,
    element = mockContextDefaults.element,
    commandRes = mockContextDefaults.commandRes,
  } = mockContextDefaults) {
    this.commandRes = commandRes;
    this.els = new Map([[matcher, element]]);
    this.device = {
      reloadReactNative: () => this.device.reloaded = true,
      reloaded: false,
    };
    this.checked = {
      element: null,
      visibility: false,
      invisibility: false,
      existence: false,
      inexistence: false,
      text: '',
      id: null,
      value: '',
    };

    this.element = this.element.bind(this);
    this.expect = this.expect.bind(this);
  }

  element(matcher) {
    return this.els.get(matcher);
  }

  expect(el) {
    return {
      toBeVisible: () => (this.checked.element = el, this.checked.visibility = true, this.commandRes),
      toBeNotVisible: () => (this.checked.element = el, this.checked.invisibility = true, this.commandRes),
      toExist: () => (this.checked.element = el, this.checked.existence = true, this.commandRes),
      toNotExist: () => (this.checked.element = el, this.checked.inexistence = true, this.commandRes),
      toHaveText: text => (this.checked.element = el, this.checked.text = text, this.commandRes),
      toHaveId: id => (this.checked.element = el, this.checked.id = id, this.commandRes),
      toHaveValue: value => (this.checked.element = el, this.checked.value = value, this.commandRes),
    }
  }
}

export {
  MockElement,
  MockContext,
}
