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
    showdownINIT: 'showdownINIT',
    loginFormTOGGLE: 'loginFormTOGGLE',
    navINT: 'navINT',
    lazyLoad: 'lazyLoad',
    markdown: 'markdown',
    listFilter: 'listFilter'
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
function showdownINIT() {
  showdown.extension('divClass', function () {
    var x = 0;
    var ext = {
      type: 'lang',
      filter: function(text, converter, options) {
        var classNAMES = text.match(/\[(.*)--]/g),
            newText = text;
        if ((x < 3) && (classNAMES != null)) {
          ++x;
          for (var i = 0; i < classNAMES.length; i++) {
            var classNAME = classNAMES[i].match(/\[(.*)--]/)[1];
            if (classNAME != '') {
              var regex = new RegExp("\\["+classNAME+"--]([\\s\\S]*)\\[--"+classNAME+"]"),
                  textSPLIT = newText.match(regex);
              if (textSPLIT != null) {
                var textSNIPPET = textSPLIT[1],
                    html = showdownCONVERT.makeHtml(textSNIPPET);
                newText = newText.replace(regex, '<div class="'+classNAME+'">'+html+'</div>');
              }
            }
          }
        }
        x = 0;
        return newText;
      }
    };
    return [ext];
  });

  showdownCONVERT = new showdown.Converter({
    extensions: ['divClass'],
    disableForced4SpacesIndentedSublists: true
  });
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
      text = container.innerHTML,
      html = showdownCONVERT.makeHtml(text);

  container.innerHTML = html;
}

function listFilter() {
  var options = {
    valueNames: ['herbName', 'herbLatinName']
  };

  var hackerList = new List('herbLIST', options);
}




















//
