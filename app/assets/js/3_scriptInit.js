/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.ajaxSetup);
  run(core.global.loginFormTOGGLE);
  run(init.global.flashNOTICE);
  run(core.global.navINT);
  run(core.desktop.herbCreatePanelTOGGLE);

  switch (p.Current) {
    case 'herbPAGE':
      run(core.global.herbPanelINT);
      run(core.desktop.herbEditPanelTOGGLE);
      run(core.global.backToHomeANIM);
      break;
  }
}

function desktop() {
}

function mobile() {
}
