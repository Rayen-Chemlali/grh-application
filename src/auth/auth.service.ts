import { Injectable } from "@nestjs/common";
import { AuthPayloadDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

const fakeUsers = [
  {
    id: 1,
    email: "oussema9100@gmail.com",
    password: "password123",
  },
  {
    id: 2,
    email: "hamza",
    password: "password123",
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ email, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.email === email);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
    return null;
  }
}
