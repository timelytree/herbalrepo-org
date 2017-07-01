/////////////////////////////////////////////////////////////////// function key
var init = {
  global: {
  },
  desktop: {
  },
  mobile: {
  }
}

var core = {
  global: {
    showdownINIT: 'showdownINIT',
    lazyLoad: 'lazyLoad',
    markdown: 'markdown',
    searchAllHerbs: 'searchAllHerbs',
    categoriesNavINT: 'categoriesNavINT'
  },
  desktop: {
  },
  mobile: {
    menuINT: 'menuINT'
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
  var herbLIST = E('herbLIST');

  new LazyLoad({
    container: herbLIST,
    elements_selector: ".herbIMG",
    callback_set: function(d) { d.style.backgroundSize = 'cover'; }
  });
}

function markdown() {
  var container = E('info'),
      text = container.innerHTML,
      html = showdownCONVERT.makeHtml(text);

  container.innerHTML = html;
}

function searchAllHerbs(pageID) {
  var input = E('searchBAR'),
      wrapper = cE('wrapper')[0],
      closeB = E('herbSearchCloseB'),
      categoriesCONTAINER = E('categories'),
      categoryTiles = cE('categoryTILE'),
      categorySTAT = false;

  var categoriesLIST = JSON.parse(gA(categoriesCONTAINER, 'categories')),
      searchLIST = ['herbName', 'herbLatinName'].concat(categoriesLIST);

  var list = new List(pageID, options = {
    valueNames: searchLIST
  });

  function clear() {
    for (var i = 0; i < categoryTiles.length; i++) { remC(categoryTiles[i], 'active'); }
    categorySTAT = false;
  }

  input.onfocus = function() { addC(wrapper, 'active'); }

  herbSearchCloseB.onclick = function() {
    input.value = '';
    remC(wrapper, 'active');
    var timer = window.setTimeout(function() {
      list.search();
      clear();
      clearTimeout(timer);
    }, 200);
  }

  input.oninput = function() {
    var text = this.value;
    list.search(text);
    if (categorySTAT) { clear(); }
  }

  for (var i = 0; i < categoryTiles.length; i++) {
    categoryTiles[i].onclick = function() {
      var name = gA(this, 'name');
      clear();
      categorySTAT = true;
      addC(this, 'active');
      input.focus();
      input.value = name;
      list.search(name);
    }
  }

}

function categoriesNavINT() {
  // var closeB = E('categoriesNavCloseB'),
  //     container = E('categories');
}

/////////////////////////////////////////////////////////////// mobile functions
//------------------------------------------------------------------------------
// function menuINT() {
//   var menuB = E('menuB'),
//       nav = E('nav'),
//       stat = false;
//
//   menuB.onclick = function() {
//     if (!stat) {
//       addC(nav, 'active');
//       stat = true;
//     } else {
//       remC(nav, 'active');
//       stat = false;
//     }
//   }
// }















//
