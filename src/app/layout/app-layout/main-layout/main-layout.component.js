"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayoutComponent = void 0;
var bidi_1 = require("@angular/cdk/bidi");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var sidebar_component_1 = require("../../sidebar/sidebar.component");
var header_component_1 = require("../../header/header.component");
var _shared_1 = require("@shared");
var MainLayoutComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-main-layout',
            templateUrl: './main-layout.component.html',
            styleUrls: [],
            standalone: true,
            imports: [
                header_component_1.HeaderComponent,
                sidebar_component_1.SidebarComponent,
                bidi_1.BidiModule,
                router_1.RouterOutlet,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = _shared_1.UnsubscribeOnDestroyAdapter;
    var MainLayoutComponent = _classThis = /** @class */ (function (_super) {
        __extends(MainLayoutComponent_1, _super);
        function MainLayoutComponent_1(configService, document, renderer) {
            var _this = _super.call(this) || this;
            _this.configService = configService;
            _this.document = document;
            _this.renderer = renderer;
            _this.config = _this.configService.configData;
            return _this;
        }
        MainLayoutComponent_1.prototype.ngAfterViewInit = function () {
            //------------ set varient start----------------
            if (localStorage.getItem('theme')) {
                this.renderer.removeClass(this.document.body, this.config.layout.variant);
                this.renderer.addClass(this.document.body, localStorage.getItem('theme'));
            }
            else {
                this.renderer.addClass(this.document.body, this.config.layout.variant);
                localStorage.setItem('theme', this.config.layout.variant);
            }
            //------------ set varient end----------------
            //------------ set theme start----------------
            if (localStorage.getItem('choose_skin')) {
                //console.log("ENTRO PORQUE EXISTE CLASE");
                this.renderer.removeClass(this.document.body, 'theme-' + this.config.layout.theme_color);
                this.renderer.addClass(this.document.body, localStorage.getItem('choose_skin'));
                localStorage.setItem('choose_skin_active', localStorage.getItem('choose_skin').substring(6));
            }
            else {
                //console.log("ENTRO PORQUE NO EXISTE CLASE");
                //console.log(this.config);
                this.renderer.addClass(this.document.body, 'theme-' + this.config.layout.theme_color);
                localStorage.setItem('choose_skin', 'theme-' + this.config.layout.theme_color);
                localStorage.setItem('choose_skin_active', this.config.layout.theme_color);
            }
            //------------ set theme end----------------
            //------------ set RTL start----------------
            if (localStorage.getItem('isRtl')) {
                if (localStorage.getItem('isRtl') === 'true') {
                    this.setRTLSettings();
                }
                else if (localStorage.getItem('isRtl') === 'false') {
                    this.setLTRSettings();
                }
            }
            else {
                if (this.config.layout.rtl == true) {
                    this.setRTLSettings();
                }
                else {
                    this.setLTRSettings();
                }
            }
            //------------ set RTL end----------------
            //------------ set sidebar color start----------------
            if (localStorage.getItem('menuOption')) {
                this.renderer.addClass(this.document.body, localStorage.getItem('menuOption'));
            }
            else {
                this.renderer.addClass(this.document.body, 'menu_' + this.config.layout.sidebar.backgroundColor);
                localStorage.setItem('menuOption', 'menu_' + this.config.layout.sidebar.backgroundColor);
            }
            //------------ set sidebar color end----------------
            //------------ set logo color start----------------
            if (localStorage.getItem('choose_logoheader')) {
                this.renderer.addClass(this.document.body, localStorage.getItem('choose_logoheader'));
            }
            else {
                this.renderer.addClass(this.document.body, 'logo-' + this.config.layout.logo_bg_color);
            }
            //------------ set logo color end----------------
            //------------ set sidebar collapse start----------------
            if (localStorage.getItem('collapsed_menu')) {
                if (localStorage.getItem('collapsed_menu') === 'true') {
                    this.renderer.addClass(this.document.body, 'side-closed');
                    this.renderer.addClass(this.document.body, 'submenu-closed');
                }
            }
            else {
                if (this.config.layout.sidebar.collapsed == true) {
                    this.renderer.addClass(this.document.body, 'side-closed');
                    this.renderer.addClass(this.document.body, 'submenu-closed');
                    localStorage.setItem('collapsed_menu', 'true');
                }
                else {
                    this.renderer.removeClass(this.document.body, 'side-closed');
                    this.renderer.removeClass(this.document.body, 'submenu-closed');
                    localStorage.setItem('collapsed_menu', 'false');
                }
            }
            //------------ set sidebar collapse end----------------
        };
        MainLayoutComponent_1.prototype.setRTLSettings = function () {
            document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            this.renderer.addClass(this.document.body, 'rtl');
            localStorage.setItem('isRtl', 'true');
        };
        MainLayoutComponent_1.prototype.setLTRSettings = function () {
            document.getElementsByTagName('html')[0].removeAttribute('dir');
            this.renderer.removeClass(this.document.body, 'rtl');
            localStorage.setItem('isRtl', 'false');
        };
        return MainLayoutComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "MainLayoutComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MainLayoutComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MainLayoutComponent = _classThis;
}();
exports.MainLayoutComponent = MainLayoutComponent;
