import {MockElement, MockContext} from './mocks';
import {
  clearText, find, findElement, longPress, multiTap, reloadReact, replaceText,
  scroll, scrollTo, swipe, tap, typeText,
} from './actions';

describe('testPipe actions', () => {
  describe('findElement', () => {
    const el = new MockElement();

    it('returns the element from previous step', () => {
      const foundElement = findElement(undefined, el, new MockContext().element);

      expect(foundElement).toBe(el);
    });

    it('returns looks for element in context', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const foundElement = findElement(matcher, el, new MockContext(matcher, contextEl).element);

      expect(foundElement).toBe(contextEl);
    });
  });

  describe('find', () => {
    it('finds and returns the element from previous step', () => {
      const el = {mock: 'element from previous step'};

      const foundElement = find(undefined)(el, {});

      expect(foundElement).toBe(el);
    });

    it('finds and returns the element from context', () => {
      const contextEl = {mock: 'element from context'};
      const matcher = {byId: 'test'};

      const foundElement = find(matcher)({}, new MockContext(matcher, contextEl));

      expect(foundElement).toBe(contextEl);
    });
  });

  describe('reloadReact', () => {
    it('reloads react native on device', () => {
      const context = new MockContext();

      reloadReact()(undefined, context);

      expect(context.device.reloaded).toBe(true);
    });
  });

  describe('tap', () => {
    it('taps the element from previous step', () => {
      const el = new MockElement();

      const element = tap()(el, new MockContext());

      expect(element).toBe(el);
      expect(el.tapped).toBe(true);
    });

    it('taps the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const element = tap(matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.tapped).toBe(true);
    });
  });

  describe('longPress', () => {
    it('long presses the element from previous step', () => {
      const el = new MockElement();

      const element = longPress()(el, new MockContext());

      expect(element).toBe(el);
      expect(el.longPressed).toBe(true);
    });

    it('long presses the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const element = longPress(matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.longPressed).toBe(true);
    });
  });

  describe('multiTap', () => {
    it('multitaps the element from previous step', () => {
      const el = new MockElement();
      const times = 2;

      const element = multiTap(times)(el, new MockContext());

      expect(element).toBe(el);
      expect(el.tappedTimes).toBe(times);
    });

    it('multitaps the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const times = 2;

      const element = multiTap(times, matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.tappedTimes).toBe(times);
    });
  });

  describe('typeText', () => {
    it('types text to the element from previous step', () => {
      const el = new MockElement();
      const text = 'some text';

      const element = typeText(text)(el, new MockContext());

      expect(element).toBe(el);
      expect(el.text).toBe(text);
    });

    it('types text to the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const text = 'some text';

      const element = typeText(text, matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.text).toBe(text);
    });
  });

  describe('replaceText', () => {
    it('replaces text in the element from previous step', () => {
      const el = new MockElement();
      const context = new MockContext();
      const text = 'another text';

      typeText('some text')(el, context);
      const element = replaceText(text)(el, context);

      expect(element).toBe(el);
      expect(el.text).toBe(text);
    });

    it('replaces text in the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext(matcher, contextEl);
      const text = 'another text';

      typeText('some text', matcher)({}, context);
      const element = replaceText(text, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(contextEl.text).toBe(text);
    });
  });

  describe('clearText', () => {
    it('clears text in the element from previous step', () => {
      const el = new MockElement();
      const context = new MockContext();

      typeText('some text')(el, context);
      const element = clearText()(el, context);

      expect(element).toBe(el);
      expect(el.text).toBe('');
    });

    it('clears text in the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext(matcher, contextEl);

      typeText('some text', matcher)({}, context);
      const element = clearText(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(contextEl.text).toBe('');
    });
  });

  describe('scroll', () => {
    it('scrolls the element from previous step', () => {
      const el = new MockElement();
      const context = new MockContext();
      const distance = 10;
      const direction = 'up';

      const element = scroll(distance, direction)(el, context);

      expect(element).toBe(el);
      expect(el.scrolled).toEqual({distance, direction});
    });

    it('scrolls the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext(matcher, contextEl);
      const distance = 10;
      const direction = 'up';

      const element = scroll(distance, direction, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(contextEl.scrolled).toEqual({distance, direction});
    });
  });

  describe('scrollTo', () => {
    it('scrolls to the edge the element from previous step', () => {
      const el = new MockElement();
      const context = new MockContext();
      const direction = 'top';

      const element = scrollTo(direction)(el, context);

      expect(element).toBe(el);
      expect(el.scrolled).toEqual({direction});
    });

    it('scrolls to the edge the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext(matcher, contextEl);
      const direction = 'top';

      const element = scrollTo(direction, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(contextEl.scrolled).toEqual({direction});
    });
  });

  describe('swipe', () => {
    it('swipes the element from previous step', () => {
      const el = new MockElement();
      const context = new MockContext();
      const direction = 'up';
      const speed = 'fast';
      const percentage = 0.5;

      const element = swipe(direction, speed, percentage)(el, context);

      expect(element).toBe(el);
      expect(el.swiped).toEqual({direction, speed, percentage});
    });

    it('swipes the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext(matcher, contextEl);
      const direction = 'up';
      const speed = 'fast';
      const percentage = 0.5;

      const element = swipe(direction, speed, percentage, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(contextEl.swiped).toEqual({direction, speed, percentage});
    });
  });
});
