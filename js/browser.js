'use strict';

var ipc = require('electron').ipcRenderer;
var NativeNotification = Notification;

function fixChatBoxSize() {
  console.log('started event stuff');
  // var box = document.getElementsByClassName('_209g')[0];
  // box.firstChild.innerHTML = '<br data-text="true">';
  // console.log(chatbox);
  // var eventObj = document.createEvent('Events');
  // console.log(eventObj);
  // if (eventObj) {
  //   eventObj.initEvent('keydown', true, true);
  // }
  // eventObj.keyCode = 8;
  // eventObj.which = 8;
  // console.log(chatbox.dispatchEvent(eventObj));
  var box = document.getElementsByClassName('_54-z')[0];
  var Podium = {};
  Podium.keydown = function(k) {
    console.log('in Podium');
    var newEvent = document.createEvent('KeyboardEvent');
    Object.defineProperty(newEvent, 'keyCode', {
      get : function() {
        return this.keyCodeVal;
      }
    });
    Object.defineProperty(newEvent, 'which', {
      get : function() {
        return this.keyCodeVal;
      }
    });
    newEvent.initKeyboardEvent('keydown', true, true, document.defaultView, false, false, false, false, k, k);
    newEvent.keyCodeVal = k;
    if (newEvent.keyCode !== k) {
      console.log('keyCode mismatch ' + newEvent.keyCode + '(' + newEvent.which + ')');
    }
    console.log('dispatching...');
    console.log(newEvent.keyCode);
    box.dispatchEvent(newEvent);
    console.log('dispatched');
  }
  Podium.keydown(8);
  console.log('passed event stuff');
}

Notification = (title, options) => {
  var notification = new NativeNotification(title, options);

  ipc.send('change-icon');

  notification.addEventListener('click', () => {
    ipc.send('notification-click');
  });

  return notification;
};

Notification.prototype = NativeNotification.prototype;
Notification.permission = NativeNotification.permission;
Notification.requestPermission = NativeNotification.requestPermission.bind(Notification);

ipc.on('loaded', () => {
  // fixChatBoxSize();
  var chatbox = document.getElementsByClassName('_54-z')[0];
  chatbox.onkeypress = (e) => {
    if (e.keyCode == 13) {
      fixChatBoxSize();
    }
  };
  // var subchatbox = document.getElementsByClassName('_209g')[0].firstChild;
  // console.log(subchatbox);
  // subchatbox.onkeypress = (e) => {
  //   console.log(e.keyCode);
  // };
});
