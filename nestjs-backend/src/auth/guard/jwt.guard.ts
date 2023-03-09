import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    for (let x = 0; x < Constants.BYPASS_URLS.length; x++) {
      if (request.url == Constants.BYPASS_URLS[x]) {
        // return true means do not use guards and let go as it was.
        return true;
      }
    }
    //console.log(super.canActivate(context));

    return super.canActivate(context);
  }
}
