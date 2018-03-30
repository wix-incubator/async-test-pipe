import {MockElement, MockContext} from './mocks';
import {doesExist, doesNotExist, hasId, hasText, hasValue, isNotVisible, isVisible} from './expectations';

describe('testPipe expectations', () => {
  describe('isVisible', () => {
    it(`checks an element's visibility`, () => {
      const commandResMock = 'commandRes';
      const el = new MockElement();
      const context = new MockContext({commandRes: commandResMock});

      const {element, commandRes} = isVisible()({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(context.checked.element).toBe(el);
      expect(context.checked.visibility).toBe(true);
    });

    it(`checks an element's visibility by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext({matcher, element: contextEl});

      const {element} = isVisible(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
    });
  });

  describe('isNotVisible', () => {
    it(`checks an element's invisibility`, () => {
      const commandResMock = 'commandRes';
      const el = new MockElement();
      const context = new MockContext({commandRes: commandResMock});

      const {element, commandRes} = isNotVisible()({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(context.checked.element).toBe(el);
      expect(context.checked.invisibility).toBe(true);
    });

    it(`checks an element's invisibility by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext({matcher, element: contextEl});

      const {element} = isNotVisible(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
    });
  });

  describe('doesExist', () => {
    it(`checks an element's existence`, () => {
      const commandResMock = 'commandRes';
      const el = new MockElement();
      const context = new MockContext({commandRes: commandResMock});

      const {element, commandRes} = doesExist()({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(context.checked.element).toBe(el);
      expect(context.checked.existence).toBe(true);
    });

    it(`checks an element's existence by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext({matcher, element: contextEl});

      const {element} = doesExist(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
    });
  });

  describe('doesNotExist', () => {
    it(`checks an element's inexistence`, () => {
      const commandResMock = 'commandRes';
      const el = new MockElement();
      const context = new MockContext({commandRes: commandResMock});

      const {element, commandRes} = doesNotExist()({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(context.checked.element).toBe(el);
      expect(context.checked.inexistence).toBe(true);
    });

    it(`checks an element's inexistence by matcher`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext({matcher, element: contextEl});

      const {element} = doesNotExist(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
    });
  });

  describe('hasText', () => {
    it(`checks that an element has text`, () => {
      const commandResMock = 'commandRes';
      const el = new MockElement();
      const context = new MockContext({commandRes: commandResMock});
      const text = 'test text';

      const {element, commandRes} = hasText(text)({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(context.checked.element).toBe(el);
      expect(context.checked.text).toBe(text);
    });

    it(`checks that an element found by matcher has text`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext({matcher, element: contextEl});

      const {element} = hasText('', matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
    });
  });

  describe('hasId', () => {
    it(`checks that an element has id`, () => {
      const commandResMock = 'commandRes';
      const el = new MockElement();
      const context = new MockContext({commandRes: commandResMock});
      const id = 'testId';

      const {element, commandRes} = hasId(id)({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(context.checked.element).toBe(el);
      expect(context.checked.id).toBe(id);
    });

    it(`checks that an element found by matcher has id`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext({matcher, element: contextEl});

      const {element} = hasId('', matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
    });
  });

  describe('hasValue', () => {
    it(`checks that an element has id`, () => {
      const commandResMock = 'commandRes';
      const el = new MockElement();
      const context = new MockContext({commandRes: commandResMock});
      const value = 'testVal';

      const {element, commandRes} = hasValue(value)({element: el}, context);

      expect(element).toBe(el);
      expect(commandRes).toBe(commandResMock);
      expect(context.checked.element).toBe(el);
      expect(context.checked.value).toBe(value);
    });

    it(`checks that an element found by matcher has id`, () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const context = new MockContext({matcher, element: contextEl});

      const {element} = hasValue('', matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(context.checked.element).toBe(contextEl);
    });
  });
});
