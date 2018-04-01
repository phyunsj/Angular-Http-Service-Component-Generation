// AUTO-GENERATED

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let service: string = '/json.egi';

export interface StockInterface {
  
	companySymbol : string;
	companyName : string;
	lastTradePriceOnly : number;
	change : number;
	changeInPercent : number;

}

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {}

  // INSERT
  add(stock) {   
     var payload = { action:408  , companySymbol:stock.companySymbol , companyName:stock.companyName , lastTradePriceOnly:stock.lastTradePriceOnly , change:stock.change , changeInPercent:stock.changeInPercent };

     return this.http.post<Array<StockInterface>>(service, JSON.stringify(payload));
  }

  // SELECT
  load( key ) {
    var payload = { action:409, keys : key };

    return this.http.post<Array<StockInterface>>(service, payload); 
  }

  // UPDATE
  update(stock) {  
     var payload = { action:410   , companySymbol:stock.companySymbol , companyName:stock.companyName , lastTradePriceOnly:stock.lastTradePriceOnly , change:stock.change , changeInPercent:stock.changeInPercent };

     return this.http.post<Array<StockInterface>>(service, JSON.stringify(payload));
  }

  // DELETE
  remove(stock) {
    var payload = { action:411 , companySymbol:stock.companySymbol };

    return this.http.post<Array<StockInterface>>(service, JSON.stringify(payload));
  }


}
