import { DynamicModule, OnModuleInit } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLTypesLoader } from './graphql-types.loader';
import { GraphQLFactory } from './graphql.factory';
import { GqlModuleAsyncOptions, GqlModuleOptions } from './interfaces/gql-module-options.interface';
export declare class GraphQLModule implements OnModuleInit {
    private readonly httpAdapterHost;
    private readonly options;
    private readonly graphqlFactory;
    private readonly graphqlTypesLoader;
    protected apolloServer: ApolloServer;
    constructor(httpAdapterHost: HttpAdapterHost, options: GqlModuleOptions, graphqlFactory: GraphQLFactory, graphqlTypesLoader: GraphQLTypesLoader);
    static forRoot(options?: GqlModuleOptions): DynamicModule;
    static forRootAsync(options: GqlModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
    onModuleInit(): Promise<void>;
}
