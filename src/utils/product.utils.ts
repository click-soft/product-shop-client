interface DefaultProductCountArgs {
  isFit: boolean;
  step: number;
}

export function defaultProductCount(args: DefaultProductCountArgs) {
  const { isFit, step } = args;

  return isFit ? 6 : step;
}
