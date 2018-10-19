import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service'
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'

@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

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

  selecionaTarefa(codigo){

  }

  novaTarefa(){
    
  }

}
