import { Component, OnInit , OnDestroy } from '@angular/core';
import { StockService, StockInterface } from '../../services/stock.service';
import { PortfolioService, PortfolioInterface } from '../../services/portfolio.service';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  private loading : boolean;
  private active : boolean;
  private httpSubscription: Subscription;
  private selectedStocks: Array<string>;
  private selectedCompany: Array<StockInterface>;

  loadingSpinner : string = "assets/loadingSpinner.gif";
  
  constructor(private selectedStock : PortfolioService, private unselectedStock  : StockService ) {

    // PortfolioService   : selected stocks for my portfolio
    // StockService : all available stocks to choose from
    this.loading = true;
    this.active = true;

    this.selectedStocks = [];
  }

  ngOnInit() {
    
    this.selectedStock.load([])
      //.first()                 // fired once - rxjs 5.5.x+
      .subscribe(stocks => {

        for (var stock of stocks) {
           this.selectedStocks.push( stock.companySymbol );
        }
        console.log( this.selectedStocks );
    });

    
    this.httpSubscription = IntervalObservable.create(3000)  // get our data every subsequent 3 seconds
      //.takeWhile(() => this.active) // only fires when component is active //rxjs 5.5.x+
      .subscribe(() => {
              this.unselectedStock.load(this.selectedStocks)
              .subscribe(stocks => {
                  this.selectedCompany = stocks;  
                  this.loading = false;  
            });
      });

  }

  ngOnDestroy() {
    this.active = false;
    this.httpSubscription.unsubscribe(); // comment if use takeWhile() 
  }

}
 