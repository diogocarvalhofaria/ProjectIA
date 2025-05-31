import { Component, OnInit } from '@angular/core';
import { GraphqlService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h2>Usuários via GraphQL</h2>
    <ul>
      <li *ngFor="let usuario of usuarios">{{ usuario.nome }}</li>
    </ul>
  `,
})
export class AppComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit() {
    this.graphqlService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
