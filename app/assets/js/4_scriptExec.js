///////////////////////////////////// code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('page:before-change', function(e) {
  var url = e.target.activeElement.href;
  e.preventDefault();
  // switchPage(url, 'off');
});
// document.addEventListener('page:fetch', function() { });
document.addEventListener('page:restore', function() { recCurrPage(); restoreScripts(); });

document.addEventListener('page:change', function() {
  getWindowDimensions();
  recCurrPage();
  globalInit();
  if ( w.Width > 1025 ) { desktop(); }
  else if ( (w.Width > 300) && (w.Width < 1025) ) { mobileA(); }
  // switchPage(window.location.href, 'on');
});

window.onresize = function resizeElements() {
  var timeout = window.setTimeout(function() {
    getWindowDimensions();
    resizeScripts();
    clearTimeout(timeout);
  }, 100); }

function restoreScripts() { }

function resizeScripts() {
  globalInit();
  if ( w.Width > 1025 ) { desktop(); }
  else if ( (w.Width > 300) && (w.Width < 1025) ) { mobileA(); }

  switch (p.Current) {
    case 'aboutPAGE': initMap(); break;
  }
}
