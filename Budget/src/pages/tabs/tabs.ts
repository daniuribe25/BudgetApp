import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { BudgetPage } from '../budget/budget';
import { HomePage } from '../home/home';
import { NavParams, AlertController  } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab3Root: any = BudgetPage;
  tab2Root: any = AboutPage;
  
  

  constructor(public navParams:NavParams, public alertCtrl:AlertController) {

  }
}
