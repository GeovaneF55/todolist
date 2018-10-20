import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProjetosServiceProvider {

  //url:string = "https://my-json-server.typicode.com/GeovaneF55/todolist-repo";
  url:string = "http://localhost:3000";

  constructor(public http: Http) {
    console.log('Hello ProjetosServiceProvider Provider');
  }

  getProjeto(id: string): Promise<Projeto>{
    return new Promise(resolve => {
      this.http.get(this.url + "/projetos/" + id)
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let projeto = {
            id: dados.id,
            projeto: dados.projeto
          }
        resolve(projeto);
      });
    });
  }

  getProjetos(): Promise<Projeto[]>{
    return new Promise(resolve => {
      this.http.get(this.url + "/projetos")
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let projetos = [];
        for(let i=0; i<dados.length; i++){
          projetos.push({
            id: dados[i].id,
            nome: dados[i].projeto
          });
        }
        resolve(projetos);
      });
    });
  }

  addProjeto(nome: string): Promise<any>{

    let headers = new Headers({"Content-type": "application/json"});

    let projeto = {
      projeto: nome,
    };

    let body = JSON.stringify(projeto);

    return new Promise( resolve => {
      this.http.post(this.url + '/projetos', body, {headers: headers})
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

  editProjeto(id: string, nome: string): Promise <any>{
    
    let headers = new Headers({"Content-type": "application/json"});

    let projeto = {
      projeto: nome,
    };

    let body = JSON.stringify(projeto);

    return new Promise( resolve => {
      this.http.put(this.url + '/projetos/' + id, body, {headers: headers})
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

  deleteProjeto(id: string): Promise <any>{

    return new Promise( resolve => {
      this.http.delete(this.url + "/projetos/" + id)
      .toPromise()
      .then(resposta => {
        resolve(resposta.json());
      });
    });
  }

}
