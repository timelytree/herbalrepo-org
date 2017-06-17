/////////////////////////////////////////////////////// Initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.flashNOTICE);
  switch (p.Current) {
    case 'adminINDEX':
      run(core.global.listFilter);
      break;
    case 'adminNEW':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      run(core.global.nameFILL);
      run(core.global.uploadImagePREVIEW);
      break;
    case 'adminEDIT':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      run(core.global.highlightCATEGORIES);
      run(core.global.nameFILL);
      run(core.global.uploadImagePREVIEW);
      run(core.global.herbDELETE);
      break;
  }
}

///////////////////////////////////// Code execution and execution order control
//------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  recCurrPage();
  globalInit();
});
