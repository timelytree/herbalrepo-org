/////////////////////////////////////////////////////////////////// function key
var init = {
  global: {
    ajaxSetup: 'ajaxSetup',
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
    navINT: 'navINT'
  },
  desktop: {
    herbPanelINT: 'herbPanelINT',
    populateHerbPanel: 'populateHerbPanel',
    herbCreatePanelTOGGLE: 'herbCreatePanelTOGGLE',
    herbEditPanelTOGGLE: 'herbEditPanelTOGGLE'
  },
  mobile: {
  }
}

//////////////////////////////////////////////////// temporary storage variables
//------------------------------------------------------------------------------


///////////////////////////////////////////////////////////////// init functions
//------------------------------------------------------------------------------
function ajaxSetup() {
  $.ajaxSetup({ headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') } });
}

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

  // if (notice && !flash) {
  //   flash = true; delayAddC(e.notice, 'activeFlashNotice', 400);
  //   interval = window.setInterval(function() {
  //     if (num === 0) { remC(e.notice, 'activeFlashNotice'); flash = true; clearInterval(interval); return false; }
  //     else {
  //       addC(e.countdown[i], 'inactive');
  //       if (i !== 2) { remC(e.countdown[(i+1)], 'hidden'); }
  //       i = (i + 1); num = num - 1;
  //     }
  //   }, 1000);
  // }
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

function herbPanelINT() {
  var herbs = cE('herbITEM'),
      panel = E('herbPANEL');

  function togglePANEL(stat) {
    switch (stat) {
      case 'on': addC(panel, 'activeHerbPANEL'); break;
      case 'off': remC(panel, 'activeHerbPANEL'); break;
    }
  }

  for (var i = 0; i < herbs.length; i++) {
    herbs[i].onclick = function() {
      var id = gA(this, 'id');
      $.ajax({
        url: '/herbs/'+id+'',
        type: 'get',
        success: function(data) {
          togglePANEL('on');
          run(core.desktop.populateHerbPanel, data);
        }
      });
    }
  }

  panel.onclick = function() {
    // togglePANEL('off');
  }
}

function populateHerbPanel(data) {
  var rightPANEL = E('rightPANEL'),
      herbPANEL = E('herbPANEL'),
      nameFIELD = E('editNameFIELD'),
      editHerbB = E('editHerbB'),
      id = E('editHerbID'),
      latinNameFIELD = E('editLatinNameFIELD'),
      generalDescriptionTEXTAREA = E('editGeneralDescriptionTEXTAREA'),
      teaDosageAmountFIELD = E('editTeaDosageAmountFIELD'),
      teaSteepTimeFIELD = E('editTeaSteepTimeFIELD'),
      teaSteepTemperatureFIELD = E('editTeaSteepTemperatureFIELD'),
      teaPreparationTEXTAREA = E('editTeaPreparationTEXTAREA'),
      converter = new showdown.Converter();

  var html = `
    <section>
      <div id="herbNAME">`+data.name+`</div>
      <div id="herbLatinNAME">`+data.latin_name+`</div>
    </section>

    <section id="teaGeneralDESCRIPTION">
      <div class="subtitle">Description</div>
      <div>`+converter.makeHtml(data.general_description)+`</div>
    </section>

    <section id="teaINFO">
      <div class="subtitle">Tea Preparation</div>
      <div id="teaPrepGuide" class="flex-r">
        <div class="teaInfoBOX flex-c">
          <div class="teaInfoTITLE">Dosage Amount</div>
          <div class="teaInfoDATA">`+data.tea_dosage_amount+`</div>
        </div>
        <div class="teaInfoBOX flex-c">
          <div class="teaInfoTITLE">Steep Time</div>
          <div class="teaInfoDATA">`+data.tea_steep_time+`</div>
        </div>
        <div class="teaInfoBOX flex-c">
          <div class="teaInfoTITLE">Steep Temperature</div>
          <div class="teaInfoDATA">`+data.tea_steep_temperature+`</div>
        </div>
      </div>
      <div>`+converter.makeHtml(data.tea_preparation)+`</div>
    </section>
  `
  herbPANEL.innerHTML = html;
  if (editHerbB) {
    addC(rightPANEL, 'active');
    id.value = data.id;
    nameFIELD.value = data.name;
    latinNameFIELD.value = data.latin_name;
    generalDescriptionTEXTAREA.value = data.general_description;
    teaDosageAmountFIELD.value = data.tea_dosage_amount;
    teaSteepTimeFIELD.value = data.tea_steep_time;
    teaSteepTemperatureFIELD.value = data.tea_steep_temperature;
    teaPreparationTEXTAREA.value = data.tea_preparation;
    // herbImageUPLOAD.value = '';
  }
}

function herbCreatePanelTOGGLE() {
  var form = E('newHerbPANEL'),
      newHerbB = E('newHerbB'),
      closeB = E('cancelNewHerbB'),
      nameFIELD = E('newNameFIELD'),
      latinNameFIELD = E('newLatinNameFIELD'),
      generalDescriptionTEXTAREA = E('newGeneralDescriptionTEXTAREA'),
      teaDosageAmountFIELD = E('newTeaDosageAmountFIELD'),
      teaSteepTimeFIELD = E('newTeaSteepTimeFIELD'),
      teaSteepTemperatureFIELD = E('newTeaSteepTemperatureFIELD'),
      teaPreparationTEXTAREA = E('newTeaPreparationTEXTAREA'),
      herbImageUPLOAD = E('newHerbImageUPLOAD'),
      timer = null;

  function toggleFORM(stat) {
    switch (stat) {
      case 'on': addC(form, 'active'); break;
      case 'off': remC(form, 'active'); break;
    }
  }

  if (newHerbB) {
    newHerbB.onclick = function() { toggleFORM('on'); }
    closeB.onclick = function() {
      toggleFORM('off');
      timer = window.setTimeout(function() {
        nameFIELD.value = '';
        latinNameFIELD.value = '';
        generalDescriptionTEXTAREA.value = '';
        teaDosageAmountFIELD.value = '';
        teaSteepTimeFIELD.value = '';
        teaSteepTemperatureFIELD.value = '';
        teaPreparationTEXTAREA.value = '';
        herbImageUPLOAD.value = '';
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
      generalDescriptionTEXTAREA = E('editGeneralDescriptionTEXTAREA'),
      teaDosageAmountFIELD = E('editTeaDosageAmountFIELD'),
      teaSteepTimeFIELD = E('editTeaSteepTimeFIELD'),
      teaSteepTemperatureFIELD = E('editTeaSteepTemperatureFIELD'),
      teaPreparationTEXTAREA = E('editTeaPreparationTEXTAREA');
      herbImageUPLOAD = E('editHerbImageUPLOAD');
      timer = null;

  function toggleFORM(stat) {
    switch (stat) {
      case 'on': addC(form, 'active'); break;
      case 'off': remC(form, 'active'); break;
    }
  }

  if (editHerbB) {
    editHerbB.onclick = function() { toggleFORM('on'); }
    closeB.onclick = function() {
      toggleFORM('off');
      timer = window.setTimeout(function() {
        nameFIELD.value = '';
        latinNameFIELD.value = '';
        generalDescriptionTEXTAREA.value = '';
        teaDosageAmountFIELD.value = '';
        teaSteepTimeFIELD.value = '';
        teaSteepTemperatureFIELD.value = '';
        teaPreparationTEXTAREA.value = '';
        // herbImageUPLOAD.value = '';
        clearTimeout(timer);
      }, 150);
    }
  }
}

function navINT() {
  var buttons = cE('navB'),
      closeB = E('closeB'),
      currPAGE = null;

  function togglePAGE() {

  }

  function togglePAGE(stat) {
    switch (stat) {
      case 'on': addC(currPAGE, 'active'); delayAddC(closeB, 'active', 250); break;
      case 'off': delayRemC(currPAGE, 'active', 150); remC(closeB, 'active'); break;
    }
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      var id = gA(this, 'page'),
          page = E(id);
      currPAGE = page;
      togglePAGE('on');
    }
  }

  closeB.onclick = function() { togglePAGE('off'); }
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
