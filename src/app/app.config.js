"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var app_routes_1 = require("./app.routes");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var core_2 = require("@angular/material/core");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var angular_feather_1 = require("angular-feather");
var icons_1 = require("angular-feather/icons");
var ng2_charts_1 = require("ng2-charts");
var async_1 = require("@angular/platform-browser/animations/async");
var jwt_interceptor_1 = require("@core/interceptor/jwt.interceptor");
exports.appConfig = {
    providers: [
        (0, http_1.provideHttpClient)(),
        (0, router_1.provideRouter)(app_routes_1.APP_ROUTE),
        (0, animations_1.provideAnimations)(),
        { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
        { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter },
        {
            provide: core_2.MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'YYYY-MM-DD',
                },
                display: {
                    dateInput: 'YYYY-MM-DD',
                    monthYearLabel: 'YYYY MMM',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'YYYY MMM',
                },
            },
        },
        { provide: http_1.HTTP_INTERCEPTORS, useClass: jwt_interceptor_1.JwtInterceptor, multi: true },
        (0, core_1.importProvidersFrom)(angular_feather_1.FeatherModule.pick(icons_1.allIcons)),
        (0, ng2_charts_1.provideCharts)((0, ng2_charts_1.withDefaultRegisterables)()),
        (0, http_1.provideHttpClient)((0, http_1.withInterceptorsFromDi)()),
        (0, async_1.provideAnimationsAsync)(),
    ],
};
