import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProjetosServiceProvider {

  url:string = 'https://my-json-server.typicode.com/GeovaneF55/todolist-repo';

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

  getProjetos(): Promise<any[]>{
    return new Promise(resolve => {
      this.http.get(this.url + "/projetos")
      .toPromise()
      .then( resposta => {
        let projetos = [];
        for(let i=0; i<resposta.length; i++){
          projetos.push({
            codigo: parseInt(resposta[i].codigo),
            nome: resposta[i].projeto
          });
        }
        resolve(projetos);
      });
    });
  }

  addProjeto(nome:string){
    this.ultimoCodigo++;
    this.projetos.push({
      codigo: this.ultimoCodigo,
      nome: nome
    });
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
