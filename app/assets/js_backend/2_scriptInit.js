/////////////////////////////////////////////////////// Initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.flashNOTICE);
  run(core.global.listFilter);
  switch (p.Current) {
    case 'adminNEW':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      break;
    case 'adminEDIT':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      run(core.global.highlightCATEGORIES);
      break;
  }
}

///////////////////////////////////// Code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  recCurrPage();
  globalInit();
  // if ( w.Width > 737 ) { desktop(); }
  // if ( w.Width < 737 ) { mobile(); }
});
