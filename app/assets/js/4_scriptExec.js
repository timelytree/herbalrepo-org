///////////////////////////////////// code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  globalInit();
  if ( w.Width > 781 ) { desktop(); }
  if ( w.Width < 780 ) { mobile(); }
});
