'use strict';

var p = function p(_p) {
  return decodeURI((new RegExp('[#&]' + _p + '=([^&]*)').exec(window.location.hash) || [])[1] || '');
};
var t = p('t') || 3600;
var e = document.getElementsByTagName('input')[0];
var tid = undefined;
var displayTimer = function displayTimer() {
  e.value = [t / 3600, t / 60 % 60, t % 60].map(function (t) {
    return 0 | t;
  }).reduce(function (a, t) {
    return (a.length || t) && a.push(t), a;
  }, []).map(function (t) {
    return ('0' + t).slice(-2);
  }).join(':') || '00';
};
var startTimer = function startTimer() {
  tid = setInterval(function () {
    --t < 1 && clearInterval(tid);
    displayTimer();
  }, 1000);
};
e.addEventListener('focus', function () {
  clearInterval(tid);
});
e.addEventListener('blur', function () {
  t = e.value.split(':').map(function (v) {
    return parseInt(v, 10);
  });
  t = (t.pop() || 0) + (t.pop() || 0) * 60 + (t.pop() || 0) * 3600;
  startTimer();
});
displayTimer();
startTimer();
