import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res,
  ): Promise<{ message: string; user: User }> {
    const user = await this.authService.register(registerDto);

    return res.json({
      message: 'User registered successfully',
      user,
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.authService.login(loginDto);
    return res.json({
      message: 'User logged in successfully',
      token: user.token,
      user,
    });
  }
}
