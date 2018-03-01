
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

class MockContext {
  constructor(matcher = {}, el = new MockElement()) {
    this.els = new Map([[matcher, el]]);
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
  }

  element(matcher) {
    return this.els.get(matcher);
  }

  expect(el) {
    return {
      toBeVisible: () => (this.checked.element = el, this.checked.visibility = true),
      toBeNotVisible: () => (this.checked.element = el, this.checked.invisibility = true),
      toExist: () => (this.checked.element = el, this.checked.existence = true),
      toNotExist: () => (this.checked.element = el, this.checked.inexistence = true),
      toHaveText: text => (this.checked.element = el, this.checked.text = text),
      toHaveId: id => (this.checked.element = el, this.checked.id = id),
      toHaveValue: value => (this.checked.element = el, this.checked.value = value),
    }
  }
}

module.exports = {
  MockElement,
  MockContext,
};
