import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    async login(@Body() { username, password }: LoginDto) {
        return this.authService.login(username, password);
    }

    @Get('getProfile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getProfile(@Request() req: any) {
        return this.authService.getProfile(req.user);
    }
}