(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/start.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2ee38CMCxxAIIy/MwAaP7uR', 'start', __filename);
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
        //# sourceMappingURL=start.js.map
        