/////////////////////////////////////////////////////////////////// function key
// birch / baobab / oak / aspen / cherry / apricot / sycamore / redwood
// teatree / beech / willow
// everest / denali / logan / fairweather / hubbard / elias / kilimanjaro / augusta
// grays / blanca / crestone / capitol

// sycamore
var init = {
  global: {
  },
  desktop: {
    landingButtonsAroundCircleINIT: 'landingButtonsAroundCircleINIT'
  },
  mobileA: { }
}

var core = {
  global: {
  },
  desktop: {
    landingButtonsANIM: 'landingButtonsANIM'
  },
  mobileA: {
  }
}

var ajax = { }

//////////////////////////////////////////////////// temporary storage variables
//------------------------------------------------------------------------------
function apricot() {

}

///////////////////////////////////////////////////////////////// init functions
//------------------------------------------------------------------------------
function landingButtonsAroundCircleINIT() {
  var radius = 250, // radius of the circle
      buttons = cE('layer'),
      container = E('landingButtons'),
      width = container.clientWidth, height = container.clientHeight,
      angle = 0, step = (2*Math.PI) / buttons.length;

  for (var i = 0; i < buttons.length; i++) {
    var x = Math.round(width/2 + radius * Math.cos(angle) - buttons[i].clientWidth/2),
        y = Math.round(height/2 + radius * Math.sin(angle) - buttons[i].clientHeight/2);

    buttons[i].style.left = ''+x+'px';
    buttons[i].style.top = ''+y+'px';
    angle += step;
  }
}

function landingButtonsANIM() {
  var buttons = cE('layer'),
      timeout = null,
      x = w.Width/2,
      y = w.Height/2;
      // z = 20;

  function moveButtons(pageX, pageY) {
    for (var i = 0; i < buttons.length; i++) {
      var z = gA(buttons[i], 'x') * 100,
          h = Math.round(((pageX - x) / x)*z),
          v = Math.round(((pageY - y) / y)*z);
      if ((pageX < x) && (pageY < y)) { buttons[i].style.transform = 'translate('+Math.abs(h)+'px, '+Math.abs(v)+'px)'; }
      if ((pageX > x) && (pageY < y)) { buttons[i].style.transform = 'translate(-'+h+'px, '+Math.abs(v)+'px)'; }
      if ((pageX < x) && (pageY > y)) { buttons[i].style.transform = 'translate('+Math.abs(h)+'px, -'+v+'px)'; }
      if ((pageX > x) && (pageY > y)) { buttons[i].style.transform = 'translate(-'+h+'px, -'+v+'px)'; }
    }
  }

  document.onmousemove = function(e) {
    if (timeout) { return false; }
    else {
      timeout = window.setTimeout(function() {
        var pageX = e.pageX, pageY = e.pageY;
        if (pageX === undefined) {
          pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; }
        else {
          moveButtons(pageX, pageY);
        }
        clearTimeout(timeout); timeout = null;
      }, 20);
    }
  }
}

///////////////////////////////////////////////////////////////// core functions
//------------------------------------------------------------------------------

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
