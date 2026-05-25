import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: { username: string; password: string }) {
    const { username, password } = body;

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return { message: 'User not found' };
    }

    if (user.password !== password) {
      return { message: 'Wrong password' };
    }

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}