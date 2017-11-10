import { Component } from '@angular/core';
import { List } from 'linqts';
import { BudgetProvider } from '../../providers/BudgetProvider';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/UtilitiesProvider';
import { Res_es as Res } from '../../assets/resourses/res_es';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html'
})
export class BudgetPage {
  budgets:any;
  user:any = "d" ;
  idBudget:string= "";
  budget:any;
  isSave:boolean = true;;

  constructor(public navCtrl: NavController,
              public budgetProvider: BudgetProvider,
              public utilities:UtilitiesProvider,
              public alertCtrl: AlertController,
              public res: Res,
              public actionSheetCtrl: ActionSheetController) {
      this.findAllBudgets();
  }

  

  findAllBudgets() {
    this.budgetProvider.findAllBudgets({ user_id: this.user }).then((res) => {
      this.budgets = res;
    });
  }

  addBudgetForm(id, description) {
    debugger;
    let prompt = this.alertCtrl.create({
      title: 'Crear Budget',
      inputs: [
        {
          name: '_id',
          placeholder: 'Nombre',
          value: id 
        },
        {
          name: 'description',
          placeholder: 'Descripción',
          type: 'textarea',
          value: description 
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.validateBudget(data)
          }
        }
      ]
    });
    prompt.present();
  }

  validateBudget(budget){
    if(this.isSave){
    this.budgetProvider.findBudget({budget}).then((res) => {
      if (Object.keys(res).length) {
        this.utilities.showAlert("Ya hay un Budget con este nombre");
      }
      this.saveBudget(budget);
    });
  }else{
      this.updateBudget(budget);
  }
  }


  saveBudget(budget){
    budget.user_id = this.user;
    this.budgetProvider.saveBudget(budget).then((res) => {
      if(!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
      else 
       this.budgets.push(budget);
    });
  }

  updateBudget(budget){
    budget.user_id = this.user;
    this.budgetProvider.updateBudget(budget).then((res) => {
      if(!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
      else 
       this.budgets.push(budget);
    });
  }

  openSettings(budget){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Settings',
      buttons: [
        { text: 'Editar', 
          icon: 'paper',
          handler: () => {
            this.isSave = false;
            this.addBudgetForm(budget._id,budget.description);
          }
        },{
          text: 'Por defecto',
          icon: 'medal',
          handler: () => {
            this.setDefault(budget._id);
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          handler: () => {
            this.removeBudget(budget._id);
          }
        },{
          text: 'Salir',
          role: 'cancel',
          icon: 'redo'}
      ]
    });
    actionSheet.present();
  }

  getBudgetItems(_id){
    alert("sdfsd");
  }

  setDefault(_id){
    this.budgetProvider.setDefault(_id).then((res) => {
      if(!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
    });
  }

  removeBudget(_id){
    this.budgetProvider.removeBudget(_id).then((res) => {
      if(!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
      else {
      this.budgets = new List<any>(this.budgets)
        .Where(x => x._id !== _id)
        .ToArray();
      }
    });
  }
}
