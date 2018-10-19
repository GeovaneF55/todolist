import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'

@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {

  codigoProjeto: number;
  nomeProjeto: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public projetosSetvice: ProjetosServiceProvider) {
    this.codigoProjeto = navParams.get('codigo');

    let projetos = projetosSetvice.getProjetos();
    for(let i=0; i<projetos.length; i++){
      if(projetos[i].codigo == this.codigoProjeto){
        this.nomeProjeto = projetos[i].nome;
        break;
      }
    }
  }

  alterar(){

  }

  excluir(){
    
  }

}
