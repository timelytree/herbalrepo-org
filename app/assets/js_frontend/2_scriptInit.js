//////////////////////////////////// Code execution and execution order control
//-----------------------------------------------------------------------------
function Engange() {
  switch (p.Current) {
    case 'herbIndexPAGE':
      run(func.lazyLoad);
      run(func.searchAllHerbs, 'herbIndexPAGE');
      break;
    case 'herbShowPAGE':
      run(func.lazyLoad);
      run(func.searchAllHerbs, 'herbShowPAGE');
      run(func.showdownINIT);
      run(func.markdown);
      run(func.sectionTOGGLE);
      break;
    case 'aboutPAGE':
      run(func.lazyLoad);
      run(func.searchAllHerbs, 'aboutPAGE');
      break;
  }
}

////////////////////////////////////////////////////////////////////////// Init
//-----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  getWindowDimensions();
  recCurrPage();
  Engange();
});
