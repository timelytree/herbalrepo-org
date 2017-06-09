/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.flashNOTICE);
  run(core.global.lazyLoad);
  run(core.global.listFilter);
  switch (p.Current) {
    case 'herbPAGE':
      run(core.global.showdownINIT);
      run(core.global.markdown);
      break;
  }
}

function desktop() {
}

function mobile() {
}
