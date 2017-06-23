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
      run(core.global.itemACTION, 'herbs'); // delete or save Herb or Category
      break;
    case 'herbEDIT':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      run(core.global.highlightCATEGORIES);
      run(core.global.nameFILL);
      run(core.global.uploadImagePREVIEW);
      run(core.global.itemACTION, 'herbs'); // delete or save Herb or Category
      break;
    case 'herbsSHOW':
      run(core.global.listFilter, 'herbsSHOW');
      break;
    case 'categoryEDIT':
      run(core.global.uploadImagePREVIEW);
      run(core.global.itemACTION, 'categories'); // delete or save Herb or Category
      break;
    case 'categoryNEW':
      run(core.global.uploadImagePREVIEW);
      run(core.global.itemACTION, 'herbs'); // delete or save Herb or Category
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
