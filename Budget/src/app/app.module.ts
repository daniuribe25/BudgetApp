import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { BudgetPage } from '../pages/budget/budget';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { Res_es } from '../assets/resourses/res_es';
import { User } from '../models/User';
import { UserProvider } from '../providers/UserProvider';
import { BudgetProvider } from '../providers/BudgetProvider';
import { UtilitiesProvider } from '../providers/UtilitiesProvider'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    BudgetPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    BudgetPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Res_es, User,
    UserProvider,
    BudgetProvider,
    UtilitiesProvider
  ]
})
export class AppModule {}
