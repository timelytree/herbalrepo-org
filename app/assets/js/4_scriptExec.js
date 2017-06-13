///////////////////////////////////// code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  recCurrPage();
  globalInit();
  if ( w.Width > 737 ) { desktop(); }
  if ( w.Width < 737 ) { mobile(); }
});

// window.onresize = function resizeElements() {
//   if (timeout) { return false; }
//   else {
//     var timeout = window.setTimeout(function() {
//       getWindowDimensions();
//       if (w.Width > 414) { run(core.global.headerAnimOnSCROLL); }
//       clearTimeout(timeout);
//   }, 2000);
//
//   }
//
// }
