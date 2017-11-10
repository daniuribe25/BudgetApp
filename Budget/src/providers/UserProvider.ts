import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from './config/appSettings';
import 'rxjs/add/operator/map';
import { UtilitiesProvider } from '../providers/UtilitiesProvider';

@Injectable()
export class UserProvider {
    headers:any = new Headers();

    constructor(private http: Http,
                public utilities:UtilitiesProvider) {
        this.headers.append('Content-Type', 'application/json');
    }

    getUser(user) {
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/findUser', JSON.stringify(user), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }

    validateUserLogin(user) {
        this.utilities.showLoader();
        return new Promise(resolve => {
            this.http.post(AppSettings.ServerUrl + 'api/findUser', JSON.stringify(user), { headers: this.headers })
                .subscribe(res => {
                    this.utilities.hideLoader();
                    resolve(res.json().length > 0);
                });
        });
    }

    saveUser(user) {
        this.utilities.showLoader();
        return new Promise(resolve => {
        this.http.post(AppSettings.ServerUrl + 'api/saveUser', JSON.stringify(user), { headers: this.headers })
            .subscribe(res => {
                this.utilities.hideLoader();
                resolve(res.json());
            });
        });
    }

}