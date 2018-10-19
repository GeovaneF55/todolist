import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TarefasServiceProvider {

  tarefas = [
    {codigo: 1, projeto: 1, descricao: 'Iniciar o ADA',
     data: new Date(2018, 10, 26), prioridade: 3},
    {codigo: 2, projeto: 1, descricao: 'Implementar ADA',
     data: new Date(2018, 10, 27), prioridade: 3},
    {codigo: 3, projeto: 2, descricao: 'Fazer trabalho em Grupo',
     data: new Date(2018, 10, 22), prioridade: 2},
    {codigo: 4, projeto: 2, descricao: 'Fazer Trabalho Individual',
     data: new Date(2018, 11, 10), prioridade: 2},
    {codigo: 5, projeto: 3, descricao: 'Estudar para Prova',
     data: new Date(2018, 10, 20), prioridade: 1},
    {codigo: 6, projeto: 4, descricao: 'Fazer Trabalho em Grupo',
     data: new Date(2018, 10, 17), prioridade: 2},
    {codigo: 7, projeto: 5, descricao: 'Fazer Tarefa 23',
     data: new Date(2018, 10, 19), prioridade: 1},
  ]

  constructor(public http: HttpClient) {
    console.log('Hello TarefasServiceProvider Provider');
  }

  getTarefas(): any[]{
    return this.tarefas;
  }

}
