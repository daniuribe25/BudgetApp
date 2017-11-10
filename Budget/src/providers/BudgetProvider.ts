import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from './config/appSettings';
import 'rxjs/add/operator/map';
import { UtilitiesProvider } from '../providers/UtilitiesProvider';

@Injectable()
export class BudgetProvider {
    headers:any = new Headers();

    constructor(private http: Http,
                public utilities:UtilitiesProvider) {
        this.headers.append('Content-Type', 'application/json');
    }

    findAllBudgets(user) {
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/findAllBudgets', JSON.stringify(user), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }

    findBudget(budget) {
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/findBudget', JSON.stringify(budget), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }

    validateBudget(budget) {
        this.utilities.showLoader();
        return new Promise(resolve => {
            this.http.post(AppSettings.ServerUrl + 'api/findBudget', JSON.stringify(budget), { headers: this.headers })
                .subscribe(res => {
                    this.utilities.hideLoader();
                    resolve(res.json().length > 0);
                });
        });
    }

    saveBudget(budget) {
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/saveBudget', JSON.stringify(budget), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }

    updateBudget(budget) {
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/updateBudget', JSON.stringify(budget), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }

    removeBudget(_id){
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/removeBudget', JSON.stringify({_id:_id}), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }

    setDefault(_id){
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/setDefault', JSON.stringify({_id:_id}), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }
}