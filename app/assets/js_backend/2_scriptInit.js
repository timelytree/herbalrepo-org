//////////////////////////////////// Code execution and execution order control
//-----------------------------------------------------------------------------
function Engage() {
  run(func.flashNOTICE);
  switch (p.Current) {
    case 'herbsINDEX':
      run(func.listFilter, 'herbsINDEX');
      break;
    case 'herbNEW':
      run(func.showdownINIT);
      run(func.markdown);
      run(func.nameFILL);
      run(func.uploadImagePREVIEW);
      run(func.itemACTION, 'herbs'); // delete or save Herb or Category
      run(func.sectionTOGGLE);
      break;
    case 'herbEDIT':
      run(func.showdownINIT);
      run(func.markdown);
      run(func.highlightCATEGORIES);
      run(func.nameFILL);
      run(func.uploadImagePREVIEW);
      run(func.itemACTION, 'herbs'); // delete or save Herb or Category
      run(func.sectionTOGGLE);
      break;
    case 'herbsSHOW':
      run(func.listFilter, 'herbsSHOW');
      break;
    case 'categoryEDIT':
      run(func.uploadImagePREVIEW);
      run(func.itemACTION, 'categories'); // delete or save Herb or Category
      break;
    case 'categoryNEW':
      run(func.uploadImagePREVIEW);
      run(func.itemACTION, 'herbs'); // delete or save Herb or Category
      break;
  }
}

////////////////////////////////////////////////////////////////////////// Init
//-----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  recCurrPage();
  Engage();
});
