module.exports = function zeros(expression) {
  const dividers = {
    '2': 0,
    '5': 0
  };

  function getDividersCount(number, divider, config, isEven) {
    let counter = 0;
    let i = divider;

    if (divider === 2) {
      config = '!';
    }

    while (i <= number) {
      const count = Math.floor(number / i);
      switch (config) {
        case '!':
          counter += count;
          break;
        case '!!':
          isEven = (number % 2 === 0);
          counter += isEven ? Math.floor(count / 2) : Math.ceil(count / 2);
          break;
      }
      i *= divider;
    }

    return counter;
  }

  const clearExpr = expression.replace(/!!*/g, ' $& ')
    .replace(/\*/g, '')
    .trim();
  const exprItems = clearExpr.split(/\s/g);

  let i = 0;
  const n = exprItems.length - 1;
  let isEven;
  while (i <= n) {
    if (isNaN(exprItems[i])) {
      isEven = exprItems[i - 1] % 2 === 0;
      dividers['5'] +=
        getDividersCount(exprItems[i - 1], 5, exprItems[i], isEven);

      if ((exprItems[i] === '!!') && !isEven) {
        i++;
        continue;
      }

      dividers['2'] +=
        getDividersCount(exprItems[i - 1], 2, exprItems[i], isEven);
    }
    i++;
  }

  return (dividers['2'] < dividers['5']) ? dividers['2'] : dividers['5'];
}
