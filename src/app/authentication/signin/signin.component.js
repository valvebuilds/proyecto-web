"use strict";
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
exports.SigninComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var sweetalert2_1 = require("sweetalert2");
var SigninComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.scss'],
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
            ],
            standalone: true,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SigninComponent = _classThis = /** @class */ (function () {
        function SigninComponent_1(formBuilder, router, authService) {
            this.formBuilder = formBuilder;
            this.router = router;
            this.authService = authService;
            this.submitted = false;
            this.loading = false;
            this.error = '';
            this.hide = true;
            this.email = '';
            this.password = '';
        }
        SigninComponent_1.prototype.ngOnInit = function () {
            this.authForm = this.formBuilder.group({
                username: ['', forms_1.Validators.required],
                password: ['', forms_1.Validators.required],
            });
        };
        Object.defineProperty(SigninComponent_1.prototype, "f", {
            get: function () {
                return this.authForm.controls;
            },
            enumerable: false,
            configurable: true
        });
        SigninComponent_1.prototype.onSubmit = function () {
            var _this = this;
            var _a, _b;
            this.submitted = true;
            this.error = '';
            if (this.authForm.invalid) {
                sweetalert2_1.default.fire('Error', 'Usuario y contraseña no válidos.', 'error');
                return;
            }
            this.authService
                .login((_a = this.authForm.get('username')) === null || _a === void 0 ? void 0 : _a.value, (_b = this.authForm.get('password')) === null || _b === void 0 ? void 0 : _b.value)
                .subscribe({
                next: function (res) {
                    if (res === null || res === void 0 ? void 0 : res.token) {
                        // Guardar el token
                        sessionStorage.setItem('accessToken', res.token);
                        // Mostrar en consola para depuración
                        console.log('Token recibido:', res.token);
                        // Actualizar el usuario en AuthService
                        _this.authService.setToken(res.token);
                        sweetalert2_1.default.fire({
                            title: 'Inicio de sesión exitoso',
                            text: 'Redirigiendo al dashboard...',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(function () {
                            _this.router.navigate(['/dashboard/main']);
                        });
                    }
                    else {
                        sweetalert2_1.default.fire('Error', 'Credenciales incorrectas.', 'error');
                    }
                },
                error: function (error) {
                    var _a;
                    _this.submitted = false;
                    _this.loading = false;
                    sweetalert2_1.default.fire('Error en el inicio de sesión', ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Error desconocido', 'error');
                }
            });
        };
        return SigninComponent_1;
    }());
    __setFunctionName(_classThis, "SigninComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SigninComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SigninComponent = _classThis;
}();
exports.SigninComponent = SigninComponent;
