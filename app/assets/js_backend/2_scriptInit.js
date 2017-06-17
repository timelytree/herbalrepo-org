/////////////////////////////////////////////////////// Initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.flashNOTICE);
  run(core.global.listFilter);
  switch (p.Current) {
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
      run(core.global.formDELETE);
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
