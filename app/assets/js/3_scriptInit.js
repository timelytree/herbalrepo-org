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
