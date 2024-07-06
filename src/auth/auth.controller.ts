import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){

    }
    @Post('login')
    login(@Body() authpayload: AuthPayloadDto){
        return this.authservice.validateUser(authpayload);
    }
}
