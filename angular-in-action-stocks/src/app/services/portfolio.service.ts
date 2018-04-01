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
