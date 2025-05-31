import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getUsuarios(): Observable<any[]> {
    return this.apollo
      .watchQuery<{ usuarios: any[] }>({
        query: gql`
          query {
            usuarios {
              id
              nome
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.usuarios));
  }
}
