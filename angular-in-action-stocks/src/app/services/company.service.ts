// AUTO-GENERATED

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let service: string = '/json.egi';

export interface CompanyInterface {
  
	companySymbol : string;
	companyName : string;
	MarketValue : number;
	CEO : string;
	industry : string;

}

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) {}

  // INSERT
  add(company) {   
     var payload = { action:414  , companySymbol:company.companySymbol , companyName:company.companyName , MarketValue:company.MarketValue , CEO:company.CEO , industry:company.industry };

     return this.http.post<Array<CompanyInterface>>(service, JSON.stringify(payload));
  }

  // SELECT
  load( key ) {
    var payload = { action:415, keys : key };

    return this.http.post<Array<CompanyInterface>>(service, payload); 
  }

  // UPDATE
  update(company) {  
     var payload = { action:416   , companySymbol:company.companySymbol , companyName:company.companyName , MarketValue:company.MarketValue , CEO:company.CEO , industry:company.industry };

     return this.http.post<Array<CompanyInterface>>(service, JSON.stringify(payload));
  }

  // DELETE
  remove(company) {
    var payload = { action:417 , companySymbol:company.companySymbol };

    return this.http.post<Array<CompanyInterface>>(service, JSON.stringify(payload));
  }


}
