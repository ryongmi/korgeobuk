import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { isWithinMinutes } from '../utils/date-diff-checker';

@Injectable()
export class OAuthStateGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.session.hasOwnProperty('stateCheck')) {
      // stateCheck이 없으면 요청 반환
      return false;
    }

    const { state: callbackState } = request.query;
    const { state: serverState, createAt } = request.session.stateCheck;

    if (
      !(
        callbackState === serverState &&
        isWithinMinutes(new Date(), new Date(createAt), 5)
      )
    ) {
      // state값이 다르거나, 5분 이내 요청이 아닐경우 요청 반환
      delete request.session['stateCheck'];
      return false;
    }

    return true;
  }
}
