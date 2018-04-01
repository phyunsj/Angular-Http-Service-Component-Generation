webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\n  background: #f3f3f3;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header\">\n  <header class=\"mdl-layout__header\">\n    <div class=\"mdl-layout__header-row\">\n      <span class=\"mdl-layout-title\">Stock Portfolio Tracker</span>\n      <div class=\"mdl-layout-spacer\"></div>\n      <nav class=\"mdl-navigation mdl-layout--large-screen-only\">\n        <a class=\"mdl-navigation__link\" [routerLink]=\"['/']\">Dashboard</a>\n        <a class=\"mdl-navigation__link\" [routerLink]=\"['/manage']\">Manage</a>        \n      </nav>\n    </div>\n  </header>\n  <main class=\"mdl-layout__content\" style=\"padding: 20px;\">\n    <router-outlet></router-outlet>\n  </main>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_portfolio_service__ = __webpack_require__("../../../../../src/app/services/portfolio.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_stock_service__ = __webpack_require__("../../../../../src/app/services/stock.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_summary_summary_component__ = __webpack_require__("../../../../../src/app/components/summary/summary.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_manage_manage_component__ = __webpack_require__("../../../../../src/app/components/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_summary_summary_component__["a" /* SummaryComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_manage_manage_component__["a" /* ManageComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_10__app_routes__["a" /* AppRoutes */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__services_stock_service__["a" /* StockService */],
            __WEBPACK_IMPORTED_MODULE_5__services_portfolio_service__["a" /* PortfolioService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_manage_manage_component__ = __webpack_require__("../../../../../src/app/components/manage/manage.component.ts");



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__components_dashboard_dashboard_component__["a" /* DashboardComponent */]
    },
    {
        path: 'manage',
        component: __WEBPACK_IMPORTED_MODULE_2__components_manage_manage_component__["a" /* ManageComponent */]
    }
];
var AppRoutes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mdl-grid\"> \n  <div class=\"mdl-cell mdl-cell--12-col\" *ngIf=\"this.loading\" style=\"text-align: center;\">\n    <!-- Loading -->\n    <img   [src]=\"loadingSpinner\" />\n   \n  </div>\n  <div class=\"mdl-cell mdl-cell--3-col\" *ngFor=\"let stock of selectedCompany\">\n    <summary [stock]=\"stock\"></summary>\n  </div>\n  \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_stock_service__ = __webpack_require__("../../../../../src/app/services/stock.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_portfolio_service__ = __webpack_require__("../../../../../src/app/services/portfolio.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_IntervalObservable__ = __webpack_require__("../../../../rxjs/observable/IntervalObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_IntervalObservable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(selectedStock, unselectedStock) {
        //this.symbols = selectedStock.get();  // ch.2 supposed to get selected stocks from StockService
        this.selectedStock = selectedStock;
        this.unselectedStock = unselectedStock;
        this.loadingSpinner = "assets/loadingSpinner.gif";
        // PortfolioService   : selected stocks for my portfolio
        // StockService : all available stocks to choose from
        this.loading = true;
        this.active = true;
        this.selectedStocks = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedStock.load([])
            .subscribe(function (stocks) {
            for (var _i = 0, stocks_1 = stocks; _i < stocks_1.length; _i++) {
                var stock = stocks_1[_i];
                _this.selectedStocks.push(stock.companySymbol);
            }
            console.log(_this.selectedStocks);
        });
        this.httpSubscription = __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_IntervalObservable__["IntervalObservable"].create(3000) // get our data every subsequent 3 seconds
            .subscribe(function () {
            _this.unselectedStock.load(_this.selectedStocks)
                .subscribe(function (stocks) {
                _this.selectedCompany = stocks;
                _this.loading = false;
            });
        });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.active = false;
        this.httpSubscription.unsubscribe(); // use takeWhile() or unsubscribe()
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'dashboard',
        template: __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_portfolio_service__["a" /* PortfolioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_portfolio_service__["a" /* PortfolioService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_stock_service__["a" /* StockService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_stock_service__["a" /* StockService */]) === "function" && _b || Object])
], DashboardComponent);

var _a, _b;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/manage/manage.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"demo-grid-1 mdl-grid\">\n  <div class=\"mdl-cell mdl-cell--2-col\"></div>\n\n  <div class=\"mdl-cell mdl-cell--4-col\">\n    \n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"My Stock Portfolio\" readonly/>\n    <table class=\"mdl-data-table mdl-data-table--selectable mdl-shadow--2dp\" style=\"width: 100%;\">\n      <tbody>\n        <ng-container *ngFor=\"let symbol of selectedSymbols\">\n        <tr >\n          <td class=\"mdl-data-table__cell--non-numeric\">{{symbol}}</td>\n          <td style=\"padding-top: 6px;\">\n            <button class=\"mdl-button\" (click)=\"remove(symbol)\">Remove</button>\n          </td>\n        </tr>\n        </ng-container>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"mdl-cell mdl-cell--4-col\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Available Stock Symbols\" readonly/>\n    <table class=\"mdl-data-table mdl-data-table--selectable mdl-shadow--2dp\" style=\"width: 100%;\">\n      <tbody>\n        <ng-container *ngFor=\"let symbol of unselectedSymbols\">\n        <tr *ngIf=\"checkSymbols(symbol)\"> \n          <td class=\"mdl-data-table__cell--non-numeric\">{{symbol}}</td>\n          <td style=\"padding-top: 6px;\">\n            <button class=\"mdl-button\" (click)=\"add(symbol)\">Add</button>\n          </td>\n        </tr>\n        </ng-container>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"mdl-cell mdl-cell--2-col\"></div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_stock_service__ = __webpack_require__("../../../../../src/app/services/stock.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_portfolio_service__ = __webpack_require__("../../../../../src/app/services/portfolio.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ManageComponent = (function () {
    function ManageComponent(selectedStock, unselectedStock) {
        this.selectedStock = selectedStock;
        this.unselectedStock = unselectedStock;
    }
    ManageComponent.prototype.ngOnInit = function () {
        //this.selectedSymbols = this.selectedStock.get();
        var _this = this;
        // another option filter() instead of ngIf.
        // compare [ unselectedStocks] with [ selectedStocks]
        //.filter(function(e){return this.indexOf(e)<0;}, this.selectedSymbols); 
        //this.unselectedSymbols = this.unselectedStock.get();
        this.selectedSymbols = [];
        this.unselectedSymbols = [];
        this.joinHandler = __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].forkJoin([
            this.selectedStock.load([]),
            this.unselectedStock.load([])
        ]).subscribe(function (data) {
            console.log(data);
            for (var _i = 0, _a = data[0]; _i < _a.length; _i++) {
                var stock = _a[_i];
                _this.selectedSymbols.push(stock.companySymbol);
            }
            for (var _b = 0, _c = data[1]; _b < _c.length; _b++) {
                var stock = _c[_b];
                _this.unselectedSymbols.push(stock.companySymbol);
            }
        });
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        //this.joinHandler.unsubscribe();
    };
    ManageComponent.prototype.add = function (symbol) {
        var _this = this;
        var stock = { 'companySymbol': symbol };
        this.selectedStock.add(stock).subscribe(function () {
            _this.selectedSymbols.push(symbol);
        }); // http
        // another option instead of ngIf.
        //this.unselectedSymbols = this.unselectedSymbols.filter( stock =>  stock !== symbol )
    };
    ManageComponent.prototype.remove = function (symbol) {
        var _this = this;
        var stock = { 'companySymbol': symbol };
        this.selectedStock.remove(stock).subscribe(function () {
            _this.selectedSymbols = _this.selectedSymbols.filter(function (item) {
                return item !== symbol;
            });
        }); // http
    };
    ManageComponent.prototype.checkSymbols = function (symbol) {
        return !this.selectedSymbols.includes(symbol);
    };
    return ManageComponent;
}());
ManageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'manage',
        template: __webpack_require__("../../../../../src/app/components/manage/manage.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/manage/manage.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_portfolio_service__["a" /* PortfolioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_portfolio_service__["a" /* PortfolioService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_stock_service__["a" /* StockService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_stock_service__["a" /* StockService */]) === "function" && _b || Object])
], ManageComponent);

var _a, _b;
//# sourceMappingURL=manage.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/summary/summary.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host .stock-card {\n  background: #333333;\n}\n:host .stock-card.increase {\n  background: #558B2F;\n  color: #fff;\n}\n:host .stock-card.decrease {\n  background: #C62828;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/summary/summary.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mdl-card  mdl-shadow--2dp\"  style=\"width: 100%;\">\n  <span>\n    <div class=\"mdl-card__title stock-card\" [ngClass]=\"{increase: isPositive(), decrease: isNegative()}\">\n      <h4 style=\"color: #fff; margin: 0\">\n        {{stock?.companySymbol?.toUpperCase()}}<br />\n        {{stock?.lastTradePriceOnly | currency:'USD':'symbol':'.2'}}<br />\n        {{stock?.change | currency:'USD':'symbol':'.2'}} ({{stock?.changeInPercent | percent:'.2'}})\n      </h4>\n    </div>\n    <!-- <div class=\"mdl-card__supporting-text\">\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n    Aenan convallis.\n    </div> -->\n     <div class=\"mdl-card__actions mdl-card--border\">\n        <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\"  (click)=\"showDetails()\" >\n        More\n        </a>\n    </div>\n  </span>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/summary/summary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SummaryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SummaryComponent = (function () {
    function SummaryComponent() {
    }
    SummaryComponent.prototype.isNegative = function () {
        if (!this.stock || this.stock.change >= 0) {
            return false;
        }
        return true;
    };
    SummaryComponent.prototype.isPositive = function () {
        if (!this.stock || this.stock.change <= 0) {
            return false;
        }
        return true;
    };
    return SummaryComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Object)
], SummaryComponent.prototype, "stock", void 0);
SummaryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'summary',
        styles: [__webpack_require__("../../../../../src/app/components/summary/summary.component.css")],
        template: __webpack_require__("../../../../../src/app/components/summary/summary.component.html")
    })
], SummaryComponent);

//# sourceMappingURL=summary.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/portfolio.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortfolioService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var service = '/json.egi';
var PortfolioService = (function () {
    function PortfolioService(http) {
        this.http = http;
    }
    // INSERT
    PortfolioService.prototype.add = function (portfolio) {
        var payload = { action: 402, companySymbol: portfolio.companySymbol, companyName: portfolio.companyName, lastTradePriceOnly: portfolio.lastTradePriceOnly, change: portfolio.change, changeInPercent: portfolio.changeInPercent };
        return this.http.post(service, JSON.stringify(payload));
    };
    // SELECT
    PortfolioService.prototype.load = function (key) {
        var payload = { action: 403, keys: key };
        return this.http.post(service, payload);
    };
    // UPDATE
    PortfolioService.prototype.update = function (portfolio) {
        var payload = { action: 404, companySymbol: portfolio.companySymbol, companyName: portfolio.companyName, lastTradePriceOnly: portfolio.lastTradePriceOnly, change: portfolio.change, changeInPercent: portfolio.changeInPercent };
        return this.http.post(service, JSON.stringify(payload));
    };
    // DELETE
    PortfolioService.prototype.remove = function (portfolio) {
        var payload = { action: 405, companySymbol: portfolio.companySymbol };
        return this.http.post(service, JSON.stringify(payload));
    };
    return PortfolioService;
}());
PortfolioService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], PortfolioService);

var _a;
//# sourceMappingURL=portfolio.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/stock.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var service = '/json.egi';
var StockService = (function () {
    function StockService(http) {
        this.http = http;
    }
    // INSERT
    StockService.prototype.add = function (stock) {
        var payload = { action: 408, companySymbol: stock.companySymbol, companyName: stock.companyName, lastTradePriceOnly: stock.lastTradePriceOnly, change: stock.change, changeInPercent: stock.changeInPercent };
        return this.http.post(service, JSON.stringify(payload));
    };
    // SELECT
    StockService.prototype.load = function (key) {
        var payload = { action: 409, keys: key };
        return this.http.post(service, payload);
    };
    // UPDATE
    StockService.prototype.update = function (stock) {
        var payload = { action: 410, companySymbol: stock.companySymbol, companyName: stock.companyName, lastTradePriceOnly: stock.lastTradePriceOnly, change: stock.change, changeInPercent: stock.changeInPercent };
        return this.http.post(service, JSON.stringify(payload));
    };
    // DELETE
    StockService.prototype.remove = function (stock) {
        var payload = { action: 411, companySymbol: stock.companySymbol };
        return this.http.post(service, JSON.stringify(payload));
    };
    return StockService;
}());
StockService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], StockService);

var _a;
//# sourceMappingURL=stock.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map