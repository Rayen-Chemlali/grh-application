import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { ProfileModule } from "./profile/profile.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
<<<<<<< src/app.module.ts
import { DocumentModule } from './document/document.module';
import { EvaluationModule } from "./evaluation/evaluation.module";
import { ProjectModule } from "./project/project.module";
import { AnnualGoalModule } from "./annual-goal/annual-goal.module";
import {EvaluationController} from "./evaluation/evaluation.controller";
import {ProjectController} from "./project/project.controller";
import {ProjectService} from "./project/project.service";
import { CongeModule } from "./conge/conge.module";
import {EvaluationService} from "./evaluation/evaluation.service"; // Import AnnualgoalModule
=======
import { DocumentModule } from "./document/document.module";
>>>>>>> src/app.module.ts

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RoleModule,
    ProfileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    DocumentModule,
<<<<<<< src/app.module.ts
    EvaluationModule,
    AnnualGoalModule,
    ProjectModule,
=======
    CongeModule,
>>>>>>> src/app.module.ts
  ],
  controllers: [AppController, EvaluationController,  ProjectController],
  providers: [AppService, EvaluationService, ProjectService],
})
export class AppModule {}
