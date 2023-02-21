import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // UserRepository를 주입시켜준 이유는 로그인후 토큰해석으로 부터 오는 사용자이름으로 사용자 여부를 확인하기 때문이다.
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      // auth.module.ts 에서 사용한 시크릿키( 생성시 )와 똑같은 것을 써줘야함
      // 여기서는 생성시가 아니라 반대로 확인할때 같은키로 여는 것과같이 같은 키로 확인할수 있다.
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      // Bearer타입으로 넘어오는 토큰을 받겠다는 뜻
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
