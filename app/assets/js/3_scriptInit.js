/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.flashNOTICE);
  run(core.global.headerAnimOnSCROLL);
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
