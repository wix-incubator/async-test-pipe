# async-test-pipe
Convenient interface for asynchronous testing frameworks.

* [What is that?](#what-is-that?)
* [What you can](#what-you-can)
  * [Initialize](#initialize)
  * [Action list](#action-list) 
  * [Expectation list](#expectation-list) 
  * [Advanced usage](#advanced-usage) 

## What is that?
This is just a simple pipe library that provides you with convenient interface 
for asynchronous automation testing frameworks.

Initially it was designed for [detox](https://github.com/wix/detox), 
which is grey box end-to-end testing and automation library for mobile apps.

But it can be used with any framework, that is implementing the same interface.

For example, this **detox** sample
```js
describe('Login flow', () => {
  it('logins successfully', async () => {
    const emailInput = by.id('email');
    
    await device.reloadReactNative();
    await expect(element(emailInput)).toBeVisible();
      
    await element(emailInput).typeText('john@example.com');
    await element(by.id('password')).typeText('123456');
    await element(by.text('Login')).tap();
      
    await expect(element(by.text('Welcome'))).toBeVisible();
    await expect(element(emailInput)).toNotExist();
  });
});
```

using **async-test-pipe** becomes:
```js
import {by, element, expect, device} from 'detox';

describe('Login flow', () => {
  it('logins successfully', async () => {
    const emailInput = by.id('email');
    
    await testFlow(
      reloadReact(),
      isVisible(emailInput),
      typeText('john@example.com'),
      typeText('123456', by.id('password')),
      tap(by.id('Login')),
      isVisible(by.text('Welcome')),
      doesNotExist(emailInput),
    )({element, expect, device});
  });
});
```

Looks more sexy, no?

## What you can

Note, that all functions pass to the next step the element, found by matcher or gotten from the previous step.
See **Advanced usage** for details.

### Initialize

```js
import * as detox from 'detox';

describe('Test flow', () => {
  it('tests', async () => {
    await testFlow(
      // ...
    )(detox);
  });
});
```

### Action list

`reloadReact()` reloads React Native on device.
```js
import {reloadReact} from 'async-test-pipe';
//...
  await testFlow(
    reloadReact(),
  )(context);
//...
```

`find(matcher)` finds an element by matcher.
```js
import {find} from 'async-test-pipe';
//...
  await testFlow(
    find(by.id('someId')),
  )(context);
//...
```

`tap([matcher])` taps an element.
```js
import {tap} from 'async-test-pipe';
//...
  await testFlow(
    tap(by.id('someId')),
  )(context);
//...
```

`longPress([matcher])` long presses an element.
```js
import {longPress} from 'async-test-pipe';
//...
  await testFlow(
    longPress(by.id('someId')),
  )(context);
//...
```

`multiTap([matcher])` multi taps an element.
```js
import {multiTap} from 'async-test-pipe';
//...
  await testFlow(
    multiTap(by.id('someId')),
  )(context);
//...
```

`typeText(text, [matcher])` types text to an element.
```js
import {multiTap} from 'async-test-pipe';
//...
  await testFlow(
    text('some text', by.id('someId')),
  )(context);
//...
```

`replaceText(text, [matcher])` replaces text in the element.
```js
import {replaceText} from 'async-test-pipe';
//...
  await testFlow(
    replaceText('some text', by.id('someId')),
  )(context);
//...
```

`clearText([matcher])` clears text from the element.
```js
import {clearText} from 'async-test-pipe';
//...
  await testFlow(
    clearText(by.id('someId')),
  )(context);
//...
```

`scroll(distance, direction, [matcher])` scrolls an element by a given distance in a given direction. 
```js
import {scroll} from 'async-test-pipe';
//...
  await testFlow(
    scroll(100, 'down', by.id('someId')),
  )(context);
//...
```

`scrollTo(edge, [matcher])` scrolls an element to a given edge.
```js
import {scrollTo} from 'async-test-pipe';
//...
  await testFlow(
    scrollTo('top', by.id('someId')),
  )(context);
//...
```

`swipe(direction, speed, percentage, [matcher])` swipes an element in a given direction with a given speed by a given distance in percents.
```js
import {swipe} from 'async-test-pipe';
//...
  await testFlow(
    swipe('top', 'fast', 10, by.id('someId')),
  )(context);
//...
```

### Expectation list

`isVisible([matcher])` checks if an element is visible.
```js
import {isVisible} from 'async-test-pipe';
//...
  await testFlow(
    isVisible(by.id('someId')),
  )(context);
//...
```

`isNotVisible([matcher])` checks if an element is not visible.
```js
import {isNotVisible} from 'async-test-pipe';
//...
  await testFlow(
    isNotVisible(by.id('someId')),
  )(context);
//...
```

`doesExist([matcher])` checks if an element exist.
```js
import {doesExist} from 'async-test-pipe';
//...
  await testFlow(
    doesExist(by.id('someId')),
  )(context);
//...
```

`doesNotExist([matcher])` checks if an element doesn't exist. 
```js
import {doesNotExist} from 'async-test-pipe';
//...
  await testFlow(
    doesNotExist(by.id('someId')),
  )(context);
//...
```

`hasText(text, [matcher])` checks if an element has given text.  
```js
import {hasText} from 'async-test-pipe';
//...
  await testFlow(
    hasText('some text', by.id('someId')),
  )(context);
//...
```

`hasId(id, [matcher])` checks if an element has given id.
```js
import {hasId} from 'async-test-pipe';
//...
  await testFlow(
    hasId('someId', by.id('someId')),
  )(context);
//...
```

`hasValue(value, [matcher])` checks if an element has given value.
```js
import {hasValue} from 'async-test-pipe';
//...
  await testFlow(
    hasValue(100, by.id('someId')),
  )(context);
//...
```

### Advanced usage

