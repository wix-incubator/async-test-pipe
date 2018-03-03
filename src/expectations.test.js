const expectations = require('./expectations');
const mocks = require('./mocks');
const MockElement = mocks.MockElement;
const MockContext = mocks.MockContext;

describe('testPipe expectations', () => {
  describe('isVisible', () => {
    it(`checks an element's visibility`, () => {
      const el = new MockElement();
      const context = new MockContext();

      const element = expectations.isVisible()(el, context);

      expect(element).toBe(el);
      expect(context.checked.element).toBe(el);
      expect(context.checked.visibility).toBe(true);
    });

    it(`checks an element's visibility by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext(matcher, contextEl);

      const element = expectations.isVisible(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
      expect(context.checked.visibility).toBe(true);
    });
  });

  describe('isNotVisible', () => {
    it(`checks an element's invisibility`, () => {
      const el = new MockElement();
      const context = new MockContext();

      const element = expectations.isNotVisible()(el, context);

      expect(element).toBe(el);
      expect(context.checked.element).toBe(el);
      expect(context.checked.invisibility).toBe(true);
    });

    it(`checks an element's invisibility by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext(matcher, contextEl);

      const element = expectations.isNotVisible(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
      expect(context.checked.invisibility).toBe(true);
    });
  });

  describe('doesExist', () => {
    it(`checks an element's existence`, () => {
      const el = new MockElement();
      const context = new MockContext();

      const element = expectations.doesExist()(el, context);

      expect(element).toBe(el);
      expect(context.checked.element).toBe(el);
      expect(context.checked.existence).toBe(true);
    });

    it(`checks an element's existence by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext(matcher, contextEl);

      const element = expectations.doesExist(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
      expect(context.checked.existence).toBe(true);
    });
  });

  describe('doesNotExist', () => {
    it(`checks an element's inexistence`, () => {
      const el = new MockElement();
      const context = new MockContext();

      const element = expectations.doesNotExist()(el, context);

      expect(element).toBe(el);
      expect(context.checked.element).toBe(el);
      expect(context.checked.inexistence).toBe(true);
    });

    it(`checks an element's inexistence by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext(matcher, contextEl);

      const element = expectations.doesNotExist(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
      expect(context.checked.inexistence).toBe(true);
    });
  });

  describe('hasText', () => {
    it(`checks that an element has text`, () => {
      const el = new MockElement();
      const context = new MockContext();
      const text = 'test text';

      const element = expectations.hasText(text)(el, context);

      expect(element).toBe(el);
      expect(context.checked.element).toBe(el);
      expect(context.checked.text).toBe(text);
    });

    it(`checks that an element found by matcher has text`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext(matcher, contextEl);
      const text = 'test text';

      const element = expectations.hasText(text, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
      expect(context.checked.text).toBe(text);
    });
  });

  describe('hasId', () => {
    it(`checks that an element has id`, () => {
      const el = new MockElement();
      const context = new MockContext();
      const id = 'testId';

      const element = expectations.hasId(id)(el, context);

      expect(element).toBe(el);
      expect(context.checked.element).toBe(el);
      expect(context.checked.id).toBe(id);
    });

    it(`checks that an element found by matcher has id`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext(matcher, contextEl);
      const id = 'testId';

      const element = expectations.hasId(id, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
      expect(context.checked.id).toBe(id);
    });
  });

  describe('hasValue', () => {
    it(`checks that an element has id`, () => {
      const el = new MockElement();
      const context = new MockContext();
      const value = 'testVal';

      const element = expectations.hasValue(value)(el, context);

      expect(element).toBe(el);
      expect(context.checked.element).toBe(el);
      expect(context.checked.value).toBe(value);
    });

    it(`checks that an element found by matcher has id`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext(matcher, contextEl);
      const value = 'testVal';

      const element = expectations.hasValue(value, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
      expect(context.checked.value).toBe(value);
    });
  });
});
