/////////////////////////////////////////////////////// Initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.flashNOTICE);
  switch (p.Current) {
    case 'adminINDEX':
      run(core.global.listFilter, 'adminINDEX');
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
      run(core.global.itemDELETE, 'herbs');
      break;
    case 'adminShowUserHerbs':
      run(core.global.listFilter, 'adminShowUserHerbs');
      break;
    case 'categoryEDIT':
      run(core.global.uploadImagePREVIEW);
      run(core.global.itemDELETE, 'categories');
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
