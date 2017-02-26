/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  run(init.global.ajaxSetup);
  run(core.global.loginFormINT);
  run(init.global.flashNOTICE);
}

function desktop() {
  run(core.desktop.herbPanelINT);
  switch (p.Current) {
  }
}

function mobile() {
  switch (p.Current) {
  }
}
