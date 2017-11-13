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
  budgets: any;
  user: any = "d";
  idBudget: string = "";
  budget: any;
  isSave: boolean = true;
  oldBudgetId: string = "";

  // constructor
  constructor(public navCtrl: NavController,
    public budgetProvider: BudgetProvider,
    public utilities: UtilitiesProvider,
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

  // open a modal form to insert budget data
  addBudgetForm(id, name, description) {
    this.oldBudgetId = id;
    let prompt = this.alertCtrl.create({
      title: 'Crear Budget',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre',
          value: name
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
            data._id = id;
            this.validateBudget(data)
          }
        }
      ]
    });
    prompt.present();
  }

  // validate the form is correct
  validateBudget(budget) {
    if (this.isSave) {
      this.budgetProvider.findBudget({ budget }).then((res) => {
        if (Object.keys(res).length) {
          this.utilities.showAlert("Ya hay un Budget con este nombre");
        }
        this.saveBudget(budget);
      });
    } else {
      this.updateBudget(budget);
    }
  }

  saveBudget(budget) {
    debugger;
    budget.user_id = this.user;
    this.budgetProvider.saveBudget(budget).then((res) => {
      if (!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
      else
        this.findAllBudgets();
    });
  }

  updateBudget(budget) {
    budget.user_id = this.user;
    this.budgetProvider.updateBudget(budget).then((res) => {
      if (!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
      else
        debugger;
      this.budgets.map(function (x) {
        if (x._id === budget._id) {
          x.name = budget.name;
          x.description = budget.description;
        }
        return x;
      });
    });
  }

  // open settings to execute some action
  openSettings(budget) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Settings',
      buttons: [
        {
          text: 'Editar',
          icon: 'paper',
          handler: () => {
            this.isSave = false;
            this.addBudgetForm(budget._id, budget.name, budget.description);
          }
        }, {
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
            this.removeBudget(budget);
          }
        }, {
          text: 'Salir',
          role: 'cancel',
          icon: 'redo'
        }
      ]
    });
    actionSheet.present();
  }

  getBudgetItems(_id) {
    alert("sdfsd");
  }


  setDefault(_id) {
    this.budgetProvider.setDefault(_id).then((res) => {
      if (!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
    });
  }

  removeBudget(budget) {
    this.budgetProvider.removeBudget(budget._id).then((res) => {
      if (!res.hasOwnProperty('ok'))
        this.utilities.showAlert(this.res.Error);
      else {
        this.budgets = new List<any>(this.budgets)
          .Where(x => x._id !== budget._id)
          .ToArray();
        if (budget.isDefault && this.budgets.length) {
          this.setDefault(this.budgets[0]._id);
        }
      }
    });
  }
}
