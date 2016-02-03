'use strict';

var p = function p(_p) {
  return decodeURI((new RegExp('[#&]' + _p + '=([^&]*)').exec(window.location.hash) || [])[1] || '');
};
var e = document.getElementsByTagName('input')[0];
var tid = undefined;
var to = undefined;
var time = function time(t) {
  return 0 | Date.now() / 1000 + (t || 0);
};
var displayTimer = function displayTimer() {
  var t = Math.max(to - time(), 0);
  e.value = [t / 3600, t / 60 % 60, t % 60].map(function (t) {
    return 0 | t;
  }).reduce(function (a, t) {
    return (a.length || t) && a.push(t), a;
  }, []).map(function (t) {
    return ('0' + t).slice(-2);
  }).join(':') || '00';
};
var startTimer = function startTimer() {
  displayTimer();
  tid = setInterval(function () {
    if (to < time()) clearInterval(tid);
    displayTimer();
  }, 1000);
};
e.addEventListener('focus', function () {
  clearInterval(tid);
});
e.addEventListener('blur', function () {
  var t = e.value.split(':').map(function (v) {
    return parseInt(v, 10);
  });
  t = (t.pop() || 0) + (t.pop() || 0) * 60 + (t.pop() || 0) * 3600;
  to = time(t);
  startTimer();
});
to = time(parseInt(p('t'), 10) || 3600);
startTimer();
