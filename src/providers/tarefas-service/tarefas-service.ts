import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class TarefasServiceProvider {

  url:string = "https://my-json-server.typicode.com/GeovaneF55/todolist-db";
  //url:string = "http://localhost:3000";

  constructor(public http: Http) {
    console.log('Hello TarefasServiceProvider Provider');
  }

  getTarefa(id: string): Promise<Tarefa>{
    return new Promise(resolve => {
      this.http.get(this.url + "/tarefas/" + id)
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let tarefa: Tarefa = {
          id: dados.id,
          projeto: dados.projeto,
          descricao: dados.descricao,
          data: new Date(
            parseInt(dados.data.substr(0, 4)),
            parseInt(dados.data.substr(5, 2))-1,
            parseInt(dados.data.substr(8, 2))
          ),
          prioridade: parseInt(dados.prioridade)
        };
        resolve(tarefa);
      });
    });
  }

  getTarefas(): Promise<Tarefa[]>{
    return new Promise(resolve => {
      this.http.get(this.url + "/tarefas")
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let tarefas: Tarefa[] = [];
        for(let i=0; i<dados.length; i++){
          tarefas.push({
            id: dados[i].id,
            projeto: dados[i].projeto,
            descricao: dados[i].descricao,
            data: new Date(
              parseInt(dados[i].data.substr(0, 4)),
              parseInt(dados[i].data.substr(5, 2))-1,
              parseInt(dados[i].data.substr(8, 2))
            ),
            prioridade: parseInt(dados[i].prioridade)
          });
        }
        resolve(tarefas);
      });
    });
  }

  addTarefa(codProjeto: string, descricao: string, data: Date, prioridade: number): Promise<any>{

    let headers = new Headers({"Content-type": "application/json"});

    let tarefa = {
      projeto: codProjeto,
      descricao: descricao,
      data: data.getFullYear() + "-" +
            ("0" + (data.getMonth()+1)).substr(-2,2) + "-" +
            ("0" + data.getDate()).substr(-2,2),
      prioridade: prioridade
    };

    let body = JSON.stringify(tarefa);

    return new Promise( resolve => {
      this.http.post(this.url + '/tarefas', body, {headers: headers})
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

  editTarefa(id: string, codProjeto: string, descricao: string, data: Date,
    prioridade: number): Promise <any>{

    let headers = new Headers({"Content-type": "application/json"});

    let tarefa = {
      projeto: codProjeto,
      descricao: descricao,
      data: data.getFullYear() + "-" +
            ("0" + (data.getMonth()+1)).substr(-2,2) + "-" +
            ("0" + data.getDate()).substr(-2,2),
      prioridade: prioridade
    };

    let body = JSON.stringify(tarefa);

    return new Promise( resolve => {
      this.http.put(this.url + '/tarefas/' + id, body, {headers: headers})
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

  deleteTarefa(id: string): Promise<any>{

    return new Promise( resolve => {
      this.http.delete(this.url + "/tarefas/" + id)
      .toPromise()
      .then(resposta => {
        resolve(resposta.json());
      });
    });
  }

}
