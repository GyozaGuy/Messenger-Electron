'use strict';

const IPC = require('electron').ipcRenderer;
const NativeNotification = Notification;

Notification = function(title, options) {
  const notification = new NativeNotification(title, options);

  IPC.send('change-icon');

  notification.addEventListener('click', () => {
    IPC.send('notification-click');
  });

  return notification;
};

Notification.prototype = NativeNotification.prototype;
Notification.permission = NativeNotification.permission;
Notification.requestPermission = NativeNotification.requestPermission.bind(Notification);

IPC.on('loaded', () => {
  var chatbox = document.getElementsByClassName('_54-z')[0];
  chatbox.innerHTML = '';
  chatbox.onkeypress = function(e) {
    if (e.keyCode == 13) {
      chatbox.innerHTML = '';
    }
  };
});
