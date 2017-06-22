/////////////////////////////////////////////////////// Initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.flashNOTICE);
  switch (p.Current) {
    case 'herbsINDEX':
      run(core.global.listFilter, 'herbsINDEX');
      break;
    case 'herbNEW':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      run(core.global.nameFILL);
      run(core.global.uploadImagePREVIEW);
      break;
    case 'herbEDIT':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      run(core.global.highlightCATEGORIES);
      run(core.global.nameFILL);
      run(core.global.uploadImagePREVIEW);
      run(core.global.itemDELETE, 'herbs');
      break;
    case 'herbsSHOW':
      run(core.global.listFilter, 'herbsSHOW');
      break;
    case 'categoryEDIT':
      run(core.global.uploadImagePREVIEW);
      run(core.global.itemDELETE, 'categories');
      break;
    case 'categoryNEW':
      run(core.global.uploadImagePREVIEW);
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
