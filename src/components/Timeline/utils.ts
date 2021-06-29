export const checkScrollSpeed = (() => {
  let lastPos: number | undefined;
  let newPos: number;
  let timer: NodeJS.Timeout;
  let delta: number;
  let delay = 50;

  function clear() {
    lastPos = undefined;
    delta = 0;
  }

  clear();

  return function () {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();
