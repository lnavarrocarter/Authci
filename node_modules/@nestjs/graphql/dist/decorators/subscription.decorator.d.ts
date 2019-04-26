import { AdvancedOptions, ReturnTypeFunc } from './../external/type-graphql.types';
export interface SubscriptionOptions {
    filter?: <TPayload = any, TVariables = any, TContext = any>(payload: TPayload, variables: TVariables, context: TContext) => boolean;
    resolve?: <TPayload = any, TArgs = any, TContext = any, TInfo = any, TReturnValue = any>(payload: TPayload, args: TArgs, context: TContext, info: TInfo) => TReturnValue;
}
export declare function Subscription(): MethodDecorator;
export declare function Subscription(name: string): MethodDecorator;
export declare function Subscription(name: string, options: SubscriptionOptions): MethodDecorator;
export declare function Subscription(typeFunc: ReturnTypeFunc, options?: AdvancedOptions & SubscriptionOptions): MethodDecorator;
