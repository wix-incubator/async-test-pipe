import {testPipe} from './index';

class TestHelper {
  constructor() {
    this.prevRes = undefined;
    this.context = undefined;
    this.returnValue = undefined;
  }

  createCommand(returnValue) {
    return (prevRes, context) => this.executeCommand(returnValue, prevRes, context);
  }

  createAsyncCommand(returnValue) {
    return async(prevRes, context) => this.executeCommand(returnValue, prevRes, context);
  }

  executeCommand(returnValue, prevRes, context) {
    this.prevRes = prevRes;
    this.context = context;

    return returnValue;
  }
}

describe('testPipe', () => {
  it(`runs commands one by one passing previous command result`, async () => {
    const context = {element: {}, expect: () => {}, device: {}};
    const command1Res = 'command 1 return result';
    const command1Helper = new TestHelper();
    const command2Helper = new TestHelper();
    const command1 = command1Helper.createCommand(command1Res);
    const command2 = command2Helper.createCommand();

    await testPipe(
      command1,
      command2,
    )(context);

    expect(command1Helper.context).toBe(context);
    expect(command1Helper.prevRes).toBe(undefined);
    expect(command2Helper.context).toBe(context);
    expect(command2Helper.prevRes).toBe(command1Res);
  });

  it(`can be used as command itself`, async () => {
    const context = {element: {}, expect: () => {}, device: {}};
    const command1Res = 'command 1 return result';
    const command2Res = 'command 2 return result';
    const command1Helper = new TestHelper();
    const command2Helper = new TestHelper();
    const command3Helper = new TestHelper();
    const command1 = command1Helper.createCommand(command1Res);
    const command2 = command2Helper.createCommand(command2Res);
    const command3 = command3Helper.createCommand();

    await testPipe(
      testPipe(command1),
      command2,
      command3,
    )(context);

    expect(command1Helper.context).toBe(context);
    expect(command1Helper.prevRes).toBe(undefined);
    expect(command2Helper.context).toBe(context);
    expect(command2Helper.prevRes).toBe(command1Res);
    expect(command3Helper.context).toBe(context);
    expect(command3Helper.prevRes).toBe(command2Res);
  });

  it(`works with async functions`, async () => {
    const context = {element: {}, expect: () => {}, device: {}};
    const command1Res = 'command 1 return result';
    const command1Helper = new TestHelper();
    const command2Helper = new TestHelper();
    const command1 = command1Helper.createAsyncCommand(command1Res);
    const command2 = command2Helper.createAsyncCommand();

    await testPipe(
      command1,
      command2,
    )(context);

    expect(command1Helper.context).toBe(context);
    expect(command1Helper.prevRes).toBe(undefined);
    expect(command2Helper.context).toBe(context);
    expect(command2Helper.prevRes).toBe(command1Res);
  });
});
