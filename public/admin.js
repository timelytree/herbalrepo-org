////////////////////////////////////////////////////////////////////// Framework
//------------------------------------------------------------------------------
// Get a single DOM element by its id or multiple elements by class name
function E(id) { return document.getElementById(id); }
function cE(className) { return document.getElementsByClassName(className); }
// Create an element, assign class, id, and style attributes, and then return that element
function gE(type, className, id, style) {
  var element = document.createElement(type);
  var attributes = [['class', className], ['id', id], ['style', style]];
  for ( i = 0; i < 3; i++ ) { element.setAttribute(attributes[i][0], attributes[i][1]) } return element; }
// Dimensions of the inner window (width and height)
var w = {};
function getWindowDimensions() { w['Height'] = window.innerHeight; w['Width'] = window.innerWidth; }
// Check to see if jQuery is present, used for properly calling VelocityJS
function jqueryVelocityCheck() { if (window.jQuery) { Velocity = $.Velocity; } else { Velocity = Velocity; } }
// Remove all children of a specific element
function removeAllElements(element) { while (element.firstChild) { element.removeChild(element.firstChild); } }
// Record the current page according to the ID tagged onto the .wrapper div found on each page and store it in a hash
var p = {}; function recCurrPage() { p['Current'] = cE('wrapper')[0].id; }
// Add and Remove a class from an item
function addC(item, className) { item.classList.add(className) }
function remC(item, className) { item.classList.remove(className) }
// Adds and Removes a class with a time-delay
function delayAddC(item, className, delay) { var timeout = window.setTimeout(function() { addC(item, className); }, delay); }
function delayRemC(item, className, delay) { var timeout = window.setTimeout(function() { remC(item, className); }, delay); }
// Run BOTH e.preventDefault and e.stopPropagation
function stopE(e) { e.stopPropagation; e.preventDefault; }
// Get/Set attributes prefixed with 'data'
function gA(item, att) { return item.getAttribute('data-'+att+''); }
function sA(item, attName, att) { item.setAttribute('data-'+attName+'', att); }
// Run a function within scriptInit.js using the global window object
function run(func, params) { window[func](params); }

//////////////////////////////////////////////////////////////////////// scripts
//------------------------------------------------------------------------------
function flashNOTICE() {
  var notice = E('flashNOTICE'),
      countdown = cE('countdown'),
      num = 3,
      flash = false,
      i = 0,
      timer = null;

  if (notice) {
    addC(notice, 'activeFlashNOTICE');
    timer = window.setTimeout(function() {
      remC(notice, 'activeFlashNOTICE');
      clearTimeout(timer);
    }, 2500);
  }
}

function loginFormTOGGLE() {
  var form = E('loginFORM'),
      loginB = E('loginB'),
      closeB = E('cancelLoginB'),
      usernameFIELD = E('usernameFIELD'),
      passwordFIELD = E('passwordFIELD'),
      timer = null;

  function toggleFORM(stat) {
    switch (stat) {
      case 'on': addC(form, 'active'); break;
      case 'off': remC(form, 'active'); break;
    }
  }

  if (loginB) { loginB.onclick = function() { toggleFORM('on'); } }
  closeB.onclick = function() {
    toggleFORM('off');
    timer = window.setTimeout(function() {
      usernameFIELD.value = '';
      passwordFIELD.value = '';
      clearTimeout(timer);
    }, 150);
  }
}

function herbCreatePanelTOGGLE() {
  var form = E('newHerbPANEL'),
      newHerbB = E('newHerbB'),
      closeB = E('cancelNewHerbB'),
      nameFIELD = E('newNameFIELD'),
      latinNameFIELD = E('newLatinNameFIELD'),
      informationTEXTAREA = E('newInformationTEXTAREA'),
      herbImageUPLOAD = E('newHerbImageUPLOAD'),
      previewCONTAINER = form.getElementsByClassName('previewCONTAINER')[0],
      informationPREVIEW = form.getElementsByClassName('newInformationPREVIEW')[0],
      namePREVIEW = form.getElementsByClassName('newNamePREVIEW')[0],
      latinNamePREVIEW = form.getElementsByClassName('newLatinNamePREVIEW')[0],
      infoB = form.getElementsByClassName('newInfoB')[0],
      generalINFO = form.getElementsByClassName('formGeneralINFO')[0],
      draftB = E('draftNewHerbB'),
      draftStatusFIELD = E('newHerbDraftStatus'),
      timer = null,
      generalInfoToggleSTAT = false;

  function toggleDRAFT() {
    var stat = draftStatusFIELD.value;
    switch (stat) {
      case 'live': remC(draftB, 'live'); draftStatusFIELD.value = 'draft'; break;
      case 'draft': addC(draftB, 'live'); draftStatusFIELD.value = 'live'; break;
    }
  }

  function toggleFORM(stat) {
    switch (stat) {
      case 'on': addC(form, 'active'); break;
      case 'off': remC(form, 'active'); break;
    }
  }

  function toggleGeneralINFO() {
    if (!generalInfoToggleSTAT) {
      addC(infoB, 'active');
      addC(generalINFO, 'active');
      generalInfoToggleSTAT = true; }
    else if (generalInfoToggleSTAT) {
      remC(infoB, 'active');
      remC(generalINFO, 'active');
      generalInfoToggleSTAT = false; }
  }

  if (newHerbB) {
    var categoryCHECKBOXES = form.getElementsByClassName('categoryCHECKBOX');

    informationTEXTAREA.oninput = function() { informationPREVIEW.innerHTML = showdownCONVERT.makeHtml(informationTEXTAREA.value); }
    nameFIELD.oninput = function() { namePREVIEW.innerHTML = nameFIELD.value; }
    latinNameFIELD.oninput = function() { latinNamePREVIEW.innerHTML = latinNameFIELD.value; }

    infoB.onclick = function() { toggleGeneralINFO(); }
    newHerbB.onclick = function() { toggleFORM('on'); }

    draftB.onclick = function() { toggleDRAFT(); }

    closeB.onclick = function() {
      toggleFORM('off');
      timer = window.setTimeout(function() {
        if (generalInfoToggleSTAT) { toggleGeneralINFO(); }
        informationTEXTAREA.scrollTop = 0;
        previewCONTAINER.scrollTop = 0;
        nameFIELD.value = '';
        latinNameFIELD.value = '';
        informationTEXTAREA.value = '';
        herbImageUPLOAD.value = '';
        informationPREVIEW.value = '';
        namePREVIEW.value = '';
        latinNamePREVIEW.value = '';
        remC(draftB, 'live');
        draftStatusFIELD.value = 'draft';
        for (var i = 0; i < categoryCHECKBOXES.length; i++) { categoryCHECKBOXES[i].checked = false; }
        clearTimeout(timer);
      }, 150);
    }
  }
}

function herbEditPanelTOGGLE() {
  var form = E('editHerbPANEL'),
      editHerbB = E('editHerbB'),
      closeB = E('cancelEditHerbB'),
      nameFIELD = E('editNameFIELD'),
      latinNameFIELD = E('editLatinNameFIELD'),
      informationTEXTAREA = E('editInformationTEXTAREA'),
      herbImageUPLOAD = E('editHerbImageUPLOAD'),
      timer = null,
      generalInfoToggleSTAT = false,
      draftB = null,
      draftStatusFIELD = null,
      initDraftSTATUS = null;

  function toggleDRAFT(stat) {
    switch (stat) {
      case 'live': remC(draftB, 'live'); sA(draftB, 'status', 'draft'); draftStatusFIELD.value = 'draft'; break;
      case 'draft': addC(draftB, 'live'); sA(draftB, 'status', 'live'); draftStatusFIELD.value = 'live'; break;
    }
  }

  function toggleFORM(stat) {
    switch (stat) {
      case 'on': addC(form, 'active'); break;
      case 'off': remC(form, 'active'); break;
    }
  }

  function toggleGeneralINFO() {
    if (!generalInfoToggleSTAT) {
      addC(infoB, 'active');
      addC(generalINFO, 'active');
      generalInfoToggleSTAT = true; }
    else if (generalInfoToggleSTAT) {
      remC(infoB, 'active');
      remC(generalINFO, 'active');
      generalInfoToggleSTAT = false; }
  }

  if (editHerbB) {
    var informationPREVIEW = form.getElementsByClassName('editInformationPREVIEW')[0],
        previewCONTAINER = form.getElementsByClassName('previewCONTAINER')[0],
        namePREVIEW = form.getElementsByClassName('editNamePREVIEW')[0],
        latinNamePREVIEW = form.getElementsByClassName('editLatinNamePREVIEW')[0],
        infoB = form.getElementsByClassName('editInfoB')[0],
        generalINFO = form.getElementsByClassName('formGeneralINFO')[0],
        categoryCHECKBOXES = form.getElementsByClassName('categoryCHECKBOX'),
        draftB = form.getElementsByClassName('draftB')[0],
        draftStatusFIELD = E('editHerbDraftStatus'),
        initDraftSTATUS = draftStatusFIELD.value;
        categories = JSON.parse(gA(E('herbPANEL'), 'categories'));

    for (var i = 0; i < categories.length; i++) {
      var num = categories[i];
      for (var j = 0; j < categoryCHECKBOXES.length; j++) {
        var checkbox = categoryCHECKBOXES[j],
            id = gA(categoryCHECKBOXES[j], 'id');
        if (id == num) { checkbox.checked = true; }
      }
    }

    namePREVIEW.innerHTML = nameFIELD.value;
    latinNamePREVIEW.innerHTML = latinNameFIELD.value;
    informationPREVIEW.innerHTML = showdownCONVERT.makeHtml(informationTEXTAREA.value);

    informationTEXTAREA.oninput = function() { informationPREVIEW.innerHTML = showdownCONVERT.makeHtml(informationTEXTAREA.value); }
    nameFIELD.oninput = function() { namePREVIEW.innerHTML = nameFIELD.value; }
    latinNameFIELD.oninput = function() { latinNamePREVIEW.innerHTML = latinNameFIELD.value; }

    infoB.onclick = function() { toggleGeneralINFO(); }
    editHerbB.onclick = function() { toggleFORM('on'); }

    draftB.onclick = function() {
      var status = gA(this, 'status');
      toggleDRAFT(status);
    }

    closeB.onclick = function() {
      toggleFORM('off');
      timer = window.setTimeout(function() {
        if (generalInfoToggleSTAT) { toggleGeneralINFO(); }
        if (initDraftSTATUS == 'live') { toggleDRAFT('draft'); }
        else if (initDraftSTATUS == 'draft') { toggleDRAFT('live'); }
        informationTEXTAREA.scrollTop = 0;
        previewCONTAINER.scrollTop = 0;
        clearTimeout(timer);
      }, 150);
    }
  }
}

function navINT() {
  var buttons = cE('navB'),
      closeB = E('closeB'),
      currPAGE = null;

  function togglePAGE(stat) {
    switch (stat) {
      case 'on': addC(currPAGE, 'active'); delayAddC(closeB, 'active', 250); break;
      case 'off': delayRemC(currPAGE, 'active', 150); remC(closeB, 'active'); break;
    }
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      var id = gA(this, 'page');
      if (id != null) {
        currPAGE = E(id);
        togglePAGE('on');
      }
    }
  }

  closeB.onclick = function() { togglePAGE('off'); }
}

function categoryListANIM() {
  var leftPANEL = E('leftPANEL'),
      rightPANEL = E('rightPANEL'),
      button = E('categoryListTOGGLE'),
      panelSTAT = false;

  function togglePAGE(stat) {
    switch (stat) {
      case 'on': addC(leftPANEL, 'active'); addC(button, 'active'); break;
      case 'off': remC(leftPANEL, 'active'); remC(button, 'active'); break;
    }
  }

  button.onclick = function() {
    if (!panelSTAT) { togglePAGE('on'); panelSTAT = true; }
    else if (panelSTAT) { togglePAGE('off'); panelSTAT = false; }
  }

  var timer = window.setTimeout(function() {
    addC(rightPANEL, 'active'); clearTimeout(timer);
  }, 600);
}
