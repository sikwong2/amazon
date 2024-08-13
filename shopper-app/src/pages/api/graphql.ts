import { createYoga } from 'graphql-yoga';
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from 'type-graphql';

import { StripeResolver } from '@/graphql/stripe/resolver';
import { AuthResolver } from '../../graphql/auth/resolver'
import { nextAuthChecker } from '../../graphql/auth/checker';
import { OrdersResolver } from '@/graphql/orders/resolver';
import { MemberResolver } from '@/graphql/member/resolver';
import { ProductResolver } from '@/graphql/product/resolver';
import { ReviewResolver } from '@/graphql/review/resolver';

const schema = buildSchemaSync({
  resolvers: [AuthResolver, MemberResolver, ProductResolver, OrdersResolver, StripeResolver, ReviewResolver],
  validate: true, 
  authChecker: nextAuthChecker,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
