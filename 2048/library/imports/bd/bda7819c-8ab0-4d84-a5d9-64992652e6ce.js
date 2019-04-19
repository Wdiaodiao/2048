"use strict";
cc._RF.push(module, 'bda78GcirBNhKXZZJkmUubO', 'gameover');
// Script/gameover.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        restart: cc.Node,
        bg: cc.Node

    },

    start: function start() {},
    onLoad: function onLoad() {
        var color = cc.color(0, 0, 0, 0);
        // this.bg.node.color = color;
        // this.bg.opacity(0);;

        this.restart.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.director.loadScene('game');
        });
    }
});

cc._RF.pop();