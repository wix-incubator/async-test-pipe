const findElement = require('./actions').findElement;

function expect(func) {
  return (...args) => (prevRes, context) => {
    const matcher = args[func.length - 2];
    const el = findElement(matcher, prevRes, context);

    func(context, el, ...args);

    return el;
  }
}

const isVisible = expect((context, el) => context.expect(el).toBeVisible());
const isNotVisible = expect((context, el) => context.expect(el).toBeNotVisible());
const doesExist = expect((context, el) => context.expect(el).toExist());
const doesNotExist = expect((context, el) => context.expect(el).toNotExist());
const hasText = expect((context, el, text) => context.expect(el).toHaveText(text));
const hasId = expect((context, el, id) => context.expect(el).toHaveId(id));
const hasValue = expect((context, el, value) => context.expect(el).toHaveValue(value));

module.exports = {
  isVisible,
  isNotVisible,
  doesExist,
  doesNotExist,
  hasText,
  hasId,
  hasValue,
};
