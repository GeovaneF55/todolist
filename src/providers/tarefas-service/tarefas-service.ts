import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class TarefasServiceProvider {

  url:string = 'https://my-json-server.typicode.com/GeovaneF55/todolist-repo';

  tarefas = [
    {id: 1, projeto: 1, descricao: 'Iniciar o ADA',
     data: new Date(2018, 9, 26), prioridade: 3},
    {id: 2, projeto: 1, descricao: 'Implementar ADA',
     data: new Date(2018, 9, 27), prioridade: 3},
    {id: 3, projeto: 2, descricao: 'Fazer trabalho em Grupo',
     data: new Date(2018, 9, 22), prioridade: 2},
    {id: 4, projeto: 2, descricao: 'Fazer Trabalho Individual',
     data: new Date(2018, 10, 10), prioridade: 2},
    {id: 5, projeto: 3, descricao: 'Estudar para Prova',
     data: new Date(2018, 9, 20), prioridade: 1},
    {id: 6, projeto: 4, descricao: 'Fazer Trabalho em Grupo',
     data: new Date(2018, 9, 17), prioridade: 2},
    {id: 7, projeto: 5, descricao: 'Fazer Tarefa 23',
     data: new Date(2018, 9, 19), prioridade: 1},
  ]
  ultimoid = 7;

  constructor(public http: HttpClient) {
    console.log('Hello TarefasServiceProvider Provider');
  }

  getTarefa(id: number): Promise<any>{
    return new Promise(resolve => {
      this.http.get(this.url + "/tarefas/" + id)
      .toPromise()
      .then( resposta => {
        let tarefa = {
          id: parseInt(resposta.id),
          projeto: parseInt(resposta.projeto),
          descricao: resposta.descricao,
          data: new Date(
            parseInt(resposta.data.substr(0, 4)),
            parseInt(resposta.data.substr(5, 2))-1,
            parseInt(resposta.data.substr(8, 2))
          ),
          prioridade: parseInt(resposta.prioridade)
        };
        resolve(tarefa);
      });
    });
  }

  getTarefas(): Promise<any[]>{
    return new Promise(resolve => {
      this.http.get(this.url + "/tarefas")
      .toPromise()
      .then( resposta => {
        let tarefas = [];
        for(let i=0; i<resposta.length; i++){
          tarefas.push({
            id: parseInt(resposta[i].id),
            projeto: parseInt(resposta[i].projeto),
            descricao: resposta[i].descricao,
            data: new Date(
              parseInt(resposta[i].data.substr(0, 4)),
              parseInt(resposta[i].data.substr(5, 2))-1,
              parseInt(resposta[i].data.substr(8, 2))
            ),
            prioridade: parseInt(resposta[i].prioridade)
          });
        }
        resolve(tarefas);
      });
    });
  }

  addTarefa(codProjeto:number, descricao:string, data:Date, prioridade:number){
    this.ultimoid++;
    this.tarefas.push({
      id: this.ultimoid,
      projeto: codProjeto,
      descricao: descricao,
      data: data,
      prioridade: prioridade
    });
  }

  editTarefa(id:number, codProjeto:number, descricao:string, data:Date, prioridade:number){
    for(let i=0; i<this.tarefas.length; i++){
      if(this.tarefas[i].id == id){
        this.tarefas[i].projeto = codProjeto;
        this.tarefas[i].descricao = descricao;
        this.tarefas[i].data = data;
        this.tarefas[i].prioridade = prioridade;
        break;
      }
    }
  }

  deleteTarefa(id:number){
    for(let i=0; i<this.tarefas.length; i++){
      if(this.tarefas[i].id == id){
        this.tarefas.splice(i,1);
        break;
      }
    }
  }

}
