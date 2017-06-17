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
    herbDELETE: 'herbDELETE'
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

function listFilter() {
  var options = {
    valueNames: ['herbName', 'herbLatinName']
  };
  var hackerList = new List('herbLIST', options);
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
  var input = E('thumbnail'),
      previewCONTAINER = E('imagePreviewCONTAINER');

  function displayIMG(input) {
    var reader = new FileReader();
    if (input.files && input.files[0]) {
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          previewCONTAINER.setAttribute('src', e.target.result);
          addC(previewCONTAINER, 'active');
        }
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  input.onchange = function() { displayIMG(this); }
}

function herbDELETE() {
  var button = E('deleteB');
  deleteB.onclick = function() {
    $.ajax({
      url: '/herbs/'+gA(this, 'slug')+'',
      type: 'DELETE',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(response) {
        window.location.href = '/admin';
      }
    });
  }
}



















//
