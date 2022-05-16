var gtile;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "App": () => (/* binding */ App),
  "disable": () => (/* binding */ disable),
  "enable": () => (/* binding */ enable),
  "init": () => (/* binding */ init)
});

;// CONCATENATED MODULE: ./src/3_8/ui/GridSettingsButton.ts
const St = imports.gi.St;
class GridSettingsButton {
    constructor(app, settings, text, cols, rows) {
        this._onButtonPress = () => {
            this.settings.SetGridConfig(this.cols, this.rows);
            this.app.RefreshGrid();
            return false;
        };
        this.app = app;
        this.settings = settings;
        this.cols = cols;
        this.rows = rows;
        this.text = text;
        this.actor = new St.Button({
            style_class: 'settings-button',
            reactive: true,
            can_focus: true,
            track_hover: true
        });
        this.label = new St.Label({
            style_class: 'settings-label',
            reactive: true, can_focus: true,
            track_hover: true,
            text: this.text
        });
        this.actor.add_actor(this.label);
        this.actor.connect('button-press-event', this._onButtonPress);
    }
}

;// CONCATENATED MODULE: ./src/3_8/config.ts

const Settings = imports.ui.settings;
const Main = imports.ui.main;
class Config {
    constructor(app) {
        this.gridSettingsButton = [];
        this.EnableHotkey = () => {
            this.DisableHotkey();
            Main.keybindingManager.addHotKey('gTile', this.hotkey, this.app.ToggleUI);
        };
        this.DisableHotkey = () => {
            Main.keybindingManager.removeHotKey('gTile');
        };
        this.updateSettings = () => {
            this.app.Grid.UpdateSettingsButtons();
        };
        this.initGridSettings = () => {
            let basestr = 'grid';
            for (let i = 1; i <= 4; i++) {
                let sgbx = basestr + i + 'x';
                let sgby = basestr + i + 'y';
                let gbx = this.settings.getValue(sgbx);
                let gby = this.settings.getValue(sgby);
                this.gridSettingsButton.push(new GridSettingsButton(this.app, this, gbx.length + 'x' + gby.length, gbx, gby));
            }
        };
        this.updateGridSettings = () => {
            this.gridSettingsButton = [];
            this.initGridSettings();
            this.app.Grid.RebuildGridSettingsButtons();
        };
        this.destroy = () => {
            this.DisableHotkey();
        };
        this.app = app;
        this.settings = new Settings.ExtensionSettings(this, 'gTile@shuairan');
        this.settings.bindProperty(Settings.BindingDirection.IN, 'hotkey', 'hotkey', this.EnableHotkey, null);
        this.settings.bindProperty(Settings.BindingDirection.OUT, 'lastGridRows', 'nbCols');
        this.settings.bindProperty(Settings.BindingDirection.OUT, 'lastGridCols', 'nbRows');
        if (this.nbCols == null || !Array.isArray(this.nbCols))
            this.nbCols = this.InitialGridItems();
        if (this.nbRows == null || !Array.isArray(this.nbRows))
            this.nbRows = this.InitialGridItems();
        this.settings.bindProperty(Settings.BindingDirection.BIDIRECTIONAL, 'animation', 'animation', this.updateSettings, null);
        this.settings.bindProperty(Settings.BindingDirection.BIDIRECTIONAL, 'autoclose', 'autoclose', this.updateSettings, null);
        let basestr = 'grid';
        this.initGridSettings();
        for (let i = 1; i <= 4; i++) {
            let sgbx = basestr + i + 'x';
            let sgby = basestr + i + 'y';
            this.settings.bindProperty(Settings.BindingDirection.IN, sgbx, sgbx, this.updateGridSettings, null);
            this.settings.bindProperty(Settings.BindingDirection.IN, sgby, sgby, this.updateGridSettings, null);
        }
        this.EnableHotkey();
    }
    SetGridConfig(columns, rows) {
        this.nbRows = rows;
        this.nbCols = columns;
    }
    InitialGridItems() {
        return [
            { span: 1 },
            { span: 1 },
            { span: 1 },
            { span: 1 }
        ];
    }
}

;// CONCATENATED MODULE: ./src/3_8/utils.ts
const { Object: utils_Object } = imports.gi.GObject;
const Gettext = imports.gettext;
const GLib = imports.gi.GLib;
const Signals = imports.signals;
const Meta = imports.gi.Meta;
const Panel = imports.ui.panel;
const utils_Main = imports.ui.main;
const UUID = 'gTile@shuairan';
const isFinalized = function (obj) {
    return obj && utils_Object.prototype.toString.call(obj).indexOf('FINALIZED') > -1;
};
Gettext.bindtextdomain(UUID, GLib.get_home_dir() + '/.local/share/locale');
function _(str) {
    let customTranslation = Gettext.dgettext(UUID, str);
    if (customTranslation != str) {
        return customTranslation;
    }
    return Gettext.gettext(str);
}
function objHasKey(obj, key) {
    return utils_Object.prototype.hasOwnProperty.call(obj, key);
}
function addSignals(constructor) {
    Signals.addSignalMethods(constructor.prototype);
    return class extends constructor {
    };
}
const reset_window = (metaWindow) => {
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.unmaximize(Meta.MaximizeFlags.HORIZONTAL);
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.unmaximize(Meta.MaximizeFlags.VERTICAL);
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.unmaximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.tile(Meta.TileMode.NONE, false);
};
const _getInvisibleBorderPadding = (metaWindow) => {
    let outerRect = metaWindow.get_outer_rect();
    let inputRect = metaWindow.get_input_rect();
    let [borderX, borderY] = [outerRect.x - inputRect.x, outerRect.y - inputRect.y];
    return [borderX, borderY];
};
const move_maximize_window = (metaWindow, x, y) => {
    if (metaWindow == null)
        return;
    let [borderX, borderY] = _getInvisibleBorderPadding(metaWindow);
    x = x - borderX;
    y = y - borderY;
    metaWindow.move_frame(true, x, y);
    metaWindow.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
};
const move_resize_window = (metaWindow, x, y, width, height) => {
    if (!metaWindow)
        return;
    let clientRect = metaWindow.get_rect();
    let outerRect = metaWindow.get_outer_rect();
    let client_deco = clientRect.width > outerRect.width &&
        clientRect.height > outerRect.height;
    if (client_deco) {
        x -= outerRect.x - clientRect.x;
        y -= outerRect.y - clientRect.y;
        width += (clientRect.width - outerRect.width);
        height += (clientRect.height - outerRect.height);
    }
    else {
        width -= (outerRect.width - clientRect.width);
        height -= (outerRect.height - clientRect.height);
    }
    metaWindow.resize(true, width, height);
    metaWindow.move_frame(true, x, y);
};
const getPanelHeight = (panel) => {
    return panel.height
        || panel.actor.get_height();
};
const getUsableScreenArea = (monitor) => {
    let top = monitor.y;
    let bottom = monitor.y + monitor.height;
    let left = monitor.x;
    let right = monitor.x + monitor.width;
    for (let panel of utils_Main.panelManager.getPanelsInMonitor(monitor.index)) {
        if (!panel.isHideable()) {
            switch (panel.panelPosition) {
                case Panel.PanelLoc.top:
                    top += getPanelHeight(panel);
                    break;
                case Panel.PanelLoc.bottom:
                    bottom -= getPanelHeight(panel);
                    break;
                case Panel.PanelLoc.left:
                    left += getPanelHeight(panel);
                    break;
                case Panel.PanelLoc.right:
                    right -= getPanelHeight(panel);
                    break;
            }
        }
    }
    let width = right > left ? right - left : 0;
    let height = bottom > top ? bottom - top : 0;
    return [left, top, width, height];
};
const getMonitorKey = (monitor) => {
    return monitor.x + ':' + monitor.width + ':' + monitor.y + ':' + monitor.height;
};
const getAdjacentMonitor = (monitor, side) => {
    const monitors = utils_Main.layoutManager.monitors;
    const contactsOnSide = [];
    for (const mon of monitors) {
        if (isEqual(mon, monitor))
            continue;
        const verticalContact = rangeToContactSurface([mon.y, mon.y + mon.height], [monitor.y, monitor.y + monitor.height]);
        const horizontalContact = rangeToContactSurface([mon.x, mon.x + mon.width], [monitor.x, monitor.x + monitor.width]);
        switch (side) {
            case Meta.Side.LEFT:
                if (monitor.x == mon.x + mon.width)
                    contactsOnSide.push([mon, verticalContact]);
                break;
            case Meta.Side.RIGHT:
                if (monitor.x + monitor.width == mon.x)
                    contactsOnSide.push([mon, verticalContact]);
                break;
            case Meta.Side.TOP:
                if (monitor.y == mon.y + mon.height)
                    contactsOnSide.push([mon, horizontalContact]);
                break;
            case Meta.Side.BOTTOM:
                if (monitor.y + monitor.height == mon.y)
                    contactsOnSide.push([mon, horizontalContact]);
                break;
        }
    }
    if (contactsOnSide.length == 0)
        return monitor;
    return contactsOnSide.reduce((max, current) => (current[1] > max[1] ? current : max), contactsOnSide[0])[0];
};
function isEqual(monitor1, monitor2) {
    return (monitor1.x == monitor2.x &&
        monitor1.y == monitor2.y &&
        monitor1.height == monitor2.height &&
        monitor1.width == monitor2.width);
}
const getFocusApp = () => {
    return global.display.focus_window;
};
const isPrimaryMonitor = (monitor) => {
    return utils_Main.layoutManager.primaryMonitor === monitor;
};
function intersection(a, b) {
    let min = (a[0] < b[0] ? a : b);
    let max = (min == a ? b : a);
    if (min[1] < max[0])
        return null;
    return [max[0], (min[1] < max[1] ? min[1] : max[1])];
}
function rangeToContactSurface(a, b) {
    const range = intersection(a, b);
    return range ? range[1] - range[0] : 0;
}
const GetMonitorAspectRatio = (monitor) => {
    const aspectRatio = Math.max(monitor.width, monitor.height) / Math.min(monitor.width, monitor.height);
    return {
        ratio: aspectRatio,
        widthIsLonger: monitor.width > monitor.height
    };
};

;// CONCATENATED MODULE: ./src/3_8/constants.ts

const SETTINGS_AUTO_CLOSE = 'autoclose';
const SETTINGS_ANIMATION = 'animation';
const TOOLTIPS = {
    [SETTINGS_AUTO_CLOSE]: _("Auto close"),
    [SETTINGS_ANIMATION]: _("Animations"),
    'action-main-list': _("Auto tile main and list"),
    'action-two-list': _("Auto tile two lists")
};
const KEYCONTROL = {
    'gTile-k-left': 'Left',
    'gTile-k-right': 'Right',
    'gTile-k-up': 'Up',
    'gTile-k-down': 'Down',
    'gTile-k-left-meta': '<Shift>Left',
    'gTile-k-right-meta': '<Shift>Right',
    'gTile-k-up-meta': '<Shift>Up',
    'gTile-k-down-meta': '<Shift>Down',
    'gTile-k-left-monitor-move': '<Alt>Left',
    'gTile-k-right-monitor-move': '<Alt>Right',
    'gTile-k-up-monitor-move': '<Alt>Up',
    'gTile-k-down-monitor-move': '<Alt>Down',
    'gTile-k-first-grid': '1',
    'gTile-k-second-grid': '2',
    'gTile-k-third-grid': '3',
    'gTile-k-fourth-grid': '4',
};

;// CONCATENATED MODULE: ./src/3_8/ui/ActionButton.ts
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const Tooltips = imports.ui.tooltips;
const ActionButton_St = imports.gi.St;
let ActionButton = class ActionButton {
    constructor(classname, icon) {
        this._onButtonPress = () => {
            this.emit('button-press-event');
            return false;
        };
        this.actor = new ActionButton_St.Button({
            style_class: "settings-button",
            reactive: true,
            can_focus: true,
            track_hover: true,
            child: new ActionButton_St.Icon({
                reactive: true,
                icon_name: icon,
                icon_size: 36,
                icon_type: ActionButton_St.IconType.SYMBOLIC,
                can_focus: true,
                track_hover: true
            })
        });
        this.actor.connect('button-press-event', this._onButtonPress);
        if (TOOLTIPS[classname]) {
            this._tooltip = new Tooltips.Tooltip(this.actor, TOOLTIPS[classname]);
        }
    }
};
ActionButton = __decorate([
    addSignals
], ActionButton);

;

;// CONCATENATED MODULE: ./src/3_8/ui/AutoTileMainAndList.ts
var AutoTileMainAndList_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let AutoTileMainAndList = class AutoTileMainAndList extends ActionButton {
    constructor(app) {
        super('action-main-list', "auto_tile_0-symbolic");
        this._onButtonPress = () => {
            if (!this.app.FocusMetaWindow)
                return false;
            reset_window(this.app.FocusMetaWindow);
            let monitor = this.app.Grid.monitor;
            let [screenX, screenY, screenWidth, screenHeight] = getUsableScreenArea(monitor);
            let windows = this.app.GetNotFocusedWindowsOfMonitor(monitor);
            move_resize_window(this.app.FocusMetaWindow, screenX, screenY, screenWidth / 2, screenHeight);
            let winHeight = screenHeight / windows.length;
            let countWin = 0;
            for (let windowIdx in windows) {
                let metaWindow = windows[windowIdx];
                let newOffset = countWin * winHeight;
                reset_window(metaWindow);
                move_resize_window(metaWindow, screenX + screenWidth / 2, screenY + newOffset, screenWidth / 2, winHeight);
                countWin++;
            }
            this.emit('resize-done');
            return false;
        };
        this.app = app;
        this.classname = 'action-main-list';
        this.connect('button-press-event', this._onButtonPress);
    }
};
AutoTileMainAndList = AutoTileMainAndList_decorate([
    addSignals
], AutoTileMainAndList);

;

;// CONCATENATED MODULE: ./src/3_8/ui/AutoTileTwoList.ts
var AutoTileTwoList_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let AutoTileTwoList = class AutoTileTwoList extends ActionButton {
    constructor(app) {
        super('action-two-list', "auto_tile_1-symbolic");
        this._onButtonPress = () => {
            if (!this.app.FocusMetaWindow)
                return false;
            reset_window(this.app.FocusMetaWindow);
            let monitor = this.app.Grid.monitor;
            let [screenX, screenY, screenWidth, screenHeight] = getUsableScreenArea(monitor);
            let windows = this.app.GetNotFocusedWindowsOfMonitor(monitor);
            let nbWindowOnEachSide = Math.ceil((windows.length + 1) / 2);
            let winHeight = screenHeight / nbWindowOnEachSide;
            let countWin = 0;
            let xOffset = ((countWin % 2) * screenWidth) / 2;
            let yOffset = Math.floor(countWin / 2) * winHeight;
            move_resize_window(this.app.FocusMetaWindow, screenX + xOffset, screenY + yOffset, screenWidth / 2, winHeight);
            countWin++;
            for (let windowIdx in windows) {
                let metaWindow = windows[windowIdx];
                xOffset = ((countWin % 2) * screenWidth) / 2;
                yOffset = Math.floor(countWin / 2) * winHeight;
                reset_window(metaWindow);
                move_resize_window(metaWindow, screenX + xOffset, screenY + yOffset, screenWidth / 2, winHeight);
                countWin++;
            }
            this.emit('resize-done');
            return false;
        };
        this.app = app;
        this.classname = 'action-two-list';
        this.connect('button-press-event', this._onButtonPress);
    }
};
AutoTileTwoList = AutoTileTwoList_decorate([
    addSignals
], AutoTileTwoList);

;

;// CONCATENATED MODULE: ./src/3_8/ui/GridElement.ts

const GridElement_Main = imports.ui.main;
const GridElement_St = imports.gi.St;
class GridElement {
    constructor(app, monitor, width, height, coordx, coordy, delegate) {
        this._onButtonPress = () => {
            this.delegate._onButtonPress(this);
            return false;
        };
        this._onHoverChanged = () => {
            if (!this.actor || isFinalized(this.actor))
                return;
            this.delegate._onHoverChanged(this);
            return false;
        };
        this._activate = () => {
            if (!this.actor || isFinalized(this.actor))
                return;
            this.actor.add_style_pseudo_class('activate');
        };
        this._deactivate = () => {
            if (!this.actor || isFinalized(this.actor))
                return;
            this.actor.remove_style_pseudo_class('activate');
        };
        this._clean = () => {
            GridElement_Main.uiGroup.remove_actor(this.app.area);
        };
        this._destroy = () => {
            this.monitor = null;
            this.coordx = null;
            this.coordy = null;
            this.width = null;
            this.height = null;
            this.active = null;
        };
        this.app = app;
        this.actor = new GridElement_St.Button({
            style_class: 'table-element',
            width: width,
            height: height,
            reactive: true,
            can_focus: true,
            track_hover: true,
            x_expand: false,
            y_expand: false,
            y_fill: false,
            x_fill: false,
        });
        this.monitor = monitor;
        this.coordx = coordx;
        this.coordy = coordy;
        this.width = width;
        this.height = height;
        this.delegate = delegate;
        this.actor.connect('button-press-event', this._onButtonPress);
        this.actor.connect('notify::hover', this._onHoverChanged);
        this.active = false;
    }
}

;// CONCATENATED MODULE: ./src/3_8/ui/GridElementDelegate.ts
var GridElementDelegate_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const Tweener = imports.ui.tweener;
let GridElementDelegate = class GridElementDelegate {
    constructor(app) {
        this.activated = false;
        this.first = null;
        this.last = null;
        this.currentElement = null;
        this.activatedActors = null;
        this._allSelected = () => {
            var _a;
            return ((_a = this.activatedActors) === null || _a === void 0 ? void 0 : _a.length) === (this.settings.nbCols.length * this.settings.nbRows.length);
        };
        this._resizeDone = () => {
            this.emit('resize-done');
        };
        this.reset = () => {
            this._resetGrid();
            this.activated = false;
            this.first = null;
            this.last = null;
            this.currentElement = null;
        };
        this._resetGrid = () => {
            this._hideArea();
            if (this.currentElement) {
                this.currentElement._deactivate();
            }
            if (this.activatedActors != null) {
                for (let index = 0; index < this.activatedActors.length; index++) {
                    this.activatedActors[index]._deactivate();
                }
            }
            this.activatedActors = [];
        };
        this._getVarFromGridElement = (fromGridElement, toGridElement) => {
            let maxX = fromGridElement.coordx >= toGridElement.coordx ? fromGridElement.coordx : toGridElement.coordx;
            let minX = fromGridElement.coordx <= toGridElement.coordx ? fromGridElement.coordx : toGridElement.coordx;
            let maxY = fromGridElement.coordy >= toGridElement.coordy ? fromGridElement.coordy : toGridElement.coordy;
            let minY = fromGridElement.coordy <= toGridElement.coordy ? fromGridElement.coordy : toGridElement.coordy;
            return [minX, maxX, minY, maxY];
        };
        this.refreshGrid = (fromGridElement, toGridElement) => {
            var _a;
            this._resetGrid();
            let minX, maxX, minY, maxY;
            [minX, maxX, minY, maxY] = this._getVarFromGridElement(fromGridElement, toGridElement);
            let grid = this.app.Grid;
            for (let r = minY; r <= maxY; r++) {
                for (let c = minX; c <= maxX; c++) {
                    let element = grid === null || grid === void 0 ? void 0 : grid.elements[r][c];
                    element._activate();
                    (_a = this.activatedActors) === null || _a === void 0 ? void 0 : _a.push(element);
                }
            }
            this._displayArea(fromGridElement, toGridElement);
        };
        this._computeAreaPositionSize = (fromGridElement, toGridElement) => {
            let minX, maxX, minY, maxY;
            [minX, maxX, minY, maxY] = this._getVarFromGridElement(fromGridElement, toGridElement);
            let nbRows = this.settings.nbRows;
            let nbCols = this.settings.nbCols;
            let monitor = fromGridElement.monitor;
            let [screenX, screenY, screenWidth, screenHeight] = getUsableScreenArea(monitor);
            const widthUnit = screenWidth / nbCols.map(r => r.span).reduce((p, c) => p += c);
            const heightUnit = screenHeight / nbRows.map(r => r.span).reduce((p, c) => p += c);
            let areaWidth = 0;
            for (let index = minX; index <= maxX; index++) {
                const element = nbCols[index];
                areaWidth += element.span * widthUnit;
            }
            let areaHeight = 0;
            for (let index = minY; index <= maxY; index++) {
                const element = nbRows[index];
                areaHeight += element.span * heightUnit;
            }
            let areaX = screenX;
            for (let index = 0; index < minX; index++) {
                const element = nbCols[index];
                areaX += element.span * widthUnit;
            }
            let areaY = screenY;
            for (let index = 0; index < minY; index++) {
                const element = nbRows[index];
                areaY += element.span * heightUnit;
            }
            return [areaX, areaY, areaWidth, areaHeight];
        };
        this._displayArea = (fromGridElement, toGridElement) => {
            let areaWidth, areaHeight, areaX, areaY;
            [areaX, areaY, areaWidth, areaHeight] = this._computeAreaPositionSize(fromGridElement, toGridElement);
            this.app.area.add_style_pseudo_class('activate');
            if (this.settings.animation) {
                Tweener.addTween(this.app.area, {
                    time: 0.2,
                    x: areaX,
                    y: areaY,
                    width: areaWidth,
                    height: areaHeight,
                    transition: 'easeOutQuad'
                });
            }
            else {
                this.app.area.width = areaWidth;
                this.app.area.height = areaHeight;
                this.app.area.x = areaX;
                this.app.area.y = areaY;
            }
        };
        this._hideArea = () => {
            this.app.area.remove_style_pseudo_class('activate');
        };
        this._onHoverChanged = (gridElement) => {
            if (this.activated) {
                if (this.first != null)
                    this.refreshGrid(this.first, gridElement);
            }
            else {
                if (this.currentElement)
                    this.currentElement._deactivate();
                this.currentElement = gridElement;
                this._displayArea(this.currentElement, this.currentElement);
                this.currentElement._activate();
            }
        };
        this._destroy = () => {
            this.activated = null;
            this.first = null;
            this.last = null;
            this.currentElement = null;
            this.activatedActors = null;
            this._hideArea();
        };
        this.app = app;
        this.settings = this.app.config;
    }
    _onButtonPress(gridElement) {
        if (!this.activated) {
            this.activated = true;
            this.activatedActors = [];
            this.activatedActors.push(gridElement);
            this.first = gridElement;
            gridElement.actor.add_style_pseudo_class('activate');
            gridElement.active = true;
        }
        else {
            reset_window(this.app.FocusMetaWindow);
            let areaWidth, areaHeight, areaX, areaY;
            [areaX, areaY, areaWidth, areaHeight] = this._computeAreaPositionSize(this.first, gridElement);
            if (this._allSelected()) {
                move_maximize_window(this.app.FocusMetaWindow, areaX, areaY);
            }
            else {
                move_resize_window(this.app.FocusMetaWindow, areaX, areaY, areaWidth, areaHeight);
            }
            this._resizeDone();
        }
    }
};
GridElementDelegate = GridElementDelegate_decorate([
    addSignals
], GridElementDelegate);

;

;// CONCATENATED MODULE: ./src/3_8/ui/ToggleSettingsButton.ts
var ToggleSettingsButton_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const { Icon, IconType, Button } = imports.gi.St;
const ToggleSettingsButton_Tooltips = imports.ui.tooltips;
const { IconTheme } = imports.gi.Gtk;
let ToggleSettingsButton = class ToggleSettingsButton {
    constructor(setting, text, property, icon) {
        this.active = false;
        this._update = () => {
            this.active = this.settings[this.property];
            if (this.active) {
                this.actor.opacity = 255;
                this.actor.add_style_pseudo_class('activate');
            }
            else {
                this.actor.remove_style_pseudo_class('activate');
            }
        };
        this._onButtonPress = () => {
            if (!objHasKey(this.settings, this.property))
                return false;
            this.settings[this.property] = !this.settings[this.property];
            this.emit('update-toggle');
            return false;
        };
        this.settings = setting;
        this.text = text;
        this.actor = new Button({
            style_class: "settings-button",
            reactive: true,
            can_focus: true,
            track_hover: true,
            child: new Icon({
                icon_name: icon,
                icon_type: IconType.SYMBOLIC,
                icon_size: 24,
            })
        });
        this.property = property;
        this._update();
        this.actor.connect('button-press-event', this._onButtonPress);
        this.connect('update-toggle', this._update);
        if (objHasKey(TOOLTIPS, property)) {
            this._tooltip = new ToggleSettingsButton_Tooltips.Tooltip(this.actor, TOOLTIPS[property]);
        }
    }
};
ToggleSettingsButton = ToggleSettingsButton_decorate([
    addSignals
], ToggleSettingsButton);

;

;// CONCATENATED MODULE: ./src/3_8/ui/TopBar.ts
const TopBar_St = imports.gi.St;
class TopBar {
    constructor(app, title) {
        this._onCloseButtonClicked = () => {
            this.app.ToggleUI();
            return false;
        };
        this.app = app;
        this.actor = new TopBar_St.BoxLayout({ style_class: 'top-box' });
        this._title = title;
        this._stlabel = new TopBar_St.Label({ style_class: 'grid-title', text: this._title });
        this._iconBin = new TopBar_St.Bin({ x_fill: false, y_fill: false });
        this._closeButton = new TopBar_St.Button({
            style: "padding:0;",
            opacity: 128,
            child: new TopBar_St.Icon({
                icon_type: TopBar_St.IconType.SYMBOLIC,
                icon_size: 24,
                icon_name: "window-close"
            })
        });
        this._closeButton.connect('notify::hover', () => { this._closeButton.opacity = this._closeButton.hover ? 255 : 128; });
        this._closeButton.connect('button-release-event', this._onCloseButtonClicked);
        this.actor.add(this._iconBin);
        this.actor.add(this._stlabel, { x_fill: true, expand: true, y_align: TopBar_St.Align.MIDDLE, y_fill: true });
        this.actor.add(this._closeButton, { x_fill: false, expand: false });
    }
    _set_title(title) {
        this._title = title;
        this._stlabel.text = this._title;
    }
    _set_app(app, title) {
        this._title = app.get_name() + ' - ' + title;
        this._stlabel.text = this._title;
        this._icon = app.create_icon_texture(24);
        this._iconBin.set_size(24, 24);
        this._iconBin.set_child(this._icon);
    }
}

;// CONCATENATED MODULE: ./src/3_8/ui/Grid.ts
var Grid_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









const { BoxLayout, Table, Bin } = imports.gi.St;
const Grid_Main = imports.ui.main;
const Grid_Tweener = imports.ui.tweener;
const { Side } = imports.gi.Meta;
const { Color } = imports.gi.Clutter;
let Grid = class Grid {
    constructor(app, monitor, title, cols, rows) {
        this.tableWidth = 220;
        this.tableHeight = 200;
        this.borderwidth = 2;
        this.rowKey = -1;
        this.colKey = -1;
        this.isEntered = false;
        this.interceptHide = false;
        this.elementsDelegateSignals = [];
        this.toggleSettingButtons = [];
        this.AdjustTableSize = (time, width, height) => {
            this.tableWidth = width;
            this.tableHeight = height;
            Grid_Tweener.addTween(this.table, {
                time: time,
                width: width,
                height: height,
                transition: 'easeOutQuad',
            });
            const [widthUnit, heightUnit] = this.GetTableUnits(width, height);
            for (let index = 0; index < this.elements.length; index++) {
                const row = this.elements[index];
                for (let j = 0; j < row.length; j++) {
                    const element = row[j];
                    const finalWidth = widthUnit * this.cols[j].span;
                    const finalHeight = heightUnit * this.rows[index].span;
                    Grid_Tweener.addTween(element.actor, {
                        time: time,
                        width: finalWidth,
                        height: finalHeight,
                        transition: 'easeOutQuad',
                    });
                }
            }
        };
        this.RebuildGridSettingsButtons = () => {
            this.bottombar.destroy_children();
            let rowNum = 0;
            let colNum = 0;
            for (let index = 0; index < this.app.config.gridSettingsButton.length; index++) {
                if (colNum >= 4) {
                    colNum = 0;
                    rowNum += 2;
                }
                let button = this.app.config.gridSettingsButton[index];
                button = new GridSettingsButton(this.app, this.app.config, button.text, button.cols, button.rows);
                this.bottombar.add(button.actor, { row: rowNum, col: colNum, x_fill: false, y_fill: false });
                button.actor.connect('notify::hover', () => this.elementsDelegate.reset());
                colNum++;
            }
        };
        this.RefreshGridElements = () => {
            this.table.destroy_all_children();
            this.cols = this.app.config.nbCols;
            this.rows = this.app.config.nbRows;
            if (this.cols.length <= this.colKey || this.rows.length <= this.colKey)
                this.Reset();
            this.RebuildGridElements();
        };
        this.RebuildGridElements = () => {
            var _a;
            this.elements = [];
            const [widthUnit, heightUnit] = this.GetTableUnits(this.tableWidth, this.tableHeight);
            this.elementsDelegateSignals.forEach(element => {
                var _a;
                (_a = this.elementsDelegate) === null || _a === void 0 ? void 0 : _a.disconnect(element);
            });
            (_a = this.elementsDelegate) === null || _a === void 0 ? void 0 : _a._destroy();
            this.elementsDelegate = new GridElementDelegate(this.app);
            this.elementsDelegateSignals = [];
            this.elementsDelegateSignals.push(this.elementsDelegate.connect('resize-done', this.OnResize));
            for (let r = 0; r < this.rows.length; r++) {
                const row = new BoxLayout();
                for (let c = 0; c < this.cols.length; c++) {
                    if (c === 0) {
                        this.elements[r] = [];
                    }
                    const finalWidth = widthUnit * this.cols[c].span;
                    const finalHeight = heightUnit * this.rows[r].span;
                    let element = new GridElement(this.app, this.monitor, finalWidth, finalHeight, c, r, this.elementsDelegate);
                    this.elements[r][c] = element;
                    const bin = new Bin();
                    bin.add_actor(element.actor);
                    row.add(bin, { expand: true });
                }
                this.table.add(row, { expand: true });
            }
        };
        this.BindKeyControls = () => {
            Grid_Main.keybindingManager.addHotKey('gTile-close', 'Escape', this.app.ToggleUI);
            Grid_Main.keybindingManager.addHotKey('gTile-tile1', 'space', this.BeginTiling);
            Grid_Main.keybindingManager.addHotKey('gTile-tile2', 'Return', this.BeginTiling);
            for (let index in KEYCONTROL) {
                if (objHasKey(KEYCONTROL, index)) {
                    let key = KEYCONTROL[index];
                    let type = index;
                    Grid_Main.keybindingManager.addHotKey(type, key, () => this.OnKeyPressEvent(type, key));
                }
            }
        };
        this.RemoveKeyControls = () => {
            Grid_Main.keybindingManager.removeHotKey('gTile-close');
            Grid_Main.keybindingManager.removeHotKey('gTile-tile1');
            Grid_Main.keybindingManager.removeHotKey('gTile-tile2');
            for (let type in KEYCONTROL) {
                Grid_Main.keybindingManager.removeHotKey(type);
            }
        };
        this.OnHideComplete = () => {
            if (!this.interceptHide && this.actor) {
                Grid_Main.layoutManager.removeChrome(this.actor);
            }
            Grid_Main.layoutManager["_chrome"].updateRegions();
        };
        this.OnShowComplete = () => {
            Grid_Main.layoutManager["_chrome"].updateRegions();
        };
        this.OnResize = () => {
            this.app.RefreshGrid();
            if (this.app.config.autoclose) {
                this.emit('hide-tiling');
            }
        };
        this.OnMouseEnter = () => {
            if (!this.isEntered) {
                this.elementsDelegate.reset();
                this.isEntered = true;
            }
            return false;
        };
        this.OnMouseLeave = () => {
            let [x, y, mask] = global.get_pointer();
            if ((this.elementsDelegate && (x <= this.actor.x || x >= this.actor.x + this.actor.width)) || (y <= this.actor.y || y >= this.actor.y + this.tableHeight + this.topbar.actor.height)) {
                this.isEntered = false;
                this.elementsDelegate.reset();
            }
            return false;
        };
        this.OnKeyPressEvent = (type, key) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let modifier = false;
            switch (type) {
                case 'gTile-k-right-meta':
                case 'gTile-k-left-meta':
                case 'gTile-k-up-meta':
                case 'gTile-k-down-meta':
                case 'gTile-k-right-monitor-move':
                case 'gTile-k-left-monitor-move':
                case 'gTile-k-up-monitor-move':
                case 'gTile-k-down-monitor-move':
                    modifier = true;
                    break;
            }
            if (modifier && this.keyElement) {
                if (!this.elementsDelegate.activated) {
                    this.keyElement._onButtonPress();
                }
            }
            else if (this.keyElement) {
                this.elementsDelegate.reset();
            }
            switch (type) {
                case 'gTile-k-right':
                case 'gTile-k-right-meta':
                    this.colKey = Math.min(this.colKey + 1, this.cols.length - 1);
                    this.rowKey = this.rowKey === -1 ? 0 : this.rowKey;
                    break;
                case 'gTile-k-left':
                case 'gTile-k-left-meta':
                    if (this.colKey == -1)
                        return;
                    this.colKey = Math.max(0, this.colKey - 1);
                    break;
                case 'gTile-k-up':
                case 'gTile-k-up-meta':
                    if (this.rowKey == -1)
                        return;
                    this.rowKey = Math.max(0, this.rowKey - 1);
                    break;
                case 'gTile-k-down':
                case 'gTile-k-down-meta':
                    this.rowKey = Math.min(this.rowKey + 1, this.rows.length - 1);
                    this.colKey = this.colKey === -1 ? 0 : this.colKey;
                    break;
                case 'gTile-k-left-monitor-move':
                    this.MoveToMonitor(getAdjacentMonitor(this.monitor, Side.LEFT));
                    break;
                case 'gTile-k-right-monitor-move':
                    this.MoveToMonitor(getAdjacentMonitor(this.monitor, Side.RIGHT));
                    break;
                case 'gTile-k-up-monitor-move':
                    this.MoveToMonitor(getAdjacentMonitor(this.monitor, Side.TOP));
                    break;
                case 'gTile-k-down-monitor-move':
                    this.MoveToMonitor(getAdjacentMonitor(this.monitor, Side.BOTTOM));
                    break;
                case 'gTile-k-first-grid':
                    (_b = (_a = this.app.config.gridSettingsButton) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b._onButtonPress();
                    break;
                case 'gTile-k-second-grid':
                    (_d = (_c = this.app.config.gridSettingsButton) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d._onButtonPress();
                    break;
                case 'gTile-k-third-grid':
                    (_f = (_e = this.app.config.gridSettingsButton) === null || _e === void 0 ? void 0 : _e[2]) === null || _f === void 0 ? void 0 : _f._onButtonPress();
                    break;
                case 'gTile-k-fourth-grid':
                    (_h = (_g = this.app.config.gridSettingsButton) === null || _g === void 0 ? void 0 : _g[3]) === null || _h === void 0 ? void 0 : _h._onButtonPress();
                    break;
            }
            this.keyElement = this.elements[this.rowKey] ? this.elements[this.rowKey][this.colKey] : null;
            if (this.keyElement)
                this.keyElement._onHoverChanged();
        };
        this.BeginTiling = () => {
            if (this.keyElement) {
                this.keyElement._onButtonPress();
                this.Reset();
            }
        };
        this.MoveToMonitor = (monitor) => {
            monitor = monitor ? monitor : this.monitor;
            if (monitor.index == this.monitor.index)
                return;
            this.app.MoveToMonitor(this.monitor, monitor !== null && monitor !== void 0 ? monitor : this.monitor);
        };
        this.destroy = () => {
            for (let r in this.elements) {
                for (let c in this.elements[r]) {
                    this.elements[r][c]._destroy();
                }
            }
            this.elementsDelegate._destroy();
            this.topbar._destroy();
            this.RemoveKeyControls();
            this.Reset();
            this.monitor = null;
            this.rows = null;
            this.title = null;
            this.cols = null;
        };
        this.app = app;
        this.tableHeight = 200;
        this.tableWidth = 220;
        this.borderwidth = 2;
        this.actor = new BoxLayout({
            vertical: true,
            style_class: 'grid-panel',
            reactive: true,
            can_focus: true,
            track_hover: true
        });
        this.actor.connect('enter-event', this.OnMouseEnter);
        this.actor.connect('leave-event', this.OnMouseLeave);
        this.topbar = new TopBar(this.app, title);
        this.bottombar = new Table({
            homogeneous: true,
            style_class: 'bottom-box',
            can_focus: true,
            track_hover: true,
            reactive: true,
        });
        this.veryBottomBar = new Table({
            homogeneous: true,
            style_class: 'bottom-box very-bottom-box',
            can_focus: true,
            track_hover: true,
            reactive: true,
        });
        this.RebuildGridSettingsButtons();
        this.table = new BoxLayout({
            style_class: 'table',
            can_focus: true,
            track_hover: true,
            reactive: true,
            vertical: true,
            width: this.tableWidth,
            height: this.tableHeight
        });
        this.actor.add(this.topbar.actor, { x_fill: true });
        this.actor.add(this.table, { x_fill: false });
        this.actor.add(this.bottombar, { x_fill: false });
        this.actor.add(this.veryBottomBar, { x_fill: false });
        this.monitor = monitor;
        this.rows = rows;
        this.title = title;
        this.cols = cols;
        this.isEntered = false;
        let toggle = new ToggleSettingsButton(this.app.config, 'animation', SETTINGS_ANIMATION, "animation_black-symbolic");
        this.veryBottomBar.add(toggle.actor, { row: 0, col: 0, x_fill: false, y_fill: false });
        this.toggleSettingButtons.push(toggle);
        toggle = new ToggleSettingsButton(this.app.config, 'auto-close', SETTINGS_AUTO_CLOSE, "auto_close_black-symbolic");
        this.veryBottomBar.add(toggle.actor, { row: 0, col: 1, x_fill: false, y_fill: false });
        this.toggleSettingButtons.push(toggle);
        let action = new AutoTileMainAndList(this.app);
        this.veryBottomBar.add(action.actor, { row: 0, col: 2, x_fill: false, y_fill: false });
        action.connect('resize-done', this.OnResize);
        let actionTwo = new AutoTileTwoList(this.app);
        this.veryBottomBar.add(actionTwo.actor, { row: 0, col: 3, x_fill: false, y_fill: false });
        actionTwo.connect('resize-done', this.OnResize);
        this.x = 0;
        this.y = 0;
        this.interceptHide = false;
        this.RebuildGridElements();
        this.normalScaleY = this.actor.scale_y;
        this.normalScaleX = this.actor.scale_x;
    }
    ChangeCurrentMonitor(monitor) {
        this.monitor = monitor;
        for (const row of this.elements) {
            for (const element of row) {
                element.monitor = this.monitor;
            }
        }
    }
    GetTableUnits(width, height) {
        const rowSpans = this.rows.map(r => r.span).reduce((p, c) => p += c);
        const colSpans = this.cols.map(r => r.span).reduce((p, c) => p += c);
        const widthUnit = width / colSpans - (2 * this.borderwidth);
        const heightUnit = height / rowSpans - (2 * this.borderwidth);
        return [Math.round(widthUnit), Math.round(heightUnit)];
    }
    UpdateSettingsButtons() {
        for (const button of this.toggleSettingButtons) {
            button["_update"]();
        }
    }
    Reset() {
        this.colKey = -1;
        this.rowKey = -1;
        this.keyElement = null;
        this.elementsDelegate.reset();
    }
    async Show(x, y) {
        if (x != null && y != null)
            this.SetPosition(x, y);
        this.interceptHide = true;
        this.elementsDelegate.reset();
        let time = this.app.config.animation ? 0.3 : 0;
        this.actor.raise_top();
        Grid_Main.layoutManager.removeChrome(this.actor);
        Grid_Main.layoutManager.addChrome(this.actor);
        this.actor.scale_y = 0;
        if (time > 0) {
            await new Promise((resolve) => {
                Grid_Tweener.addTween(this.actor, {
                    time: time,
                    opacity: 255,
                    visible: true,
                    transition: 'easeOutQuad',
                    scale_y: this.normalScaleY,
                    onComplete: () => { resolve(); this.OnShowComplete(); }
                });
            });
        }
        else {
            this.actor.opacity = 255;
            this.actor.visible = true;
            this.actor.scale_y = this.normalScaleY;
        }
        this.interceptHide = false;
        this.BindKeyControls();
    }
    Hide(immediate) {
        this.RemoveKeyControls();
        this.Reset();
        let time = this.app.config.animation && !immediate ? 0.3 : 0;
        if (time > 0) {
            Grid_Tweener.addTween(this.actor, {
                time: time,
                opacity: 0,
                visible: false,
                scale_y: 0,
                transition: 'easeOutQuad',
                onComplete: this.OnHideComplete
            });
        }
        else {
            this.actor.opacity = 0;
            this.actor.visible = false;
            this.actor.scale_y = 0;
        }
    }
    SetPosition(x, y) {
        this.x = x;
        this.y = y;
        this.actor.set_position(x, y);
    }
};
Grid = Grid_decorate([
    addSignals
], Grid);

;

;// CONCATENATED MODULE: ./src/3_8/extension.ts



const Cinnamon = imports.gi.Cinnamon;
const extension_St = imports.gi.St;
const extension_Main = imports.ui.main;
const extension_Tweener = imports.ui.tweener;
let metadata;
class App {
    constructor() {
        this.visible = false;
        this.tracker = Cinnamon.WindowTracker.get_default();
        this.monitors = extension_Main.layoutManager.monitors;
        this.focusMetaWindowConnections = [];
        this.focusMetaWindowPrivateConnections = [];
        this.area = new extension_St.BoxLayout({ style_class: 'grid-preview' });
        this.focusMetaWindow = null;
        this.RefreshGrid = () => {
            this.grid.RefreshGridElements();
            extension_Main.layoutManager["_chrome"].updateRegions();
        };
        this.GetNotFocusedWindowsOfMonitor = (monitor) => {
            return extension_Main.getTabList().filter((w) => {
                let app = this.tracker.get_window_app(w);
                let w_monitor = extension_Main.layoutManager.monitors[w.get_monitor()];
                if (app == null) {
                    return false;
                }
                if (w.minimized) {
                    return false;
                }
                if (w_monitor !== monitor) {
                    return false;
                }
                return this.focusMetaWindow !== w && w.get_wm_class() != null;
            });
        };
        this.ToggleUI = () => {
            if (this.visible) {
                this.HideUI();
            }
            else {
                this.ShowUI();
            }
            return this.visible;
        };
        this.MoveToMonitor = async (current, newMonitor) => {
            if (current.index == newMonitor.index)
                return;
            this.grid.ChangeCurrentMonitor(newMonitor);
            this.MoveUIActor();
        };
        this.ShowUI = () => {
            var _a;
            this.focusMetaWindow = getFocusApp();
            let wm_type = this.focusMetaWindow.get_window_type();
            let layer = this.focusMetaWindow.get_layer();
            this.area.visible = true;
            if (this.focusMetaWindow && wm_type !== 1 && layer > 0) {
                let grid = this.grid;
                let window = getFocusApp();
                grid.ChangeCurrentMonitor((_a = this.monitors.find(x => x.index == window.get_monitor())) !== null && _a !== void 0 ? _a : extension_Main.layoutManager.primaryMonitor);
                let pos_x = window.get_outer_rect().width / 2 + window.get_outer_rect().x;
                let pos_y = window.get_outer_rect().height / 2 + window.get_outer_rect().y;
                grid.Show(Math.floor(pos_x - grid.actor.width / 2), Math.floor(pos_y - grid.actor.height / 2));
                this.OnFocusedWindowChanged();
                this.visible = true;
            }
            this.MoveUIActor();
        };
        this.HideUI = () => {
            this.grid.elementsDelegate.reset();
            this.grid.Hide(false);
            this.area.visible = false;
            this.ResetFocusedWindow();
            this.visible = false;
            extension_Main.layoutManager["_chrome"].updateRegions();
        };
        this.ReInitialize = () => {
            this.monitors = extension_Main.layoutManager.monitors;
            this.DestroyGrid();
            this.InitGrid();
        };
        this.DestroyGrid = () => {
            if (typeof this.grid != 'undefined') {
                this.grid.Hide(true);
                extension_Main.layoutManager.removeChrome(this.grid.actor);
            }
        };
        this.MoveUIActor = () => {
            if (!this.visible) {
                return;
            }
            let window = this.focusMetaWindow;
            if (!window)
                return;
            let grid = this.grid;
            const aspect = GetMonitorAspectRatio(grid.monitor);
            const newTableWidth = (aspect.widthIsLonger) ? 200 * aspect.ratio : 200;
            const newTableHeight = (aspect.widthIsLonger) ? 200 : 200 * aspect.ratio;
            const gridWidth = grid.actor.width + (newTableWidth - grid.table.width);
            const gridHeight = grid.actor.height + (newTableHeight - grid.table.height);
            let pos_x;
            let pos_y;
            let monitor = grid.monitor;
            let isGridMonitor = window.get_monitor() === grid.monitor.index;
            if (isGridMonitor) {
                pos_x = window.get_outer_rect().width / 2 + window.get_outer_rect().x;
                pos_y = window.get_outer_rect().height / 2 + window.get_outer_rect().y;
            }
            else {
                pos_x = monitor.x + monitor.width / 2;
                pos_y = monitor.y + monitor.height / 2;
            }
            pos_x = Math.floor(pos_x - gridWidth / 2);
            pos_y = Math.floor(pos_y - gridHeight / 2);
            if (isGridMonitor) {
                pos_x = pos_x < monitor.x ? monitor.x : pos_x;
                pos_x = pos_x + gridWidth > monitor.width + monitor.x ? monitor.x + monitor.width - gridWidth : pos_x;
                pos_y = pos_y < monitor.y ? monitor.y : pos_y;
                pos_y = pos_y + gridHeight > monitor.height + monitor.y ? monitor.y + monitor.height - gridHeight : pos_y;
            }
            let time = this.config.animation ? 0.3 : 0.1;
            grid.AdjustTableSize(time, newTableWidth, newTableHeight);
            extension_Tweener.addTween(grid.actor, {
                time: time,
                x: pos_x,
                y: pos_y,
                transition: 'easeOutQuad',
                onComplete: this.updateRegions
            });
        };
        this.updateRegions = () => {
            extension_Main.layoutManager["_chrome"].updateRegions();
        };
        this.OnFocusedWindowChanged = () => {
            let window = getFocusApp();
            if (!window) {
                this.ResetFocusedWindow();
                this.grid.topbar._set_title('gTile');
                return;
            }
            this.ResetFocusedWindow();
            this.focusMetaWindow = window;
            this.grid.ChangeCurrentMonitor(this.monitors[this.focusMetaWindow.get_monitor()]);
            let actor = this.focusMetaWindow.get_compositor_private();
            if (actor) {
                this.focusMetaWindowPrivateConnections.push(actor.connect('size-changed', this.MoveUIActor));
                this.focusMetaWindowPrivateConnections.push(actor.connect('position-changed', this.MoveUIActor));
            }
            let app = this.tracker.get_window_app(this.focusMetaWindow);
            let title = this.focusMetaWindow.get_title();
            if (app)
                this.grid.topbar._set_app(app, title);
            else
                this.grid.topbar._set_title(title);
            this.MoveUIActor();
        };
        this.ResetFocusedWindow = () => {
            var _a, _b;
            if (this.focusMetaWindowConnections.length > 0) {
                for (var idx in this.focusMetaWindowConnections) {
                    (_a = this.focusMetaWindow) === null || _a === void 0 ? void 0 : _a.disconnect(this.focusMetaWindowConnections[idx]);
                }
            }
            if (this.focusMetaWindowPrivateConnections.length > 0) {
                let actor = (_b = this.focusMetaWindow) === null || _b === void 0 ? void 0 : _b.get_compositor_private();
                if (actor) {
                    for (let idx in this.focusMetaWindowPrivateConnections) {
                        actor.disconnect(this.focusMetaWindowPrivateConnections[idx]);
                    }
                }
            }
            this.focusMetaWindow = null;
            this.focusMetaWindowConnections = [];
            this.focusMetaWindowPrivateConnections = [];
        };
        extension_Main.uiGroup.add_actor(this.area);
        this.config = new Config(this);
        this.InitGrid();
        this.tracker.connect("notify::focus-app", this.OnFocusedWindowChanged);
        global.screen.connect('monitors-changed', this.ReInitialize);
    }
    get FocusMetaWindow() {
        return this.focusMetaWindow;
    }
    get Grid() {
        return this.grid;
    }
    destroy() {
        this.config.destroy();
        this.DestroyGrid();
        this.ResetFocusedWindow();
    }
    InitGrid() {
        this.grid = new Grid(this, extension_Main.layoutManager.primaryMonitor, 'gTile', this.config.nbCols, this.config.nbRows);
        extension_Main.layoutManager.addChrome(this.grid.actor, { visibleInFullscreen: true });
        this.grid.actor.set_opacity(0);
        this.grid.Hide(true);
        this.grid.connect('hide-tiling', this.HideUI);
    }
}
let app;
const init = (meta) => {
    metadata = meta;
    imports.gi.Gtk.IconTheme.get_default().append_search_path(metadata.path + "/../icons");
};
const enable = () => {
    app = new App();
};
const disable = () => {
    app.destroy();
};

gtile = __webpack_exports__;
/******/ })()
;