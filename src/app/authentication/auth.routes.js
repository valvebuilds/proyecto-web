"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ROUTE = void 0;
var signin_component_1 = require("./signin/signin.component");
var page404_component_1 = require("./page404/page404.component");
exports.AUTH_ROUTE = [
    {
        path: "",
        redirectTo: "signin",
        pathMatch: "full",
    },
    {
        path: "signin",
        component: signin_component_1.SigninComponent,
    },
    {
        path: "page404",
        component: page404_component_1.Page404Component,
    },
    { path: '**', redirectTo: 'page404', pathMatch: 'full' },
];
