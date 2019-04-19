(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6f3b7gEENdCYpzU6istCRQE', 'game', __filename);
// Script/game.js

'use strict';

var NUMBERS = [2, 4];

cc.Class({
    extends: cc.Component,

    properties: {
        scoreTitle: cc.Label,
        score: 0,
        blockPrefab: cc.Prefab,
        gap: 20,
        background: cc.Node
    },

    /**
    *生成4x4的板块
    */
    getblocks: function getblocks() {
        this.positions = [];
        this.blockSize = (cc.winSize.width - this.gap * 5) / 4;
        var x = this.blockSize / 2 + this.gap;
        var y = this.blockSize;
        for (var i = 0; i < 4; i++) {
            this.positions.push([0, 0, 0, 0]);

            for (var j = 0; j < 4; j++) {
                //cc.instantiate 初始化
                var block = cc.instantiate(this.blockPrefab);
                block.width = this.blockSize;
                block.height = this.blockSize;
                //setPosition 定位
                block.setPosition(cc.v2(x, y));
                this.positions[i][j] = cc.v2(x, y);
                block.getComponent('block').setNumber(0);
                this.background.addChild(block);

                x += this.blockSize + this.gap;
            }
            y += this.blockSize + this.gap;
            x = this.blockSize / 2 + this.gap;
        }
    },


    //得到空的板块
    getEmptyBlocks: function getEmptyBlocks() {
        var localtion = [];
        for (var i = 0; i < this.blocks.length; i++) {
            for (var j = 0; j < this.blocks[i].length; j++) {
                if (this.blocks[i][j] == null) {
                    localtion.push([i, j]);
                }
            }
        }
        return localtion;
    },
    addBlock: function addBlock() {
        var localtion = this.getEmptyBlocks();
        if (localtion.length == 0) {
            return false;
        }
        var index = Math.floor(Math.random() * localtion.length);
        cc.log(index);
        var x = localtion[index][0];
        var y = localtion[index][1];
        this.position = this.positions[x][y];

        var block = cc.instantiate(this.blockPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;

        block.setPosition(this.position);

        var blockNum = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
        block.getComponent('block').setNumber(blockNum);
        this.background.addChild(block);
        this.blocks[x][y] = block;
        this.data[x][y] = blockNum;
        console.log('test' + blockNum);

        return true;
    },
    init: function init() {
        this.updateScore(0);

        if (this.blocks) {
            for (var i = 0; i < this.blocks.length; i++) {
                for (var j = 0; j < this.blocks[i].length; j++) {
                    if (this.blocks[i][j] != null) {
                        this.blocks[i][j].destroy();
                    }
                }
            }
        }
        this.blocks = [];
        this.data = [];

        for (var _i = 0; _i < 4; _i++) {
            this.blocks.push([null, null, null, null]);
            this.data.push([0, 0, 0, 0]);
        }
        this.addBlock();
        this.addBlock();
        this.addBlock();
    },
    updateScore: function updateScore(number) {
        this.score = number;
        this.scoreTitle.string = '分数 : ' + number;
    },
    gameover: function gameover() {
        cc.log("gameover");
        cc.director.loadScene('gameOver');
    },
    checkBlock: function checkBlock() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var n = this.data[i][j];
                if (n == 0) return false;
                if (j > 0 && j < 4 && this.data[i][j - 1] == n) return false; //判断相邻的是否相同
                if (j > 0 && j < 3 && this.data[i][j + 1] == n) return false;
                if (i > 0 && j < 4 && this.data[i - 1][j] == n) return false;
                if (i > 0 && i < 3 && this.data[i + 1][j] == n) return false;
            }
        }
        return true;
    },
    afterMove: function afterMove(isTrue) {
        //只有滑动了才能创建格子
        if (isTrue) {
            this.updateScore(this.score + 1);
            this.addBlock();
        }
        if (this.checkBlock()) {
            this.gameover();
        }
    },

    /**
     * 移动 block
     * @param  {[type]}   block    [description]
     * @param  {[type]}   position [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    doMove: function doMove(block, position, callback) {
        var action = cc.moveTo(0.1, position);
        var finish = cc.callFunc(function () {
            callback && callback();
            return;
        });
        block.runAction(cc.sequence(action, finish));
    },
    moveMag: function moveMag(dire) {
        var _this = this;

        console.log(dire);
        if (dire == 'left') {
            (function () {
                var tomove = [];
                var isTrue = false;
                var move = function move(x, y, callback) {
                    if (y == 0 || _this.data[x][y] == 0) {
                        //最左边|| 当前为0/null 不动
                        callback && callback();
                        return;
                    } else if (_this.data[x][y - 1] == 0) {
                        //左前一个为0 就移动
                        var block = _this.blocks[x][y];
                        var position = _this.positions[x][y - 1];
                        _this.blocks[x][y - 1] = block;
                        _this.data[x][y - 1] = _this.data[x][y];
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        _this.doMove(block, position, function () {
                            move(x, y - 1, callback);
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] == _this.data[x][y - 1]) {
                        //相邻数字相同 合并
                        var _block = _this.blocks[x][y];
                        var _position = _this.positions[x][y - 1];

                        _this.data[x][y - 1] = _this.data[x][y] * 2;
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        cc.log("number" + _this.data[x][y - 1]);
                        _this.blocks[x][y - 1].getComponent('block').setNumber(_this.data[x][y - 1]);
                        _this.doMove(_block, _position, function () {
                            _block.destroy();
                            callback && callback();
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] != _this.data[x][y - 1]) {
                        //相邻数字不相同
                        callback && callback();
                        return;
                    }
                };
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (_this.data[i][j] != 0) {
                            tomove.push({ x: i, y: j });
                        }
                    }
                }
                var counter = 0;
                for (var _i2 = 0; _i2 < tomove.length; _i2++) {
                    move(tomove[_i2].x, tomove[_i2].y, function () {
                        counter++;
                        if (counter == tomove.length) {
                            _this.afterMove(isTrue);
                        }
                    });
                }
            })();
        } else if (dire == 'right') {
            (function () {
                var tomove = [];
                var isTrue = false;
                var move = function move(x, y, callback) {
                    if (y == 3 || _this.data[x][y] == 0) {
                        //最左边|| 当前为0/null 不动
                        callback && callback();
                        return;
                    } else if (_this.data[x][y + 1] == 0) {
                        //左前一个为0 就移动
                        var block = _this.blocks[x][y];
                        var position = _this.positions[x][y + 1];
                        _this.blocks[x][y + 1] = block;
                        _this.data[x][y + 1] = _this.data[x][y];
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        _this.doMove(block, position, function () {
                            move(x, y + 1, callback);
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] == _this.data[x][y + 1]) {
                        //相邻数字相同 合并
                        var _block2 = _this.blocks[x][y];
                        var _position2 = _this.positions[x][y + 1];

                        _this.data[x][y + 1] = _this.data[x][y] * 2;
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        cc.log("number" + _this.data[x][y + 1]);
                        _this.blocks[x][y + 1].getComponent('block').setNumber(_this.data[x][y + 1]);
                        _this.doMove(_block2, _position2, function () {
                            _block2.destroy();
                            callback && callback();
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] != _this.data[x][y + 1]) {
                        //相邻数字不相同
                        callback && callback();
                        return;
                    }
                };
                for (var i = 0; i < 4; i++) {
                    for (var j = 4 - 1; j >= 0; j--) {
                        if (_this.data[i][j] != 0) {
                            tomove.push({ x: i, y: j });
                        }
                    }
                }
                var counter = 0;
                for (var _i3 = 0; _i3 < tomove.length; _i3++) {
                    move(tomove[_i3].x, tomove[_i3].y, function () {
                        counter++;
                        if (counter == tomove.length) {
                            _this.afterMove(isTrue);
                        }
                    });
                }
            })();
        } else if (dire == 'up') {
            (function () {
                var tomove = [];
                var isTrue = false;
                var move = function move(x, y, callback) {
                    if (x == 3 || _this.data[x][y] == 0) {
                        //最左边|| 当前为0/null 不动
                        callback && callback();
                        return;
                    } else if (_this.data[x + 1][y] == 0) {
                        //左前一个为0 就移动
                        var block = _this.blocks[x][y];
                        var position = _this.positions[x + 1][y];
                        _this.blocks[x + 1][y] = block;
                        _this.data[x + 1][y] = _this.data[x][y];
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        _this.doMove(block, position, function () {
                            move(x + 1, y, callback);
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] == _this.data[x + 1][y]) {
                        //相邻数字相同 合并
                        var _block3 = _this.blocks[x][y];
                        var _position3 = _this.positions[x + 1][y];
                        _this.data[x + 1][y] = _this.data[x][y] * 2;
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        _this.blocks[x + 1][y].getComponent('block').setNumber(_this.data[x + 1][y]);
                        _this.doMove(_block3, _position3, function () {
                            _block3.destroy();
                            callback && callback();
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] != _this.data[x + 1][y]) {
                        //相邻数字不相同
                        callback && callback();
                        return;
                    }
                };
                for (var i = 4 - 1; i >= 0; i--) {
                    for (var j = 0; j < 4; j++) {
                        if (_this.data[i][j] != 0) {
                            tomove.push({ x: i, y: j });
                        }
                    }
                }
                var counter = 0;
                for (var _i4 = 0; _i4 < tomove.length; _i4++) {
                    move(tomove[_i4].x, tomove[_i4].y, function () {
                        counter++;
                        if (counter == tomove.length) {
                            _this.afterMove(isTrue);
                        }
                    });
                }
            })();
        } else {
            (function () {

                var tomove = [];
                var isTrue = false;
                var move = function move(x, y, callback) {
                    if (x == 0 || _this.data[x][y] == 0) {
                        //最左边|| 当前为0/null 不动
                        callback && callback();
                        return;
                    } else if (_this.data[x - 1][y] == 0) {
                        //左前一个为0 就移动
                        var block = _this.blocks[x][y];
                        var position = _this.positions[x - 1][y];
                        _this.blocks[x - 1][y] = block;
                        _this.data[x - 1][y] = _this.data[x][y];
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        _this.doMove(block, position, function () {
                            move(x - 1, y, callback);
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] == _this.data[x - 1][y]) {
                        //相邻数字相同 合并
                        var _block4 = _this.blocks[x][y];
                        var _position4 = _this.positions[x - 1][y];
                        _this.data[x - 1][y] = _this.data[x][y] * 2;
                        _this.data[x][y] = 0;
                        _this.blocks[x][y] = null;
                        _this.blocks[x - 1][y].getComponent('block').setNumber(_this.data[x - 1][y]);
                        _this.doMove(_block4, _position4, function () {
                            _block4.destroy();
                            callback && callback();
                        });
                        isTrue = true;
                    } else if (_this.data[x][y] != _this.data[x - 1][y]) {
                        //相邻数字不相同
                        callback && callback();
                        return;
                    }
                };
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (_this.data[i][j] != 0) {
                            tomove.push({ x: i, y: j });
                        }
                    }
                }
                var counter = 0;
                for (var _i5 = 0; _i5 < tomove.length; _i5++) {
                    move(tomove[_i5].x, tomove[_i5].y, function () {
                        counter++;
                        if (counter == tomove.length) {
                            _this.afterMove(isTrue);
                        }
                    });
                }
            })();
        }
    },

    //滑动事件
    addEventHandler: function addEventHandler() {
        var _this2 = this;

        this.background.on('touchstart', function (event) {
            _this2.startPoint = event.getLocation();
        });

        this.background.on('touchend', function (event) {
            _this2.endPoint = event.getLocation();
            var vec = _this2.endPoint.sub(_this2.startPoint);
            if (vec.mag() > 50) {
                //判断滑动距离
                if (Math.abs(vec.x) > Math.abs(vec.y)) {
                    //水平方向
                    if (vec.x > 0) {
                        _this2.moveMag('right');
                    } else {
                        _this2.moveMag('left');
                    }
                } else {
                    if (vec.y > 0) {
                        _this2.moveMag('up');
                    } else {
                        _this2.moveMag('down');
                    }
                }
            }
        });
    },
    start: function start() {
        this.getblocks();
        this.init();
        this.addEventHandler();
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
        //# sourceMappingURL=game.js.map
        