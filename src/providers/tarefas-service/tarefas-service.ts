import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class TarefasServiceProvider {

  url:string = 'https://my-json-server.typicode.com/GeovaneF55/todolist-repo';

  tarefas = [
    {codigo: 1, projeto: 1, descricao: 'Iniciar o ADA',
     data: new Date(2018, 9, 26), prioridade: 3},
    {codigo: 2, projeto: 1, descricao: 'Implementar ADA',
     data: new Date(2018, 9, 27), prioridade: 3},
    {codigo: 3, projeto: 2, descricao: 'Fazer trabalho em Grupo',
     data: new Date(2018, 9, 22), prioridade: 2},
    {codigo: 4, projeto: 2, descricao: 'Fazer Trabalho Individual',
     data: new Date(2018, 10, 10), prioridade: 2},
    {codigo: 5, projeto: 3, descricao: 'Estudar para Prova',
     data: new Date(2018, 9, 20), prioridade: 1},
    {codigo: 6, projeto: 4, descricao: 'Fazer Trabalho em Grupo',
     data: new Date(2018, 9, 17), prioridade: 2},
    {codigo: 7, projeto: 5, descricao: 'Fazer Tarefa 23',
     data: new Date(2018, 9, 19), prioridade: 1},
  ]
  ultimoCodigo = 7;

  constructor(public http: HttpClient) {
    console.log('Hello TarefasServiceProvider Provider');
  }

  getTarefas(): Promise<any[]>{
    return new Promise(resolve => {
      this.http.get(this.url + "/tarefas")
      .toPromise()
      .then( resposta => {
        let dados = resposta;
        let tarefas = [];
        for(let i=0; i<dados.length; i++){
          tarefas.push({
            codigo: parseInt(dados[i].codigo),
            projeto: parseInt(dados[i].projeto),
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

  addTarefa(codProjeto:number, descricao:string, data:Date, prioridade:number){
    this.ultimoCodigo++;
    this.tarefas.push({
      codigo: this.ultimoCodigo,
      projeto: codProjeto,
      descricao: descricao,
      data: data,
      prioridade: prioridade
    });
  }

  editTarefa(codigo:number, codProjeto:number, descricao:string, data:Date, prioridade:number){
    for(let i=0; i<this.tarefas.length; i++){
      if(this.tarefas[i].codigo == codigo){
        this.tarefas[i].projeto = codProjeto;
        this.tarefas[i].descricao = descricao;
        this.tarefas[i].data = data;
        this.tarefas[i].prioridade = prioridade;
        break;
      }
    }
  }

  deleteTarefa(codigo:number){
    for(let i=0; i<this.tarefas.length; i++){
      if(this.tarefas[i].codigo == codigo){
        this.tarefas.splice(i,1);
        break;
      }
    }
  }

}
