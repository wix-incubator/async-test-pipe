export function testPipe(...commands) {
  return async (...args) => {
    const context = args.length === 1 ? args[0] : args[1];
    let prevRes = args.length > 1 ? args[0] : undefined;

    for (let command of commands)
      prevRes = await command(prevRes, context);

    return prevRes;
  }
}

export * from './actions';
export * from './expectations';
