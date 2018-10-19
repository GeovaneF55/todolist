import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjetosServiceProvider {

  projetos = [
    {codigo: 1, nome: 'ADA'},
    {codigo: 2, nome: 'Redes I'},
    {codigo: 3, nome: 'Computação Gráfica'},
    {codigo: 4, nome: 'Processamento de Imagens'},
    {codigo: 5, nome: 'Computação Paralela'},
  ]
  ultimoCodigo = 3;

  constructor(public http: HttpClient) {
    console.log('Hello ProjetosServiceProvider Provider');
  }

  getProjetos(){
    return this.projetos;
  }

  editProjeto(codigo:number, nome:string){
    for(let i=0; i<this.projetos.length; i++){
      if(this.projetos[i].codigo == codigo){
        this.projetos[i].nome = nome;
        break;
      }
    }
  }

  deleteProjeto(codigo:number){
    for(let i=0; i<this.projetos.length; i++){
      if(this.projetos[i].codigo == codigo){
        this.projetos.splice(i,1);
        break;
      }
    }
  }

}
