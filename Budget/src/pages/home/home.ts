import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
   user:string;
   pass:string;
   rootPage: any;
    constructor(public navCtrl: NavController) {
        
    }

    validarCredenciales() {
        this.navCtrl.setRoot(TabsPage,{
            user:this.user,
            pass:this.pass
        });
       
        console.log(this.user);
        console.log(this.pass);
    }
}