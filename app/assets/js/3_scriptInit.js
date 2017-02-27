/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.ajaxSetup);
  run(core.global.loginFormTOGGLE);
  run(init.global.flashNOTICE);
  run(core.global.navINT);
  run(core.global.herbPanelINT);
}

function desktop() {

  run(core.desktop.herbCreatePanelTOGGLE);
  run(core.desktop.herbEditPanelTOGGLE);
}

function mobile() {
}
