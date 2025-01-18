const clampRegExp = (multiplier: number, lowerBase: number, upperBase: number) =>
  new RegExp(
    `clamp\\(${multiplier * lowerBase}rem,\\s\\d+\\.\\d+rem\\s\\+\\s\\d+\\.\\d+vw,\\s${multiplier * upperBase}rem\\)`
  );

const matchClamp = (multiplier: number, lowerBase: number, upperBase: number) => {
  return expect.stringMatching(clampRegExp(multiplier, lowerBase, upperBase));
};

const matchMultipleClamp = (multipliers: number[], lowerBase: number, upperBase: number) => {
  const clampRegex = /clamp\([^)]+\)/g;

  return expect.toSatisfy((input: string) => {
    const matches = input.match(clampRegex);
    if (!matches || !matches.length) {
      return false;
    }
    return matches.every((value, index) =>
      matchClamp(multipliers[index], lowerBase, upperBase).asymmetricMatch(value)
    );
  });
};

export { matchClamp, matchMultipleClamp, clampRegExp };
