import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "D6UfpB902j0YLTKQjbFouR8082uJX7iJSY/j91O85lg0+lVC0zg/AJTdBpd6rxknPupIfMRm38LWUsQ9K6wKgERFhtboiPT6TfOvERPDv2TvEFRjnuXDC9CTWCk1+Ii2CimbWCMAOUYifiFmpi8uumbarpUorHjRmzXR7mO6auIuFgkQiqxlXACQfZJR0I5qE2d41itzQ3MJCXoNmXh5CAOAlX3ztRzJ6o8II2daaKZrfa2ZlsctfCC7fSoAheci5QpXZfhqwYNe/9eFXIl9oKF7k0vsx6UmaeH3vp8t6A7h1zoDrdmAPV4O6kT3eAx8EZTWmZSuKD+6mvADaIKYFQ",
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}