"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ROUTE = void 0;
var main_layout_component_1 = require("./layout/app-layout/main-layout/main-layout.component");
var auth_guard_1 = require("@core/guard/auth.guard");
exports.APP_ROUTE = [
    {
        path: '',
        component: main_layout_component_1.MainLayoutComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
                    //return Promise.resolve().then(function () { return require('./dashboard/dashboard.routes'); }).then(function (m) { return m.DASHBOARD_ROUTE; });
                },
            ],
    },
    {
        path: 'authentication',
        loadChildren: () =>
            import('./authentication/auth.routes').then((m) => m.AUTH_ROUTE),
        //function (); {
            //return Promise.resolve().then(function () { return require('./authentication/auth.routes'); }).then(function (m) { return m.AUTH_ROUTE; });
        },
];
