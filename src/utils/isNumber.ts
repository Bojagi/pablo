const isNumber = (n: any): n is number => {
  return typeof n === 'number' && !isNaN(n);
};

export { isNumber };
