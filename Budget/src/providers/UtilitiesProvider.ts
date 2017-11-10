import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Res_es as Res } from '../assets/resourses/res_es';

@Injectable()
export class UtilitiesProvider {
    loader:any;

    constructor(public alertCtrl: AlertController,
                public loading: LoadingController,
                public res: Res) {
                     
    }

    showAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: message,
            buttons: ['OK']
        });
          alert.present();
    }

 

    showLoader(){
        this.loader = this.loading.create({
            spinner:'hide',
           content:'<div class="loaderImage"></div><br />'+
                    ' <div class="custom-spinner-box">'+this.res.LoaderMessage+'</div>'
         });
        this.loader.present();
    }

    hideLoader(){
        this.loader.dismiss();
    }
  
}