/**
 * Remove missing requestAnimationFrame polyfill warning
 */
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
