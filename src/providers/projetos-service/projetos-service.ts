import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProjetosServiceProvider {

  url:string = 'https://my-json-server.typicode.com/GeovaneF55/todolist-repo';

  projetos = [
    {id: 1, nome: 'ADA'},
    {id: 2, nome: 'Redes I'},
    {id: 3, nome: 'Computação Gráfica'},
    {id: 4, nome: 'Processamento de Imagens'},
    {id: 5, nome: 'Computação Paralela'},
  ]
  ultimoid = 3;

  constructor(public http: HttpClient) {
    console.log('Hello ProjetosServiceProvider Provider');
  }

  getProjeto(id: number): Promise<any>{
    return new Promise(resolve => {
      this.http.get(this.url + "/projetos/" + id)
      .toPromise()
      .then( resposta => {
        let projeto = {
            id: parseInt(resposta.id),
            nome: resposta.projeto
          }
        resolve(projeto);
      });
    });
  }

  getProjetos(): Promise<any[]>{
    return new Promise(resolve => {
      this.http.get(this.url + "/projetos")
      .toPromise()
      .then( resposta => {
        let projetos = [];
        for(let i=0; i<resposta.length; i++){
          projetos.push({
            id: parseInt(resposta[i].id),
            nome: resposta[i].projeto
          });
        }
        resolve(projetos);
      });
    });
  }

  addProjeto(nome:string){
    this.ultimoid++;
    this.projetos.push({
      id: this.ultimoid,
      nome: nome
    });
  }

  editProjeto(id:number, nome:string){
    for(let i=0; i<this.projetos.length; i++){
      if(this.projetos[i].id == id){
        this.projetos[i].nome = nome;
        break;
      }
    }
  }

  deleteProjeto(id:number){
    for(let i=0; i<this.projetos.length; i++){
      if(this.projetos[i].id == id){
        this.projetos.splice(i,1);
        break;
      }
    }
  }

}
