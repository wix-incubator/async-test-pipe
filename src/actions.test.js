import {MockElement, MockContext} from './mocks';
import {
  clearText, find, findElement, longPress, multiTap, reloadReact, replaceText,
  scroll, scrollTo, swipe, tap, typeText, waitFor,
} from './actions';

describe('testPipe actions', () => {
  describe('findElement', () => {
    const element = new MockElement();

    it('returns the element from previous step', () => {
      const foundElement = findElement(undefined, {element}, new MockContext().element);

      expect(foundElement).toBe(element);
    });

    it('looks for element in context', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const foundElement = findElement(matcher, {element}, new MockContext({matcher, element: contextEl}).element);

      expect(foundElement).toBe(contextEl);
    });
  });

  describe('find', () => {
    it('finds and returns the element from previous step', () => {
      const el = {mock: 'element from previous step'};

      const {element} = find(undefined)({element: el}, {});

      expect(element).toBe(el);
    });

    it('finds and returns the element from context', () => {
      const contextEl = {mock: 'element from context'};
      const matcher = {byId: 'test'};

      const {element} = find(matcher)({}, new MockContext({matcher, element: contextEl}));

      expect(element).toBe(contextEl);
    });
  });

  describe('reloadReact', () => {
    it('reloads react native on device', () => {
      const commandResMock = 'commandRes';
      const context = new MockContext({commandRes: commandResMock});

      const {commandRes} = reloadReact()(undefined, context);

      expect(commandRes).toBe(commandResMock);
      expect(context.device.reloaded).toBe(true);
    });
  });

  describe('tap', () => {
    it('taps the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});

      const {element, commandRes} = tap()({element: el}, new MockContext());

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.tapped).toBe(true);
    });

    it('taps the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const {element} = tap(matcher)({}, new MockContext({matcher, element: contextEl}));

      expect(element).toBe(contextEl);
    });
  });

  describe('longPress', () => {
    it('long presses the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});

      const {element, commandRes} = longPress()({element: el}, new MockContext());

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.longPressed).toBe(true);
    });

    it('long presses the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const {element} = longPress(matcher)({}, new MockContext({matcher, element: contextEl}));

      expect(element).toBe(contextEl);
    });
  });

  describe('multiTap', () => {
    it('multitaps the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});
      const times = 2;

      const {element, commandRes} = multiTap(times)({element: el}, new MockContext());

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.tappedTimes).toBe(times);
    });

    it('multitaps the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const {element} = multiTap(2, matcher)({}, new MockContext({matcher, element: contextEl}));

      expect(element).toBe(contextEl);
    });
  });

  describe('typeText', () => {
    it('types text to the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});
      const text = 'some text';

      const {element, commandRes} = typeText(text)({element: el}, new MockContext());

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.text).toBe(text);
    });

    it('types text to the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const {element} = typeText('some text', matcher)({}, new MockContext({matcher, element: contextEl}));

      expect(element).toBe(contextEl);
    });
  });

  describe('replaceText', () => {
    it('replaces text in the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});
      const context = new MockContext();
      const text = 'another text';

      typeText('some text')({element: el}, context);
      const {element, commandRes} = replaceText(text)({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.text).toBe(text);
    });

    it('replaces text in the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext({matcher, element: contextEl});

      typeText('some text', matcher)({}, context);
      const {element} = replaceText('another text', matcher)({}, context);

      expect(element).toBe(contextEl);
    });
  });

  describe('clearText', () => {
    it('clears text in the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});
      const context = new MockContext();

      typeText('some text')({element: el}, context);
      const {element, commandRes} = clearText()({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.text).toBe('');
    });

    it('clears text in the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext({matcher, element: contextEl});

      typeText('some text', matcher)({}, context);
      const {element} = clearText(matcher)({}, context);

      expect(element).toBe(contextEl);
    });
  });

  describe('scroll', () => {
    it('scrolls the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});
      const context = new MockContext();
      const distance = 10;
      const direction = 'up';

      const {element, commandRes} = scroll(distance, direction)({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.scrolled).toEqual({distance, direction});
    });

    it('scrolls the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext({matcher, element: contextEl});

      const {element} = scroll(10, 'up', matcher)({}, context);

      expect(element).toBe(contextEl);
    });
  });

  describe('scrollTo', () => {
    it('scrolls to the edge the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});
      const context = new MockContext();
      const direction = 'top';

      const {element, commandRes} = scrollTo(direction)({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.scrolled).toEqual({direction});
    });

    it('scrolls to the edge the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext({matcher, element: contextEl});

      const {element} = scrollTo('top', matcher)({}, context);

      expect(element).toBe(contextEl);
    });
  });

  describe('swipe', () => {
    it('swipes the element from previous step', () => {
      const commandResMock = 'commandRes';
      const el = new MockElement({commandRes: commandResMock});
      const context = new MockContext();
      const direction = 'up';
      const speed = 'fast';
      const percentage = 0.5;

      const {element, commandRes} = swipe(direction, speed, percentage)({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(el.swiped).toEqual({direction, speed, percentage});
    });

    it('swipes the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext({matcher, element: contextEl});

      const {element} = swipe('up', 'fast', 0.5, matcher)({}, context);

      expect(element).toBe(contextEl);
    });
  });

  describe('waitFor', () => {
    class ExpectationMock {
      constructor(element) {
        this.element = element;
        this.prevRes = undefined;

        this.expectation = this.expectation.bind(this);
      }

      expectation(prevRes, context, expectFn) {
        this.prevRes = prevRes;

        return {element: this.element, commandRes: expectFn(this.element).expectation()}
      }
    }

    it('returns the element found by expectation function', () => {
      const el = new MockElement();
      const context = new MockContext();
      const expectationMock = new ExpectationMock(el);
      const prevRes = {};

      const {element} = waitFor(expectationMock.expectation, 0)(prevRes, context);

      expect(element).toBe(el);
      expect(prevRes).toBe(expectationMock.prevRes);
      expect(context.checked.element).toBe(el);
    });

    it('waits until expectation is fulfilled or a specified timeout expires', () => {
      const el = new MockElement();
      const commandResMock = 'commandRes';
      const context = new MockContext({commandRes: commandResMock});
      const expectationMock = new ExpectationMock(el);
      const time = 300;

      const {commandRes} = waitFor(expectationMock.expectation, time)({}, context);

      expect(commandRes).toBe(commandResMock);
      expect(context.checked.waitForTime).toBe(time);
      expect(context.checked.waitForExpectation).toBe(true);
    });
  });

  describe('waitWhile', () => {
    // it('swipes the element from previous step', () => {
    //   const el = new MockElement();
    //   const context = new MockContext();
    //   const direction = 'up';
    //   const speed = 'fast';
    //   const percentage = 0.5;
    //
    //   const element = swipe(direction, speed, percentage)(el, context);
    //
    //   expect(element).toBe(el);
    //   expect(el.swiped).toEqual({direction, speed, percentage});
    // });
    //
    // it('swipes the element found by matcher', () => {
    //   const matcher = {byId: 'test'};
    //   const contextEl = new MockElement();
    //   const context = new MockContext({matcher, element: contextEl});
    //   const direction = 'up';
    //   const speed = 'fast';
    //   const percentage = 0.5;
    //
    //   const element = swipe(direction, speed, percentage, matcher)({}, context);
    //
    //   expect(element).toBe(contextEl);
    //   expect(contextEl.swiped).toEqual({direction, speed, percentage});
    // });
  });
});
