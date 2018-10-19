import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProjetosPage } from '../pages/projetos/projetos';
import { ProjetoPage } from '../pages/projeto/projeto';
import { TarefasPage } from '../pages/tarefas/tarefas';
import { TarefaPage } from '../pages/tarefa/tarefa';
import { TabsPage } from '../pages/tabs/tabs';

import { ProjetosServiceProvider } from '../providers/projetos-service/projetos-service';
import { TarefasServiceProvider } from '../providers/tarefas-service/tarefas-service';

import { Filtro } from '../filters/filters';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    Filtro,
    ProjetosPage,
    ProjetoPage,
    TarefasPage,
    TarefaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjetosPage,
    ProjetoPage,
    TarefasPage,
    TarefaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjetosServiceProvider,
    TarefasServiceProvider
  ]
})
export class AppModule {}
