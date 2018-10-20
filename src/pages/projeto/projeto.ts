import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'

@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {

  idProjeto: number;
  nomeProjeto: string = "";
  novo: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public projetosService: ProjetosServiceProvider) {
    this.idProjeto = navParams.get('id');
    this.novo = navParams.get('novo');

    if(!this.novo){
      projetosService.getProjetos().then( dados => {
        let projetos = dados;
        for(let i=0; i<projetos.length; i++){
          if(projetos[i].id == this.idProjeto){
            this.nomeProjeto = projetos[i].nome;
            break;
          }
        }
      });
    }
  }

  incluir(){
    this.projetosService.addProjeto(this.nomeProjeto);
    this.navCtrl.pop();
  }

  alterar(){
    this.projetosService.editProjeto(this.idProjeto, this.nomeProjeto);
    this.navCtrl.pop();
  }

  excluir(){
    this.projetosService.deleteProjeto(this.idProjeto);
    this.navCtrl.pop();
  }

}
