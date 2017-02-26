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
    loginFormINT: 'loginFormINT'
  },
  desktop: {
    herbPanelINT: 'herbPanelINT',
    populateHerbPanel: 'populateHerbPanel'
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
function loginFormINT() {
  var form = E('loginFORM'),
      loginB = E('loginB'),
      closeB = E('cancelLoginB'),
      usernameFIELD = E('usernameFIELD'),
      passwordFIELD = E('passwordFIELD'),
      timer = null;

  function toggleFORM(stat) {
    switch (stat) {
      case 'on': addC(form, 'activeLoginFORM'); break;
      case 'off': remC(form, 'activeLoginFORM'); break;
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
  var  panel = E('herbPANEL');

  var html = `
    <section>
      <div id="herbNAME">`+data.name+`</div>
      <div id="herbLatinNAME">`+data.latin_name+`</div>
    </section>

    <section id="teaGeneralDESCRIPTION">
      <div class="subtitle">Description</div>
      <div>`+data.general_description+`</div>
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
      <div>`+data.tea_preparation+`</div>
    </section>

    <section>

    </section>

    <section>

    </section>
  `

  panel.innerHTML = html;
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
