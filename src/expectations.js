import {findElement} from './actions';

function expect(func) {
  return (...args) => (prevRes, context, expectFn = context.expect) => {
    const matcher = args[func.length - 2];
    const element = findElement(matcher, prevRes, context.element);

    return {element, commandRes: func(expectFn, element, ...args)};
  }
}

const isVisible = expect((expectFn, el) => expectFn(el).toBeVisible());
const isNotVisible = expect((expectFn, el) => expectFn(el).toBeNotVisible());
const doesExist = expect((expectFn, el) => expectFn(el).toExist());
const doesNotExist = expect((expectFn, el) => expectFn(el).toNotExist());
const hasText = expect((expectFn, el, text) => expectFn(el).toHaveText(text));
const hasId = expect((expectFn, el, id) => expectFn(el).toHaveId(id));
const hasValue = expect((expectFn, el, value) => expectFn(el).toHaveValue(value));

export {
  isVisible,
  isNotVisible,
  doesExist,
  doesNotExist,
  hasText,
  hasId,
  hasValue,
}
