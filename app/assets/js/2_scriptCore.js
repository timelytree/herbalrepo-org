/////////////////////////////////////////////////////////////////// function key
var init = {
  global: {
    flashNOTICE: 'flashNOTICE'
  },
  desktop: {
  },
  mobile: {
  }
}

var core = {
  global: {
    loginFormTOGGLE: 'loginFormTOGGLE',
    navINT: 'navINT',
    lazyLoad: 'lazyLoad',
    markdown: 'markdown'
  },
  desktop: {
    populateHerbPanel: 'populateHerbPanel',
    herbCreatePanelTOGGLE: 'herbCreatePanelTOGGLE',
    herbEditPanelTOGGLE: 'herbEditPanelTOGGLE'
  },
  mobile: {
    categoryListANIM: 'categoryListANIM'
  }
}

//////////////////////////////////////////////////// temporary storage variables
//------------------------------------------------------------------------------


///////////////////////////////////////////////////////////////// init functions
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

///////////////////////////////////////////////////////////////// core functions
//------------------------------------------------------------------------------
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
      converter = new showdown.Converter({ disableForced4SpacesIndentedSublists: true }),
      timer = null,
      generalInfoToggleSTAT = false;

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

    informationTEXTAREA.oninput = function() { informationPREVIEW.innerHTML = converter.makeHtml(informationTEXTAREA.value); }
    nameFIELD.oninput = function() { namePREVIEW.innerHTML = nameFIELD.value; }
    latinNameFIELD.oninput = function() { latinNamePREVIEW.innerHTML = latinNameFIELD.value; }

    infoB.onclick = function() { toggleGeneralINFO(); }
    newHerbB.onclick = function() { toggleFORM('on'); }
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
      informationPREVIEW = form.getElementsByClassName('editInformationPREVIEW')[0],
      previewCONTAINER = form.getElementsByClassName('previewCONTAINER')[0],
      namePREVIEW = form.getElementsByClassName('editNamePREVIEW')[0],
      latinNamePREVIEW = form.getElementsByClassName('editLatinNamePREVIEW')[0],
      infoB = form.getElementsByClassName('editInfoB')[0],
      generalINFO = form.getElementsByClassName('formGeneralINFO')[0],
      converter = new showdown.Converter({ disableForced4SpacesIndentedSublists: true }),
      timer = null,
      generalInfoToggleSTAT = false;

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
    var categoryCHECKBOXES = form.getElementsByClassName('categoryCHECKBOX'),
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
    informationPREVIEW.innerHTML = converter.makeHtml(informationTEXTAREA.value);

    informationTEXTAREA.oninput = function() { informationPREVIEW.innerHTML = converter.makeHtml(informationTEXTAREA.value); }
    nameFIELD.oninput = function() { namePREVIEW.innerHTML = nameFIELD.value; }
    latinNameFIELD.oninput = function() { latinNamePREVIEW.innerHTML = latinNameFIELD.value; }

    infoB.onclick = function() { toggleGeneralINFO(); }
    editHerbB.onclick = function() { toggleFORM('on'); }
    closeB.onclick = function() {
      toggleFORM('off');
      timer = window.setTimeout(function() {
        if (generalInfoToggleSTAT) { toggleGeneralINFO(); }
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
      case 'on': addC(leftPANEL, 'active'); break;
      case 'off': remC(leftPANEL, 'active'); break;
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

function lazyLoad() {
  var myLazyLoad = new LazyLoad({
    container: document.getElementById('herbLIST'),
    elements_selector: ".herbIMG",
    callback_set: function(d) { d.style.backgroundSize = 'cover'; }
  });
}

function markdown() {
  var container = E('description'),
      converter = new showdown.Converter({
        disableForced4SpacesIndentedSublists: true
      }),
      text = container.innerHTML,
      html = converter.makeHtml(text);

  container.innerHTML = html;
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
