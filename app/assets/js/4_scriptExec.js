///////////////////////////////////// code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  recCurrPage();
  globalInit();
  if ( w.Width > 737 ) { desktop(); }
  if ( w.Width < 737 ) { mobile(); }
});
