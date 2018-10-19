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

}
