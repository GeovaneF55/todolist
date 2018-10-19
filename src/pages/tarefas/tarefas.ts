import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service'
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'
import { TarefaPage } from '../tarefa/tarefa'

@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  rootPage = null;

  tarefas: any[];
  projetos: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tarefasService: TarefasServiceProvider,
              public projetosService: ProjetosServiceProvider) {
    this.tarefas = tarefasService.getTarefas();
    this.projetos = projetosService.getProjetos();
  }

  nomeProjeto(codigo):string{
    for(let i=0; i<this.projetos.length; i++){
      if(this.projetos[i].codigo == codigo){
        return this.projetos[i].nome;
      }
    }
    return "projeto não encontrado";
  }

  selecionaTarefa(c){
    let codigo:number = parseInt(c);
    this.navCtrl.push(TarefaPage, {codigo: codigo, novo: false});
  }

  novaTarefa(){
    this.navCtrl.push(TarefaPage, {codigo: 0, novo: true});
  }

}
