(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/gameover.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bda78GcirBNhKXZZJkmUubO', 'gameover', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=gameover.js.map
        