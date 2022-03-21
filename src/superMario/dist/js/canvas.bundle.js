/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/img/background.png":
/*!********************************!*\
  !*** ./src/img/background.png ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "072d51bcc9c09311d4c2a6708b05bddc.png");

/***/ }),

/***/ "./src/img/hills.png":
/*!***************************!*\
  !*** ./src/img/hills.png ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "cfffe4c371f5e11d372b398a87c51dd0.png");

/***/ }),

/***/ "./src/img/platform.png":
/*!******************************!*\
  !*** ./src/img/platform.png ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "ffab39d3487de561be1a081fcfb3806d.png");

/***/ }),

/***/ "./src/img/platformSmallTall.png":
/*!***************************************!*\
  !*** ./src/img/platformSmallTall.png ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "0587f9be8e442eb74b2fe283bbf1a947.png");

/***/ }),

/***/ "./src/img/spriteRunLeft.png":
/*!***********************************!*\
  !*** ./src/img/spriteRunLeft.png ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "c67ea51444aafa9bdcd5bdfd4f4a55bb.png");

/***/ }),

/***/ "./src/img/spriteRunRight.png":
/*!************************************!*\
  !*** ./src/img/spriteRunRight.png ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "a2f75989924952a7e49ce0405d487c93.png");

/***/ }),

/***/ "./src/img/spriteStandLeft.png":
/*!*************************************!*\
  !*** ./src/img/spriteStandLeft.png ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "11514f48f22f6d8e3cf748e45e3e1ffb.png");

/***/ }),

/***/ "./src/img/spriteStandRight.png":
/*!**************************************!*\
  !*** ./src/img/spriteStandRight.png ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "01e8f15e899155c68950c40e0a6b8df0.png");

/***/ }),

/***/ "./src/js/GenericObject.js":
/*!*********************************!*\
  !*** ./src/js/GenericObject.js ***!
  \*********************************/
/*! exports provided: GenericObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericObject", function() { return GenericObject; });
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./src/js/Vector.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var GenericObject = /*#__PURE__*/function () {
  function GenericObject(_ref) {
    var x = _ref.x,
        y = _ref.y,
        image = _ref.image;

    _classCallCheck(this, GenericObject);

    this.position = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](x, y);
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  _createClass(GenericObject, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
  }]);

  return GenericObject;
}();

/***/ }),

/***/ "./src/js/Platform.js":
/*!****************************!*\
  !*** ./src/js/Platform.js ***!
  \****************************/
/*! exports provided: Platform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return Platform; });
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./src/js/Vector.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Platform = /*#__PURE__*/function () {
  function Platform(_ref) {
    var x = _ref.x,
        y = _ref.y,
        image = _ref.image;

    _classCallCheck(this, Platform);

    this.position = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](x, y);
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  _createClass(Platform, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
  }]);

  return Platform;
}();

/***/ }),

/***/ "./src/js/Player.js":
/*!**************************!*\
  !*** ./src/js/Player.js ***!
  \**************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./src/js/Vector.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Player = /*#__PURE__*/function () {
  function Player(width, height, image, imageCanvasWidth, imageCanvasHeight) {
    _classCallCheck(this, Player);

    this.speed = 5;
    this.position = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](100, 0);
    this.velocity = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](0, 0);
    this.acceleartion = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](0, 0);
    this.width = width;
    this.height = height;
    this.mass = 3;
    this.imageCanvasWidth = imageCanvasWidth;
    this.imageCanvasHeight = imageCanvasHeight;
    this.frames = 0;
    this.currentImage = image;
    this.cropWidth = 177;
  }

  _createClass(Player, [{
    key: "applyForce",
    value: function applyForce(force) {
      var f = force.div(this.mass);
      this.acceleartion.add(f);
    }
  }, {
    key: "update",
    value: function update() {
      this.frames++;

      if (this.frames > 28) {
        this.frames = 0;
      }

      this.position.add(this.velocity);

      if (this.position.y + this.imageCanvasHeight + this.velocity.y <= this.height) {
        this.velocity.add(this.acceleartion);
      }

      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y *= -0.1;
      }

      this.acceleartion.mult(0);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.save();
      ctx.drawImage(this.currentImage, this.cropWidth * this.frames, 0, this.cropWidth, 400, this.position.x, this.position.y, this.imageCanvasWidth, this.imageCanvasHeight);
      ctx.fill();
      ctx.restore();
    }
  }]);

  return Player;
}();

/***/ }),

/***/ "./src/js/Vector.js":
/*!**************************!*\
  !*** ./src/js/Vector.js ***!
  \**************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector = /*#__PURE__*/function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
    }
  }, {
    key: "div",
    value: function div(v) {
      this.x /= v;
      this.y /= v;
      return {
        x: this.x,
        y: this.y
      };
    }
  }, {
    key: "mult",
    value: function mult(v) {
      this.x *= v;
      this.y *= v;
      return {
        x: this.x,
        y: this.y
      };
    }
  }]);

  return Vector;
}();

/***/ }),

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./src/js/Vector.js");
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ "./src/js/Player.js");
/* harmony import */ var _Platform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Platform.js */ "./src/js/Platform.js");
/* harmony import */ var _GenericObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GenericObject.js */ "./src/js/GenericObject.js");
/* harmony import */ var _img_platform_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../img/platform.png */ "./src/img/platform.png");
/* harmony import */ var _img_background_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../img/background.png */ "./src/img/background.png");
/* harmony import */ var _img_hills_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../img/hills.png */ "./src/img/hills.png");
/* harmony import */ var _img_platformSmallTall_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../img/platformSmallTall.png */ "./src/img/platformSmallTall.png");
/* harmony import */ var _img_spriteRunLeft_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../img/spriteRunLeft.png */ "./src/img/spriteRunLeft.png");
/* harmony import */ var _img_spriteRunRight_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../img/spriteRunRight.png */ "./src/img/spriteRunRight.png");
/* harmony import */ var _img_spriteStandLeft_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../img/spriteStandLeft.png */ "./src/img/spriteStandLeft.png");
/* harmony import */ var _img_spriteStandRight_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../img/spriteStandRight.png */ "./src/img/spriteStandRight.png");












var canvasWidth = innerWidth;
var canvasHeight = innerHeight;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var ratio = window.devicePixelRatio;
canvas.width = canvasWidth * ratio;
canvas.height = canvasHeight * ratio;
canvas.style.width = "".concat(canvasWidth, "px");
canvas.style.height = "".concat(canvasHeight, "px");
ctx.scale(ratio, ratio);

function createImage(imageSrc) {
  var image = new Image();
  image.src = imageSrc;
  return image;
}

var platform = createImage(_img_platform_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
var bg = createImage(_img_background_png__WEBPACK_IMPORTED_MODULE_5__["default"]);
var hill = createImage(_img_hills_png__WEBPACK_IMPORTED_MODULE_6__["default"]);
var platformSmall = createImage(_img_platformSmallTall_png__WEBPACK_IMPORTED_MODULE_7__["default"]);
var standRight = createImage(_img_spriteStandRight_png__WEBPACK_IMPORTED_MODULE_11__["default"]);
var standLeft = createImage(_img_spriteStandLeft_png__WEBPACK_IMPORTED_MODULE_10__["default"]);
var runRight = createImage(_img_spriteRunRight_png__WEBPACK_IMPORTED_MODULE_9__["default"]);
var runLeft = createImage(_img_spriteRunLeft_png__WEBPACK_IMPORTED_MODULE_8__["default"]);
var images = [platform, bg, hill, platformSmall, standRight, runRight];
var isLoadedCount = 0;

for (var _i = 0, _images = images; _i < _images.length; _i++) {
  var image = _images[_i];

  image.onload = function () {
    isLoadedCount++;

    if (isLoadedCount === images.length) {
      onAllImageLoad();
    }
  };
}

var player, platforms, genericObject, scrollOffset, keys;

function init() {
  scrollOffset = 0;
  keys = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    }
  };
  var width = +canvas.style.width.replace('px', '');
  var height = +canvas.style.height.replace('px', '');
  player = new _Player_js__WEBPACK_IMPORTED_MODULE_1__["Player"](width, height, standRight, 66, 150);
  platforms = [new _Platform_js__WEBPACK_IMPORTED_MODULE_2__["Platform"]({
    x: platform.width * 4 + 300 - 2 + platformSmall.width,
    y: canvasHeight - platformSmall.height * 1.2,
    image: platformSmall
  }), new _Platform_js__WEBPACK_IMPORTED_MODULE_2__["Platform"]({
    x: -1,
    y: canvasHeight - platform.height,
    image: platform
  }), new _Platform_js__WEBPACK_IMPORTED_MODULE_2__["Platform"]({
    x: platform.width - 3,
    y: canvasHeight - platform.height,
    image: platform
  }), new _Platform_js__WEBPACK_IMPORTED_MODULE_2__["Platform"]({
    x: platform.width * 2 + 100,
    y: canvasHeight - platform.height,
    image: platform
  }), new _Platform_js__WEBPACK_IMPORTED_MODULE_2__["Platform"]({
    x: platform.width * 3 + 300,
    y: canvasHeight - platform.height,
    image: platform
  }), new _Platform_js__WEBPACK_IMPORTED_MODULE_2__["Platform"]({
    x: platform.width * 4 + 300 - 2,
    y: canvasHeight - platform.height,
    image: platform
  }), new _Platform_js__WEBPACK_IMPORTED_MODULE_2__["Platform"]({
    x: platform.width * 5 + 700 - 2,
    y: canvasHeight - platform.height,
    image: platform
  })];
  genericObject = [new _GenericObject_js__WEBPACK_IMPORTED_MODULE_3__["GenericObject"]({
    x: -1,
    y: -1,
    image: bg
  }), new _GenericObject_js__WEBPACK_IMPORTED_MODULE_3__["GenericObject"]({
    x: -1,
    y: -1,
    image: hill
  })];
}

function onAllImageLoad() {
  init();

  var animte = function animte() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    genericObject.forEach(function (object) {
      object.draw(ctx);
    });
    platforms.forEach(function (platform) {
      platform.draw(ctx);
    });
    var gravity = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](0, 2.6); // player

    player.applyForce(gravity);
    player.update();
    player.draw(ctx); // 이부분이 중요하다!! 꼼꼼히 다시 보기

    if (keys.right.pressed && player.position.x <= canvasWidth * 0.4) {
      player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > canvasWidth * 0.1 || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
      player.velocity.x = -player.speed;
    } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
        scrollOffset += player.speed;
        genericObject.forEach(function (object) {
          object.position.x -= player.speed * 0.66;
        });
        platforms.forEach(function (platform) {
          platform.position.x -= player.speed;
        });
      } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= player.speed;
        genericObject.forEach(function (object) {
          object.position.x += player.speed * 0.66;
        });
        platforms.forEach(function (platform) {
          platform.position.x += player.speed;
        });
      }
    }

    platforms.forEach(function (platform) {
      if (player.position.y + player.imageCanvasHeight <= platform.position.y && player.position.y + player.imageCanvasHeight + player.velocity.y >= platform.position.y && player.position.x + player.imageCanvasWidth >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0;
      }
    }); // win codition

    if (scrollOffset > platform.width * 5 + 700 - 2) {
      console.log('you win');
    } // lose condision


    if (player.position.y > canvasHeight) {
      init();
    }

    requestAnimationFrame(animte);
  };

  animte();
}

window.addEventListener('keydown', function (_ref) {
  var key = _ref.key;

  switch (key) {
    case 'a':
    case 'ㅁ':
      keys.left.pressed = true;
      player.imageCanvasWidth = 128;
      player.cropWidth = 341;
      player.currentImage = runLeft;
      break;

    case 'd':
    case 'ㅇ':
      keys.right.pressed = true;
      player.imageCanvasWidth = 128;
      player.cropWidth = 341;
      player.currentImage = runRight;
      break;

    case 's':
    case 'ㄴ':
      break;

    case 'w':
    case 'ㅈ':
      player.velocity.y = -20;
      break;
  }
});
window.addEventListener('keyup', function (_ref2) {
  var key = _ref2.key;

  switch (key) {
    case 'a':
    case 'ㅁ':
      keys.left.pressed = false;
      player.imageCanvasWidth = 66;
      player.cropWidth = 177;
      player.currentImage = standLeft;
      break;

    case 'd':
    case 'ㅇ':
      keys.right.pressed = false;
      player.imageCanvasWidth = 66;
      player.cropWidth = 177;
      player.currentImage = standRight;
      break;

    case 's':
    case 'ㄴ':
      break;

    case 'w':
    case 'ㅈ':
      break;
  }
});

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map