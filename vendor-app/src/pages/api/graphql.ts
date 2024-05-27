
import { createYoga } from 'graphql-yoga'
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from "type-graphql"

import { AuthResolver } from '../../graphql/auth/resolver'
import { nextAuthChecker } from '../../graphql/auth/checker';
import { MemberResolver } from '@/graphql/member/resolver';
import { APIKeyResolver } from '@/graphql/apikey/resolver';

const schema = buildSchemaSync({
  resolvers: [AuthResolver, MemberResolver, APIKeyResolver],
  validate: true, 
  authChecker: nextAuthChecker,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})