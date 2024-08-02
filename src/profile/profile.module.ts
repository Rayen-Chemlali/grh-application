import { forwardRef, Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileEntity } from "./entity/profile.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    ConfigModule.forRoot({
      isGlobal: true, // Make the module globally available
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
