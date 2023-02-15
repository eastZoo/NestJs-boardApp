import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    console.log(authCredentialsDto);
    const { username, password } = authCredentialsDto;
    const user = this.userRepository.create({
      username: username,
      password: password,
    });
    await this.userRepository.save(user);
  }
}
