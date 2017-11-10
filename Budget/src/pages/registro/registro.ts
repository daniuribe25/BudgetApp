import { Component } from '@angular/core';
import { Res_es as Res } from '../../assets/resourses/res_es';
import { User } from '../../models/User';
import { TabsPage } from '../tabs/tabs';
import { AlertController, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/UserProvider';
import { UtilitiesProvider } from '../../providers/UtilitiesProvider';
import { FormBuilder,Validators }   from '@angular/forms';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})

export class RegistroPage {
  user: User = new User;
  repeatPass: string;
  validUser:boolean = true;
  submitAttempt: boolean = false;
  

  constructor(public res: Res,
    public userParam: User,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public utilities:UtilitiesProvider,
    public formBuilder: FormBuilder) {
  }

  registerForm = this.formBuilder.group({
    name: ['',Validators.required],
    lastName: ['',Validators.required],
    user: ['',Validators.compose([Validators.required]), this.validateUser()],
    pass: ['',Validators.required],
    repeatPass: ['',Validators.required],
    email: ['',Validators.compose([Validators.email,Validators.required])]
});

  validateUser() {
    if (this.user.user !== undefined && this.user.user !== "") {
      this.userProvider.getUser({ user: this.user.user }).then((res) => {
        console.log(res);
        if (Object.keys(res).length) {
          this.validUser = false;
          this.utilities.showAlert(this.res.UserAlreadyExist);
        }else{
          this.validUser = true;
        }
      });
    }
  }

  validatePass(){
    var ret = true;
      if (this.user.pass !== undefined && this.user.pass !== "" && 
          this.repeatPass !== undefined && this.repeatPass !== "") {
         if(this.user.pass !== this.repeatPass){
          ret = false;
          this.utilities.showAlert(this.res.PassNoMatch);
         }
      }
      return ret;
    }

  registerUser(){
    this.submitAttempt = true;
    if(!this.registerForm.valid) return;
    if(!this.validatePass() || !this.validUser) return;
    
    this.userProvider.saveUser(this.user).then((res) => {
      if(!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
      else 
        this.navCtrl.setRoot(TabsPage, {
          user: this.user.user
      });
    });
    
  }

}
