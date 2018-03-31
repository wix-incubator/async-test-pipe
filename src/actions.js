function action(func) {
  return (...args) => (prevRes, context, findFn = context.element) => {
    const matcher = args[func.length - 1];
    const element = findElement(matcher, prevRes, findFn);

    return {element, commandRes: func(element, ...args)};
  }
}

function waitForAction(func) {
  return (expectation, ...args) => (prevRes, context) => {
    const {element, commandRes} = expectation(prevRes, context, context.waitFor);

    return {element, commandRes: func(commandRes, context, ...args)}
  }
}

const findElement = (matcher = undefined, {element}, find) => matcher ? find(matcher) : element;

const reloadReact = () => (prevRes, context) => ({commandRes: context.device.reloadReactNative()});
const find = matcher => (prevRes, context) => ({element: findElement(matcher, prevRes, context.element)});
const tap = action(el => el.tap());
const longPress = action(el => el.longPress());
const multiTap = action((el, times) => el.multiTap(times));
const typeText = action((el, text) => el.typeText(text));
const replaceText = action((el, text) => el.replaceText(text));
const clearText = action(el => el.clearText());
const scroll = action((el, distance, direction) => el.scroll(distance, direction));
const scrollTo = action((el, edge) => el.scrollTo(edge));
const swipe = action((el, direction, speed, percentage) => el.swipe(direction, speed, percentage));
const waitFor = waitForAction((commandRes, context, time) => commandRes.withTimeout(time));
const waitWhile = waitForAction((commandRes, context, whileAction) =>
  whileAction({}, context, commandRes.whileElement).commandRes);

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
  waitFor,
  waitWhile,
}
