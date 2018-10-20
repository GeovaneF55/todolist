import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service'
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'

@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html',
})
export class TarefaPage {

  projetos: any[];
  novo: boolean;
  
  idTarefa: string;
  idProjeto: string;
  descricao: string;
  prioridade: number;
  data: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tarefasService: TarefasServiceProvider,
              public projetosService: ProjetosServiceProvider) {
    projetosService.getProjetos().then( dados => {
      this.projetos = dados;
      this.novo = navParams.get('novo');
      this.idTarefa = navParams.get('id');

      if(!this.novo){
        tarefasService.getTarefa(this.idTarefa).then( tarefa => {
          this.idProjeto = tarefa.projeto;
          this.descricao = tarefa.descricao;
          this.prioridade = tarefa.prioridade;
          let d =  tarefa.data;
          this.data = d.getFullYear() + "-" +
                      ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                      ("0" + d.getDate()).substr(-2,2);
        });
      } else {
        this.idProjeto = this.projetos[0].id;
        this.descricao = "";
        this.prioridade = 3;
        let d = new Date();
        this.data = d.getFullYear() + "-" +
                    ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                    ("0" + d.getDate()).substr(-2,2);
      }
    });
  }

  incluir(){
    let d = new Date(parseInt(this.data.substr(0,4)),
                     parseInt(this.data.substr(5,2))-1,
                     parseInt(this.data.substr(8,2)));

    this.tarefasService.addTarefa(this.idProjeto,
                                  this.descricao,
                                  d,
                                  this.prioridade)
    .then(dados => {
      this.navCtrl.pop();
    });
  }

  alterar(){
    let d = new Date(parseInt(this.data.substr(0,4)),
                     parseInt(this.data.substr(5,2))-1,
                     parseInt(this.data.substr(8,2)));

    this.tarefasService.editTarefa(this.idTarefa,
                                   this.idProjeto,
                                   this.descricao,
                                   d,
                                   this.prioridade)
    .then(dados => {
      this.navCtrl.pop();
    });
  }

  excluir(){
    this.tarefasService.deleteTarefa(this.idTarefa)
    .then(dados => {
      this.navCtrl.pop();
    });
  }

}
