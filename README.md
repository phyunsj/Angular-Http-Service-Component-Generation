# Angular Http Service Component Generation

### Generate Angular 5 Http Service Component out of sqlite3 table layout

Angular Project is from **_Angular In Action_**  Ch.2 Example https://github.com/angular-in-action/stocks (Credit to Author : **Jeremy Wilken**)

**YES, I PURCHASED THIS BOOK (_Angular In Action_ https://www.manning.com/books/angular-in-action).** I made minor changes in order to demonstrate sqlite3 integration (angular-in-action-stock folder. src/ only). 

## Directory

- EgiSample : Appweb 2 start-up program. public/ has a production version of stock project.
- angular-in-action-stock : src/ folder only. 
- codegen : python script to read database.xlsx and generate `*.cpp`/`*.h`/`*.ts`.
- lib : EgiForm, jsoncpp, sqlite3 - linked to EgiSample/simgpleEgi application. 
- test : SQL test scripts.

## Database 


**Portfolio.csv** (Portfolio tab from database.xlsx. Each tab represents a SQL table.) 

| Field | Type |
|-|-|
|companySymbol | string|
|companyName | string |
|lastTradePriceOnly | number |
|change | number |
|changeInPercent | number |

**Stock.csv** has the same schema to make simpler the whole process.

**stocks.db** is the sample databse created  by `unittest_create_db.py`. It has two tables (Portfolio and Stock)


## Code Generation

`codegen/generator.py` created the following files from `Portfolio` tab of `database.xlsx`

- `Portfolio.cpp` 
- `Portfolio.h`
- `rest_api_class_types.include` : **command enum, error code**
- `rest_api_switch_handler_pre.include` : **SQL INSERT/UPDATE/DELETE** STATEMENT
- `rest_api_switch_handler_post.include` : **SQL SELECT** STATEMENT
- `rest_api_switch_handler_column.include` : **Extract a value from each column**
- `portfolio.service.ts`: **Angular Http Service** for Portfolio Table. POST for all INSERT/UPDATE/DELETE/SELECT operations.


```
// AUTO-GENERATED
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let service: string = '/json.egi';

export interface PortfolioInterface {
	companySymbol : string;
	companyName : string;
	lastTradePriceOnly : number;
	change : number;
	changeInPercent : number;
}

@Injectable()
export class PortfolioService {

  constructor(private http: HttpClient) {}
  // INSERT
  add(portfolio) {   
     var payload = { action:402  , companySymbol:portfolio.companySymbol , companyName:portfolio.companyName , lastTradePriceOnly:portfolio.lastTradePriceOnly , change:portfolio.change , changeInPercent:portfolio.changeInPercent };
     return this.http.post<Array<PortfolioInterface>>(service, JSON.stringify(payload));
  }
  // SELECT
  load( key ) {
    var payload = { action:403, keys : key };
    return this.http.post<Array<PortfolioInterface>>(service, payload); 
  }
  // UPDATE
  update(portfolio) {  
     var payload = { action:404   , companySymbol:portfolio.companySymbol , companyName:portfolio.companyName , lastTradePriceOnly:portfolio.lastTradePriceOnly , change:portfolio.change , changeInPercent:portfolio.changeInPercent };
     return this.http.post<Array<PortfolioInterface>>(service, JSON.stringify(payload));
  }
  // DELETE
  remove(portfolio) {
    var payload = { action:405 , companySymbol:portfolio.companySymbol };
    return this.http.post<Array<PortfolioInterface>>(service, JSON.stringify(payload));
  }
}
```
## Change Log on "angular-in-action/stocks" Project

`.load([ ])` means read all entries from the table. 

`src/components/dashboard/dashboard.component.ts` : `IntervalObservable` 

Read all records(selected stock symbols) from PORTFOLIO table first and Read stock symbols(selected stock symbols only) from STOCK table.  
```
constructor(private selectedStock : PortfolioService, private unselectedStock  : StockService ) {
   ...
}
ngOnInit() {
   this.selectedStock.load([]).subscribe( 
              ... );
   this.httpSubscription = IntervalObservable.create(3000).subscribe(() => {
              this.unselectedStock.load(this.selectedStocks)
              .subscribe( 
              ... );
}
```

`src/components/dashboard/manage.component.ts` : `forkJoin` 

Read all records from PORTFOLIO table and STOCK table.
```
constructor(private selectedStock : PortfolioService, private unselectedStock  : StockService ) {
   ...
}
ngOnInit() {
    this.joinHandler = Observable.forkJoin([
      this.selectedStock.load([]),
      this.unselectedStock.load([])
    ]).subscribe(data => {
      //console.log(data);
      for (var stock of data[0] ) { // selectedStock
           this.selectedSymbols.push( stock.companySymbol );
      }     
      for (var stock of data[1] ) { // selectedStock
           this.unselectedSymbols.push( stock.companySymbol );
      }
    });
}
```
`src/components/dashboard/manage.component.html` : combine `*ngFor` and `*ngIf`. 

Display non-selected stock symbols on available stock table. 
```
    ...
    <table class="mdl-data-table mdl-data-table--selectable mdl-shadow--2dp" style="width: 100%;">
      <tbody>
        <ng-container *ngFor="let symbol of unselectedSymbols">
        <tr *ngIf="checkSymbols(symbol)"> 
          <td class="mdl-data-table__cell--non-numeric">{{symbol}}</td>
          <td style="padding-top: 6px;">
            <button class="mdl-button" (click)="add(symbol)">Add</button>
          </td>
        </tr>
        </ng-container>
      </tbody>
    </table>
    ...
```
![alt text](https://github.com/phyunsj/angular-service-component-generation/blob/master/stock.tracker.manage.png "Stock Manage Page")

## Appweb 2 Webserver

EGI handler manages POST requests for all requests from URI:`json.egi`. POST operations only. No JSON file is generated for this demo.

POST buffer size is fixed. Additional adjustment might be required. (Appweb is for an embbeded system)

`test/unittest-select.py` & `test/unittest-insert-delete.py` are to validate http post requests/responses. 



## TIPS



#### 1. sqlite3_column_text 



https://stackoverflow.com/questions/8798825/sqlite3-column-text-returned-data-gets-corrupted-during-finalize-close



If you need those strings after you call sqlite3_finalize then you'll have to copy them into memory that you control. In fact, due to the are valid until a type conversion occurs note, you should copy them immediately and only use (char*)sqlite3_column_text(stmt, 0); while you're making your own copies.

```
 JsonRes["result"][0]["USERNAME"] = (char *)sqlite3_column_text(stmt, 1);
```



#### 2. Dealing with JsonCpp Array

Other example can be found : http://garajeando.blogspot.com/2013/01/how-to-create-nested-jsoncpps-jsonvalue.html

```
JsonRes["result"] = Json::arrayValue;  
=> JsonRes becomes { result" : [] }
...
JsonRes["result"][0]["USERNAME"] = "john";
...
JsonRes["result"][1]["USERNAME"] = "micheal";
...
=> JsonRes becomes { "result" : [ { "USERNAME" , ... } , { "USERNAME" ,... } , ... ] }

```


#### 3. Build Sqlite (Amalgamation Version)  from https://www.sqlite.org/download.html


```
#!/bin/bash
# command-line tool/application
gcc shell.c sqlite3.c -lpthread -ldl -o sqlite3
# shared library
gcc -DSQLITE_THREADSAFE=0  -shared -fPIC sqlite3.c -o libsqlite3.so

```
