# async-test-pipe
Convenient interface for asynchronous testing frameworks.

## Contents
* [Installation?](#instalation?)
* [What is that?](#what-is-that?)
* [What you can](#what-you-can)
  * [Initialize](#initialize)
  * [Action list](#action-list) 
  * [Expectation list](#expectation-list) 
  * [Advanced usage](#advanced-usage) 
  
## Installation
```bash
(It's not fully tested ant therefore is not published yet. Please be patient, coming soon.)
```

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
    
    await testPipe(
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
([back to contents](#contents))

Note, that all functions pass to the next step the element, found by matcher or gotten from the previous step.
See **Advanced usage** for details.

### Initialize 
([back to contents](#contents))

```js
import * as detox from 'detox';

describe('Test flow', () => {
  it('tests', async () => {
    await testPipe(
      // ...
    )(detox);
  });
});
```

### Action list 
([back to contents](#contents))

`reloadReact()` reloads React Native on device.
```js
import {reloadReact} from 'async-test-pipe';
//...
  await testPipe(
    reloadReact(),
  )(context);
//...
```

`find(matcher)` finds an element by matcher.
```js
import {find} from 'async-test-pipe';
//...
  await testPipe(
    find(by.id('someId')),
  )(context);
//...
```

`tap([matcher])` taps an element.
```js
import {tap} from 'async-test-pipe';
//...
  await testPipe(
    tap(by.id('someId')),
  )(context);
//...
```

`longPress([matcher])` long presses an element.
```js
import {longPress} from 'async-test-pipe';
//...
  await testPipe(
    longPress(by.id('someId')),
  )(context);
//...
```

`multiTap([matcher])` multi taps an element.
```js
import {multiTap} from 'async-test-pipe';
//...
  await testPipe(
    multiTap(by.id('someId')),
  )(context);
//...
```

`typeText(text, [matcher])` types text to an element.
```js
import {multiTap} from 'async-test-pipe';
//...
  await testPipe(
    text('some text', by.id('someId')),
  )(context);
//...
```

`replaceText(text, [matcher])` replaces text in the element.
```js
import {replaceText} from 'async-test-pipe';
//...
  await testPipe(
    replaceText('some text', by.id('someId')),
  )(context);
//...
```

`clearText([matcher])` clears text from the element.
```js
import {clearText} from 'async-test-pipe';
//...
  await testPipe(
    clearText(by.id('someId')),
  )(context);
//...
```

`scroll(distance, direction, [matcher])` scrolls an element by a given distance in a given direction. 
```js
import {scroll} from 'async-test-pipe';
//...
  await testPipe(
    scroll(100, 'down', by.id('someId')),
  )(context);
//...
```

`scrollTo(edge, [matcher])` scrolls an element to a given edge.
```js
import {scrollTo} from 'async-test-pipe';
//...
  await testPipe(
    scrollTo('top', by.id('someId')),
  )(context);
//...
```

`swipe(direction, speed, percentage, [matcher])` swipes an element in a given direction with a given speed by a given distance in percents.
```js
import {swipe} from 'async-test-pipe';
//...
  await testPipe(
    swipe('top', 'fast', 10, by.id('someId')),
  )(context);
//...
```

### Expectation list
([back to contents](#contents))

`isVisible([matcher])` checks if an element is visible.
```js
import {isVisible} from 'async-test-pipe';
//...
  await testPipe(
    isVisible(by.id('someId')),
  )(context);
//...
```

`isNotVisible([matcher])` checks if an element is not visible.
```js
import {isNotVisible} from 'async-test-pipe';
//...
  await testPipe(
    isNotVisible(by.id('someId')),
  )(context);
//...
```

`doesExist([matcher])` checks if an element exist.
```js
import {doesExist} from 'async-test-pipe';
//...
  await testPipe(
    doesExist(by.id('someId')),
  )(context);
//...
```

`doesNotExist([matcher])` checks if an element doesn't exist. 
```js
import {doesNotExist} from 'async-test-pipe';
//...
  await testPipe(
    doesNotExist(by.id('someId')),
  )(context);
//...
```

`hasText(text, [matcher])` checks if an element has given text.  
```js
import {hasText} from 'async-test-pipe';
//...
  await testPipe(
    hasText('some text', by.id('someId')),
  )(context);
//...
```

`hasId(id, [matcher])` checks if an element has given id.
```js
import {hasId} from 'async-test-pipe';
//...
  await testPipe(
    hasId('someId', by.id('someId')),
  )(context);
//...
```

`hasValue(value, [matcher])` checks if an element has given value.
```js
import {hasValue} from 'async-test-pipe';
//...
  await testPipe(
    hasValue(100, by.id('someId')),
  )(context);
//...
```

### Advanced usage
([back to contents](#contents))

Consider few advanced examples.

**You don't have to pass matcher all the time. All functions are getting the previously found element by default.**

```js
import * as detox from 'detox';
import {testPipe, reloadReact, find, isVisible, typeText, replaceText, clearText} from 'async-test-pipe';

const {by} = detox; 

describe('Some flow', () => {
  it('expects something to be correct', async () => {
    const someElement = by.id('someId');
    
    await testPipe(
      reloadReact(),
      find(someElement),
      isVisible(),
      typeText('some text'),
      replaceText('new next'),
      clearText(),
    )(detox);
    
    // The same (it's not required to use `find` separately) 
    
    await testPipe(
      reloadReact(),
      isVisible(someElement),
      typeText('some text'),
      replaceText('new next'),
      clearText(),
    )(detox);
  });
});
```

**You can reuse existing pipe.**

```js
import * as detox from 'detox';
import {
  testPipe, reloadReact, find, isVisible, typeText, 
  replaceText, clearText, doesNotExist, tap,
} from 'async-test-pipe';

const {by} = detox; 

describe('Some flow', () => {
  const emailInput = by.id('email');
  
  const loginPipe = testPipe(
    reloadReact(),
    isVisible(emailInput),
    typeText('john@example.com'),
    typeText('123456', by.id('password')),
    tap(by.id('Login')),
    isVisible(by.text('Welcome')),
    doesNotExist(emailInput),
  );
  
  it('logins successfully', async () => {
    await loginPipe(detox);
  });
  
  it('expects something to be correct', async () => {
    const someElement = by.id('someId');
    
    await testPipe(
      loginPipe,
      find(someElement),
      isVisible(),
      typeText('some text'),
      replaceText('new next'),
      clearText(),
    )(detox);
  });
});
```
