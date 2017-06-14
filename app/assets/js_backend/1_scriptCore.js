//////////////////////////////////////////////////////////// Initialization list
//------------------------------------------------------------------------------
var core = {
  global: {
    flashNOTICE: 'flashNOTICE',
    listFilter: 'listFilter',
    showdownINIT: 'showdownINIT',
    markdown: 'markdown',
    highlightCATEGORIES: 'highlightCATEGORIES'
  }
}

///////////////////////////////////////////////////////////////// Core functions
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

function listFilter() {
  var options = {
    valueNames: ['herbName', 'herbLatinName']
  };
  var hackerList = new List('herbLIST', options);
}

function markdown() {
  var leftPANEL = E('leftPANEL'),
      rightPANEL = E('rightPANEL'),
      text = leftPANEL.innerHTML,
      html = showdownCONVERT.makeHtml(text);

  rightPANEL.innerHTML = html;
  leftPANEL.oninput = function() { rightPANEL.innerHTML = showdownCONVERT.makeHtml(leftPANEL.value); }
}

function highlightCATEGORIES() {
  categoryCHECKBOXES = cE('checkbox'),
  categories = JSON.parse(gA(cE('categoriesBOX')[0], 'categories'));

  for (var i = 0; i < categories.length; i++) {
    var num = categories[i];
    for (var j = 0; j < categoryCHECKBOXES.length; j++) {
      var checkbox = categoryCHECKBOXES[j],
          id = gA(categoryCHECKBOXES[j], 'id');
      if (id == num) { checkbox.checked = true; }
    }
  }
}















//
