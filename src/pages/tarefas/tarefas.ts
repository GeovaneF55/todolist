import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service'
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'
import { TarefaPage } from '../tarefa/tarefa'

@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  rootPage = null;

  tarefas: any[] = [];
  projetos: any[] = [];
  filtroTarefas = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public tarefasService: TarefasServiceProvider,
              public projetosService: ProjetosServiceProvider) { }

  ionViewDidEnter(){
    this.tarefasService.getTarefas().then( dados => {
      this.tarefas = dados;
    });
    this.projetosService.getProjetos().then( dados => {
      this.projetos = dados;
    });
  }

  nomeProjeto(id): string{
    for(let i=0; i<this.projetos.length; i++){
      if(this.projetos[i].id == id){
        return this.projetos[i].nome;
      }
    }
    return "projeto não encontrado";
  }

  selecionaTarefa(id){
    this.navCtrl.push(TarefaPage, {id: id, novo: false});
  }

  novaTarefa(){
    this.navCtrl.push(TarefaPage, {id: 0, novo: true});
  }

  limpaFiltros(){
    this.filtroTarefas = {};
    this.menuCtrl.close();
  }

  filtroDias(qt_dias){
    this.filtroTarefas = { dias: qt_dias };
    this.menuCtrl.close();
  }

  filtroProjeto(id){
    this.filtroTarefas = { projeto: id };
    this.menuCtrl.close();
  }

}
