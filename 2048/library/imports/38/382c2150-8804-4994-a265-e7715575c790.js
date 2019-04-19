"use strict";
cc._RF.push(module, '382c2FQiARJlKJl53FVdceQ', 'block');
// Script/block.js

'use strict';

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {

        scoreTitle: cc.Label

    },

    setNumber: function setNumber(number) {
        if (number == 0) {
            //隐藏这个
            this.scoreTitle.node.active = false;
        }
        this.scoreTitle.string = number;

        if (number in _colors2.default) {
            this.node.color = _colors2.default[number];
        }
    },
    start: function start() {}
});

cc._RF.pop();