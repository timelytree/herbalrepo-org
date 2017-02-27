/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.ajaxSetup);
  run(core.global.loginFormTOGGLE);
  run(init.global.flashNOTICE);
  run(core.global.navINT);
}

function desktop() {
  run(core.desktop.herbPanelINT);
  run(core.desktop.herbCreatePanelTOGGLE);
  run(core.desktop.herbEditPanelTOGGLE);
}

function mobile() {
  switch (p.Current) {
  }
}
