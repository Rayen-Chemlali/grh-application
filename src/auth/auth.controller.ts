import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { Request } from "express";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post("login")
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get("status")
  @UseGuards(JwtAuthGuard)
  Status(@Req() req: Request) {
    console.log("status");
    console.log(req.user);
    return req.user;
  }
}
