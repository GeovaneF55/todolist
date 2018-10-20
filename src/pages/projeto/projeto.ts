import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'

@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {

  idProjeto: string;
  nomeProjeto: string = "";
  novo: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public projetosService: ProjetosServiceProvider) {
    this.idProjeto = navParams.get('id');
    this.novo = navParams.get('novo');

    if(!this.novo){
      projetosService.getProjeto(this.idProjeto)
      .then( projeto => {
        this.nomeProjeto = projeto.projeto;
      });
    }
  }

  incluir(){
    this.projetosService.addProjeto(this.nomeProjeto)
    .then( dados => {
      this.navCtrl.pop();
    });
  }

  alterar(){
    this.projetosService.editProjeto(this.idProjeto, this.nomeProjeto)
    .then( dados => {
      this.navCtrl.pop();
    });
  }

  excluir(){
    this.projetosService.deleteProjeto(this.idProjeto)
    .then( dados => {
      this.navCtrl.pop();
    });
  }

}
