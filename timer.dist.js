'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  function Timer(cb) {
    _classCallCheck(this, Timer);

    this.cb = cb;
  }

  _createClass(Timer, [{
    key: 'start',
    value: function start(t) {
      var _this = this;

      if (t !== undefined) this.reset(t);
      this.cb(this);
      if (this.tid !== undefined) return;
      this.tid = setInterval(function () {
        _this.cb(_this);
        if (_this.time() < 0) _this.stop();
      }, 1000);
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.tid);
      this.tid = undefined;
    }
  }, {
    key: 'reset',
    value: function reset() {
      var t = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (typeof t === 'string') t = Timer.parse(t);
      this.to = Timer.now(t);
    }
  }, {
    key: 'time',
    value: function time() {
      return this.to - Timer.now();
    }
  }, {
    key: 'toString',
    value: function toString() {
      var t = this.time();
      if (t <= 0) return '00';
      return [t / 3600, t / 60 % 60, t % 60].map(function (t) {
        return 0 | t;
      }).reduce(function (a, t) {
        return (a.length || t) && a.push(t), a;
      }, []).map(function (t) {
        return ('0' + t).slice(-2);
      }).join(':');
    }
  }], [{
    key: 'parse',
    value: function parse(s) {
      var components = s.split(':').map(function (v) {
        return parseInt(v, 10);
      });
      return components.reduceRight(function (t, c, i) {
        return t + Math.pow(60, components.length - i - 1) * c;
      });
    }
  }, {
    key: 'now',
    value: function now() {
      var offset = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return 0 | Date.now() / 1000 + offset;
    }
  }]);

  return Timer;
}();

var param = function param(p) {
  return decodeURI((new RegExp('[#&]' + p + '=([^&]*)').exec(window.location.hash) || [])[1] || '');
};
var input = document.getElementsByTagName('input')[0];
var timer = new Timer(function (t) {
  input.value = t.toString();
});

input.addEventListener('focus', function () {
  return timer.stop();
});
input.addEventListener('blur', function () {
  return timer.start(input.value);
});

input.addEventListener('keypress', function (e) {
  return e.keyIdentifier === 'Enter' && input.blur();
});
document.addEventListener('keypress', function (e) {
  if (e.keyCode !== 32) return;
  e.preventDefault();
  if (input === document.activeElement) {
    input.blur();
  } else {
    input.focus();
    input.select();
  }
});

timer.start(param('t') || 3600);
