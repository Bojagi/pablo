export function renderCssResult(result: any[], props) {
  return result.map(item => {
    if (typeof item === 'function') {
      return item(props).trim();
    }
    return item.trim();
  }).join('').trim();
}
