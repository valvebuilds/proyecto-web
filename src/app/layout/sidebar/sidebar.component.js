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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarComponent = void 0;
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var tooltip_1 = require("@angular/material/tooltip");
var button_1 = require("@angular/material/button");
var ngx_scrollbar_1 = require("ngx-scrollbar");
var _shared_1 = require("@shared");
var SidebarComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss'],
            standalone: true,
            imports: [
                ngx_scrollbar_1.NgScrollbar,
                button_1.MatButtonModule,
                router_1.RouterLink,
                tooltip_1.MatTooltipModule,
                router_1.RouterLinkActive,
                common_1.NgClass,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = _shared_1.UnsubscribeOnDestroyAdapter;
    var _instanceExtraInitializers = [];
    var _windowResizecall_decorators;
    var _onGlobalClick_decorators;
    var SidebarComponent = _classThis = /** @class */ (function (_super) {
        __extends(SidebarComponent_1, _super);
        function SidebarComponent_1(_document, _renderer, _elementRef, 
        // private readonly _authService: AuthService,
        _router, _domSanitizer) {
            var _this_1 = _super.call(this) || this;
            _this_1._document = (__runInitializers(_this_1, _instanceExtraInitializers), _document);
            _this_1._renderer = _renderer;
            _this_1._elementRef = _elementRef;
            _this_1._router = _router;
            _this_1._domSanitizer = _domSanitizer;
            _this_1.headerHeight = 60;
            _this_1.userLogged = '';
            _this_1.subs.sink = _this_1._router.events.subscribe(function (event) {
                if (event instanceof router_1.NavigationEnd) {
                    // close sidebar on mobile screen after menu select
                    _this_1._renderer.removeClass(_this_1._document.body, 'overlay-open');
                }
            });
            return _this_1;
            // const roleInfo = this._authService.getRoleInfoByToken();
            // this.userLogged = roleInfo ? roleInfo.roleName : undefined;
        }
        SidebarComponent_1.prototype.windowResizecall = function () {
            this.setMenuHeight();
            this.checkStatuForResize(false);
        };
        SidebarComponent_1.prototype.onGlobalClick = function (event) {
            if (!this._elementRef.nativeElement.contains(event.target)) {
                this._renderer.removeClass(this._document.body, 'overlay-open');
            }
        };
        SidebarComponent_1.prototype.callToggleMenu = function (event, length) {
            if (!this.isValidLength(length) || !this.isValidEvent(event)) {
                return;
            }
            var parentElement = event.target.closest('li');
            if (!parentElement) {
                return;
            }
            var activeClass = parentElement.classList.contains('active');
            if (activeClass) {
                this._renderer.removeClass(parentElement, 'active');
            }
            else {
                this._renderer.addClass(parentElement, 'active');
            }
        };
        SidebarComponent_1.prototype.isValidLength = function (length) {
            return length > 0;
        };
        SidebarComponent_1.prototype.isValidEvent = function (event) {
            return event && event.target instanceof HTMLElement;
        };
        SidebarComponent_1.prototype.sanitizeHtml = function (html) {
            return this._domSanitizer.bypassSecurityTrustHtml(html);
        };
        SidebarComponent_1.prototype.ngOnInit = function () {
            // const rolAuthority = this._authService.getAuthFromSessionStorage().rol_id;
            // this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem?.rolAuthority.includes(rolAuthority));
            // this.initLeftSidebar();
            // this.bodyTag = this._document.body;
        };
        SidebarComponent_1.prototype.initLeftSidebar = function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var _this = this;
            // Set menu height
            _this.setMenuHeight();
            _this.checkStatuForResize(true);
        };
        SidebarComponent_1.prototype.setMenuHeight = function () {
            this.innerHeight = window.innerHeight;
            var height = this.innerHeight - this.headerHeight;
            this.listMaxHeight = height + '';
            this.listMaxWidth = '500px';
        };
        SidebarComponent_1.prototype.isOpen = function () {
            return this.bodyTag.classList.contains('overlay-open');
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        SidebarComponent_1.prototype.checkStatuForResize = function (firstTime) {
            if (window.innerWidth < 1025) {
                this._renderer.addClass(this._document.body, 'ls-closed');
            }
            else {
                this._renderer.removeClass(this._document.body, 'ls-closed');
            }
        };
        SidebarComponent_1.prototype.mouseHover = function () {
            var body = this._elementRef.nativeElement.closest('body');
            if (body.classList.contains('submenu-closed')) {
                this._renderer.addClass(this._document.body, 'side-closed-hover');
                this._renderer.removeClass(this._document.body, 'submenu-closed');
            }
        };
        SidebarComponent_1.prototype.mouseOut = function () {
            var body = this._elementRef.nativeElement.closest('body');
            if (body.classList.contains('side-closed-hover')) {
                this._renderer.removeClass(this._document.body, 'side-closed-hover');
                this._renderer.addClass(this._document.body, 'submenu-closed');
            }
        };
        return SidebarComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "SidebarComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _windowResizecall_decorators = [(0, core_1.HostListener)('window:resize', ['$event'])];
        _onGlobalClick_decorators = [(0, core_1.HostListener)('document:mousedown', ['$event'])];
        __esDecorate(_classThis, null, _windowResizecall_decorators, { kind: "method", name: "windowResizecall", static: false, private: false, access: { has: function (obj) { return "windowResizecall" in obj; }, get: function (obj) { return obj.windowResizecall; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onGlobalClick_decorators, { kind: "method", name: "onGlobalClick", static: false, private: false, access: { has: function (obj) { return "onGlobalClick" in obj; }, get: function (obj) { return obj.onGlobalClick; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SidebarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SidebarComponent = _classThis;
}();
exports.SidebarComponent = SidebarComponent;
