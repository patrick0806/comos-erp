import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AuthDTO } from './authDTO';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword) return null;

    delete user.password;
    return user;
  }

  async login(user: AuthDTO) {
    const dbUser = await this.usersService.findUser(user.email);
    const payload = {
      username: dbUser.email,
      sub: dbUser.id,
      name: dbUser.name,
      image: dbUser.image,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '4d' }),
    };
  }
}
