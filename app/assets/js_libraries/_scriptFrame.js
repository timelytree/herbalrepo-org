////////////////////////////////////////////////////////////////////// Framework
//------------------------------------------------------------------------------
// Get a single DOM element by its id or multiple elements by class name
function E(id) { return document.getElementById(id); }
function cE(className) { return document.getElementsByClassName(className); }
function tE(tagName) { return document.getElementsByTagName(tagName); }
// Create an element, assign class, id, and style attributes, and then return that element
function gE(type, className, id, style) {
  var element = document.createElement(type);
  var attributes = [['class', className], ['id', id], ['style', style]];
  for ( i = 0; i < 3; i++ ) { element.setAttribute(attributes[i][0], attributes[i][1]) } return element; }
// Dimensions of the inner window (width and height)
var w = {};
function getWindowDimensions() { w['Height'] = window.innerHeight; w['Width'] = window.innerWidth; }
// Check to see if jQuery is present, used for properly calling VelocityJS
function jqueryVelocityCheck() { if (window.jQuery) { Velocity = $.Velocity; } else { Velocity = Velocity; } }
// Remove all children of a specific element
function removeAllElements(element) { while (element.firstChild) { element.removeChild(element.firstChild); } }
// Record the current page according to the ID tagged onto the .wrapper div found on each page and store it in a hash
var p = {}; function recCurrPage() { p['Current'] = cE('wrapper')[0].id; }
// Add and Remove a class from an item
function addC(item, className) { item.classList.add(className) }
function remC(item, className) { item.classList.remove(className) }
// Adds and Removes a class with a time-delay
function delayAddC(item, className, delay) { var timeout = window.setTimeout(function() { addC(item, className); }, delay); }
function delayRemC(item, className, delay) { var timeout = window.setTimeout(function() { remC(item, className); }, delay); }
// Run BOTH e.preventDefault and e.stopPropagation
function stopE(e) { e.stopPropagation; e.preventDefault; }
// Get/Set attributes prefixed with 'data'
function gA(item, att) { return item.getAttribute('data-'+att+''); }
function sA(item, attName, att) { item.setAttribute('data-'+attName+'', att); }
// Run a function within scriptInit.js using the global window object
function run(func, params) { window[func](params); }
// Force an event to fire
function fireEvent(element, event) {
  if (document.createEventObject) {
    // dispatch for IE
    var evt = document.createEventObject();
    return element.fireEvent('on'+event,evt)
  }
  else{
    // dispatch for firefox + others
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
  }
}
