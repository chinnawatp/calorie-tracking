import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginInputDto } from './dto/login-input.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: number): Promise<User> {
    const user = await this.usersService.findOneOrFail(id);
    return user;
  }

  async login(input: LoginInputDto) {
    const ERROR_MESSAGE = 'Incorrect email or password';
    const user = await this.usersService.findOneByEmail(input.email);

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE);
    }

    const match = await bcrypt.compare(input.password, user.password);
    if (!match) {
      throw new BadRequestException(ERROR_MESSAGE);
    }

    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
