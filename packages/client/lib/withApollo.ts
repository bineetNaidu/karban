import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { withApollo as createWithApollo } from 'next-apollo';

const client = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:4242/graphql',
    credentials: 'include',

    headers: {
      host: !ctx ? undefined : ctx.req.headers.host,
      allow: !ctx ? undefined : ctx.req.headers.allow,
      accept: !ctx ? undefined : ctx.req.headers.accept,
      authorization: !ctx ? undefined : ctx.req.headers.authorization,
      cookie: !ctx ? undefined : ctx.req.headers.cookie,
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(client);
