import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const TransactionManager = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.queryRunnerManager;
  },
);
