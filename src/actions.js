function action(func) {
  return (...args) => (prevRes, context, findFn = context.element) => {
    const matcher = args[func.length - 1];
    const el = findElement(matcher, prevRes, findFn);

    func(el, ...args);

    return el;
  }
}

const findElement = (matcher = undefined, prevRes, find) =>
  matcher ? find(matcher) : prevRes;

const reloadReact = () => (prevRes, context) => context.device.reloadReactNative();
const find = matcher => (prevRes, context) => findElement(matcher, prevRes, context.element);
const tap = action(el => el.tap());
const longPress = action(el => el.longPress());
const multiTap = action((el, times) => el.multiTap(times));
const typeText = action((el, text) => el.typeText(text));
const replaceText = action((el, text) => el.replaceText(text));
const clearText = action(el => el.clearText());
const scroll = action((el, distance, direction) => el.scroll(distance, direction));
const scrollTo = action((el, edge) => el.scrollTo(edge));
const swipe = action((el, direction, speed, percentage) => el.swipe(direction, speed, percentage));

export {
  findElement,
  reloadReact,
  find,
  tap,
  longPress,
  multiTap,
  typeText,
  replaceText,
  clearText,
  scroll,
  scrollTo,
  swipe,
}
