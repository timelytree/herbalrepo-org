/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(core.global.loginFormTOGGLE);
  run(init.global.flashNOTICE);
  run(core.global.navINT);
  run(core.global.lazyLoad);
  if (E('newHerbPANEL')) { run(core.desktop.herbCreatePanelTOGGLE); }
  switch (p.Current) {
    case 'categoryPAGE':
      break;
    case 'herbPAGE':
      run(core.desktop.herbEditPanelTOGGLE);
      run(core.mobile.categoryListANIM);
      break;
    case 'herbIndexPAGE':
      break;
  }
}

function desktop() {
}

function mobile() {
}
