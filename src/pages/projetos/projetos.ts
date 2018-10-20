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
    projetosService.getProjetos().then( dados => {
      this.projetos = dados;
    });
  }

  selecionaProjeto(c){
    let id:number = parseInt(c);
    this.navCtrl.push(ProjetoPage, {id: id, novo: false});
  }

  novoProjeto(){
    this.navCtrl.push(ProjetoPage, {id: 0, novo: true});
  }

}
