import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'

@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {

  codigoProjeto: number;
  nomeProjeto: string = "";
  novo: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public projetosService: ProjetosServiceProvider) {
    this.codigoProjeto = navParams.get('codigo');
    this.novo = navParams.get('novo');

    if(!this.novo){
      let projetos = projetosService.getProjetos();
      for(let i=0; i<projetos.length; i++){
        if(projetos[i].codigo == this.codigoProjeto){
          this.nomeProjeto = projetos[i].nome;
          break;
        }
      }
    }
  }

  incluir(){
    this.projetosService.addProjeto(this.nomeProjeto);
    this.navCtrl.pop();
  }

  alterar(){
    this.projetosService.editProjeto(this.codigoProjeto, this.nomeProjeto);
    this.navCtrl.pop();
  }

  excluir(){
    this.projetosService.deleteProjeto(this.codigoProjeto);
    this.navCtrl.pop();
  }

}
