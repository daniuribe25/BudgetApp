import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';
import { Res_es as Res } from '../../assets/resourses/res_es';
import { UserProvider } from '../../providers/UserProvider';
import { UtilitiesProvider } from '../../providers/UtilitiesProvider';
import { User } from '../../models/User';

// declare var $:any;

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    user: User = new User();
    rootPage: any;
    alertMessage:string="";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public res: Res,
                public userProvider: UserProvider,
                public utilities:UtilitiesProvider) {
    }

    validarCredenciales() {
        if (this.user.user === undefined || this.user.user === "" || this.user.pass === undefined || this.user.pass === "") {
            this.utilities.showAlert(this.res.NoValidFormLogin);
            return;
        }
        this.userProvider.validateUserLogin({ user: this.user.user, pass: this.user.pass }).then((val) => {
            if (val) 
                this.navCtrl.setRoot(TabsPage, { user: this.user.user });
            else
                this.utilities.showAlert(this.res.NoUserFound);
        });
        
    }

    registrarUsuario() {
        this.navCtrl.push(RegistroPage);
    }
}