import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { provideApollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloClient, HttpLink } from '@apollo/client/core';

export function createApollo(): ApolloClientOptions<any> {
  return {
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
    }),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideApollo(createApollo),
  ],
};
