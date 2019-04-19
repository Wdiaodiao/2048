"use strict";
cc._RF.push(module, '2ee38CMCxxAIIy/MwAaP7uR', 'start');
// Script/start.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        startLabel: cc.Node
    },

    onLoad: function onLoad() {
        this.startLabel.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.director.loadScene('game');
        });
    }

    // update (dt) {},

});

cc._RF.pop();