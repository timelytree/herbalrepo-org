/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.showdownINIT);
  run(core.global.loginFormTOGGLE);
  run(init.global.flashNOTICE);
  // run(core.global.navINT);

  if (E('newHerbPANEL')) { run(core.desktop.herbCreatePanelTOGGLE); }
  switch (p.Current) {
    case 'herbPAGE':
      run(core.desktop.herbEditPanelTOGGLE);
      run(core.mobile.categoryListANIM);
      run(core.global.markdown);
      run(core.global.lazyLoad);
      // run(core.global.categoryHIGHLIGHT)
      break;
    case 'herbIndexPAGE':
      run(core.global.lazyLoad);
      break;
    case 'categoryPAGE':
      run(core.global.lazyLoad);
      // run(core.global.categoryHIGHLIGHT)
      break;
  }
}

function desktop() {
}

function mobile() {
}
