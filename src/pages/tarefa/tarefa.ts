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
  
  codigoTarefa: number;
  codigoProjeto: number;
  descricao: string;
  prioridade: number;
  data: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tarefasService: TarefasServiceProvider,
              public projetosService: ProjetosServiceProvider) {
    this.projetos = projetosService.getProjetos();
    this.novo = navParams.get('novo');
    this.codigoTarefa = navParams.get('codigo');

    if(!this.novo){
      tarefasService.getTarefas().then( tarefas => {
        for(let i=0; i<tarefas.length; i++){
          if(tarefas[i].codigo == this.codigoTarefa){
            this.codigoProjeto = tarefas[i].projeto;
            this.descricao = tarefas[i].descricao;
            this.prioridade = tarefas[i].prioridade;
            let d =  tarefas[i].data;
            this.data = d.getFullYear() + "-" +
                        ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                        ("0" + d.getDate()).substr(-2,2);
          }
        }
      });
    } else {
      this.codigoProjeto = this.projetos[0].codigo;
      this.descricao = "";
      this.prioridade = 3;
      let d = new Date();
      this.data = d.getFullYear() + "-" +
                  ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                  ("0" + d.getDate()).substr(-2,2);
    }
  }

  incluir(){
    let d = new Date(parseInt(this.data.substr(0,4)),
                     parseInt(this.data.substr(5,2)),
                     parseInt(this.data.substr(8,2)));

    this.tarefasService.addTarefa(this.codigoProjeto,
                                  this.descricao,
                                  d,
                                  this.prioridade);
    this.navCtrl.pop();
  }

  alterar(){
    let d = new Date(parseInt(this.data.substr(0,4)),
                     parseInt(this.data.substr(5,2)),
                     parseInt(this.data.substr(8,2)));

    this.tarefasService.editTarefa(this.codigoTarefa,
                                   this.codigoProjeto,
                                   this.descricao,
                                   d,
                                   this.prioridade);
    this.navCtrl.pop();
  }

  excluir(){
    this.tarefasService.deleteTarefa(this.codigoTarefa);
    this.navCtrl.pop();
  }

}
