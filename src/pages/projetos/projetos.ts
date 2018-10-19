import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service'
import { ProjetoPage } from '../projeto/projeto'

@Component({
  selector: 'page-projetos',
  templateUrl: 'projetos.html',
})
export class ProjetosPage {

  projetos: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public projetosService: ProjetosServiceProvider) {
    this.projetos = projetosService.getProjetos();
    console.log(this.projetos);
  }

  selecionaProjeto(c){
    let codigo = parseInt(c);
    this.navCtrl.push(ProjetoPage, {codigo: codigo});
  }

  novoProjeto(){
    console.log("Novo");
  }

}
