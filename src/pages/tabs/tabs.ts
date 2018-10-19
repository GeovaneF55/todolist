import { Component } from '@angular/core';

import { ProjetosPage } from '../projetos/projetos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProjetosPage;

  constructor() {

  }
}
