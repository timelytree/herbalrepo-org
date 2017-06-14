/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.flashNOTICE);
  if (w.Width > 414) { run(core.global.headerAnimOnSCROLL); }
  if (w.Width < 414) { run(core.mobile.menuINT); }
  switch (p.Current) {
    case 'herbIndexPAGE':
      run(core.global.lazyLoad);
      run(core.global.listFilter);
      break;
    case 'herbPAGE':
      run(core.global.lazyLoad);
      run(core.global.listFilter);
      run(core.global.showdownINIT);
      run(core.global.markdown);
      break;
    case 'categoryPAGE':
      run(core.global.lazyLoad);
      run(core.global.listFilter);
      break;
  }
}

function desktop() {
}

function mobile() {
}

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
