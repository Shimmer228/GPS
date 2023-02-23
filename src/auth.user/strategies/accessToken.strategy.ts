import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "MaP5OY942EhdHY+b83NKFTLALsV34O485mgViCGok364PkiVrpXfD1lA2nGREPxDM3uU3EHdxPDdmTtD19n9ZB+7XdanuvXYVnR1hU7csjiIXueoSXiAi63nuk1jvrZnmDZ3OyE0g5GYFM+UKN86jh7bikUsmLhXhr8S0ZqZQc9rk0iJeNNl+o8L2ENu+TpbFyOgK7mqhdmBencctWvIhnd3OtL8NPrqr0cYsaMlJ/L5Thsid/UlejW6DjB+/RseYLG3vbmhnOqgrfANezju2MKDkjUQrNkVUSMqUw1h6mxTd71mbdYiepUh8ywaYaxiGfWuBILfDypxP0ecO+u9vQ",
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}