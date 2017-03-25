/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.showdownINIT);
  run(core.global.loginFormTOGGLE);
  run(init.global.flashNOTICE);
  run(core.global.navINT);
  run(core.global.lazyLoad);
  if (E('newHerbPANEL')) { run(core.desktop.herbCreatePanelTOGGLE); }
  switch (p.Current) {
    case 'herbPAGE':
      run(core.desktop.herbEditPanelTOGGLE);
      run(core.mobile.categoryListANIM);
      run(core.global.markdown);
      // run(core.global.categoryHIGHLIGHT)
      break;
    case 'categoryPAGE':
      // run(core.global.categoryHIGHLIGHT)
    break;
  }
}

function desktop() {
}

function mobile() {
}
