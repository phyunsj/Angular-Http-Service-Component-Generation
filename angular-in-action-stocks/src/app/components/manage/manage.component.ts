import { Component, OnInit, OnDestroy} from '@angular/core';

import { StockService , StockInterface } from '../../services/stock.service';
import { PortfolioService, PortfolioInterface  } from '../../services/portfolio.service';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit , OnDestroy {

  joinHandler: Subscription;

  selectedSymbols: Array<string>;
  unselectedSymbols: Array<string>;

  constructor(private selectedStock : PortfolioService, private unselectedStock  : StockService) {
    
    this.selectedSymbols = [];
    this.unselectedSymbols = [];
  }

  ngOnInit() {


    this.joinHandler = Observable.forkJoin([
      this.selectedStock.load([]),
      this.unselectedStock.load([])
    ]).subscribe(data => {
      console.log(data);

      for (var stock of data[0] ) { // selectedStock
           this.selectedSymbols.push( stock.companySymbol );
      }
      
      for (var stock of data[1] ) { // selectedStock
           this.unselectedSymbols.push( stock.companySymbol );
      }

    });
  }
  
  ngOnDestroy() {
    //this.joinHandler.unsubscribe();
  }

  add(symbol) {

    var stock = { 'companySymbol' : symbol };
    this.selectedStock.add(stock).subscribe( () => {
         
         this.selectedSymbols.push(symbol);
        
         // Err Handling is missing
    }); 
  }

  remove(symbol) {

    var stock = { 'companySymbol' : symbol };
    
    this.selectedStock.remove(stock).subscribe( () => {
         
         this.selectedSymbols = this.selectedSymbols.filter(function(item) { 
                                    return item !== symbol;
                                 });
         // Err Handling is missing
    }); 

  }

  checkSymbols ( symbol ) {
    return !this.selectedSymbols.includes ( symbol );  
  }
   
}
