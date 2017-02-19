/////////////////////////////////////////////////////// initialization functions
//------------------------------------------------------------------------------
function globalInit() {
  // run(init.global.storageVariablesINIT);
  // run(init.global.flashNotice);
  // run(init.global.elementINIT);
  // run(core.global.navINT);

  switch (p.Current) {
    case 'landingPAGE':
      run(init.desktop.landingButtonsAroundCircleINIT);
      // run(core.desktop.landingButtonsANIM)
    break;
  }
}

function desktop() {
  switch (p.Current) {

  }
}

function mobileA() {
  switch (p.Current) {
  }
}
