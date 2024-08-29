import { Module } from "@nestjs/common";
import { CongeService } from "./conge.service";
import { CongeController } from "./conge.controller";
import { UserEntity } from "../user/entity/user.entity";
import { CongeEntity } from "./entity/conge.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CongeEntity, UserEntity])],
  providers: [CongeService],
  controllers: [CongeController],
})
export class CongeModule {}
