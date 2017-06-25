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
    loginFormTOGGLE: 'loginFormTOGGLE',
    navINT: 'navINT',
    lazyLoad: 'lazyLoad',
    markdown: 'markdown',
    listFilter: 'listFilter',
    headerAnimOnSCROLL: 'headerAnimOnSCROLL'
  },
  desktop: {
    populateHerbPanel: 'populateHerbPanel',
    herbCreatePanelTOGGLE: 'herbCreatePanelTOGGLE',
    herbEditPanelTOGGLE: 'herbEditPanelTOGGLE'
  },
  mobile: {
    categoryListANIM: 'categoryListANIM',
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
  var myLazyLoad = new LazyLoad({
    container: document.getElementById('herbLIST'),
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

function listFilter() {
  var options = {
    valueNames: ['herbName', 'herbLatinName']
  };

  var hackerList = new List('herbLIST', options);
}

function headerAnimOnSCROLL() {
  var cons = cE('console')[0],
      wrapper = cE('wrapper')[0],
      stat = false;

  function debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  var myEfficientFn = debounce(function() {
    if ((!stat) && (cons.scrollTop > 50)) {
      addC(wrapper, 'minimized');
      stat = true;
    } else if ((stat) && (cons.scrollTop < 50)) {
      remC(wrapper, 'minimized');
      stat = false;
    }
  }, 20);

  cons.onscroll = myEfficientFn;
}

/////////////////////////////////////////////////////////////// mobile functions
//------------------------------------------------------------------------------
function menuINT() {
  var menuB = E('menuB'),
      nav = E('nav'),
      stat = false;

  menuB.onclick = function() {
    if (!stat) {
      addC(nav, 'active');
      stat = true;
    } else {
      remC(nav, 'active');
      stat = false;
    }
  }
}















//
