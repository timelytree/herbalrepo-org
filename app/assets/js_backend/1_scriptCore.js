//////////////////////////////////////////////////////////// Initialization list
//------------------------------------------------------------------------------
var core = {
  global: {
    flashNOTICE: 'flashNOTICE',
    listFilter: 'listFilter',
    showdownINIT: 'showdownINIT',
    markdown: 'markdown',
    highlightCATEGORIES: 'highlightCATEGORIES',
    nameFILL: 'nameFILL',
    uploadImagePREVIEW: 'uploadImagePREVIEW',
    itemDELETE: 'itemDELETE'
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
    delayAddC(notice, 'active', 250);
    timer = window.setTimeout(function() {
      remC(notice, 'active');
      clearTimeout(timer);
    }, 3000);
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

function listFilter(page) {
  var options = {
    valueNames: ['herbName', 'herbLatinName']
  };
  var hackerList = new List(page, options);
}

function markdown() {
  var textarea = E('leftPANEL').getElementsByTagName('textarea')[0],
      previewTEXT = E('previewTEXT'),
      text = textarea.innerHTML,
      html = showdownCONVERT.makeHtml(text);

  previewTEXT.innerHTML = html;
  textarea.oninput = function() { previewTEXT.innerHTML = showdownCONVERT.makeHtml(textarea.value); }
}

function highlightCATEGORIES() {
  categoryCHECKBOXES = cE('checkbox'),
  categories = JSON.parse(gA(cE('checkboxCONTAINER')[0], 'categories'));

  for (var i = 0; i < categories.length; i++) {
    var num = categories[i];
    for (var j = 0; j < categoryCHECKBOXES.length; j++) {
      var checkbox = categoryCHECKBOXES[j],
          id = gA(categoryCHECKBOXES[j], 'id');
      if (id == num) { checkbox.checked = true; }
    }
  }
}

function nameFILL() {
  var nameINPUT = E('name'),
      namePREVIEW = E('previewNAME'),
      sciNameINPUT = E('latin_name'),
      sciNamePREVIEW = E('previewSciNAME');

  if (nameINPUT.value != '') { namePREVIEW.innerHTML = nameINPUT.value; }
  else { namePREVIEW.innerHTML = nameINPUT.placeholder; }

  if (sciNameINPUT.value != '') { sciNamePREVIEW.innerHTML = sciNameINPUT.value; }
  else { sciNamePREVIEW.innerHTML = sciNameINPUT.placeholder; }

  nameINPUT.oninput = function() { namePREVIEW.innerHTML = nameINPUT.value; }
  sciNameINPUT.oninput = function() { sciNamePREVIEW.innerHTML = sciNameINPUT.value; }
}

function uploadImagePREVIEW() {
  var inputs = document.querySelectorAll("input[type=file]"),
      previews = cE('imagePreviewCONTAINER');

  function displayIMG(input, num) {
    var reader = new FileReader(),
        preview = previews[num];
    if (input.files && input.files[0]) {
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          preview.setAttribute('src', e.target.result);
          addC(preview, 'active');
        }
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onchange = function() {
      var num = gA(this, 'num');
      displayIMG(this, num);
    }
  }
}

function itemDELETE(controller) {
  var deleteB = E('deleteB'),
      warningB = E('warningB'),
      loadingCONTAINER = cE('loading')[0],
      cancelWarningB = E('cancelWarningB'),
      warningCONTAINER = cE('warning')[0];

  warningB.onclick = function() { addC(warningCONTAINER, 'active'); }
  cancelWarningB.onclick = function() { remC(warningCONTAINER, 'active'); }

  deleteB.onclick = function() {
    addC(loadingCONTAINER, 'active');
    $.ajax({
      url: '/'+controller+'/'+gA(this, 'slug')+'',
      type: 'DELETE',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(response) {
        window.location.href = '/admin/'+controller+'';
      }
    });
  }
}



















//
