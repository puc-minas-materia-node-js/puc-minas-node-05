import { Controller, HttpCode, Post, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth-guard/auth-guard.service";
import { LoginDto } from "./dtos/login.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    @Public()
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto.email, loginDto.password)
    }
}