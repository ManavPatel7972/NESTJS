import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student, StudentSchema } from './entities/student.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { logger } from 'src/common/middleware/logger.middleware';
import { LoggerMiddleware } from 'src/common/middleware/logger-class.middleware';
// import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule implements NestModule {
  //!All Path
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('students');
  // }
  //!Specific Path
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(logger).forRoutes({
  //     path: 'students',
  //     method: RequestMethod.GET,
  //   });
  // }

  // ! multiple middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger, LoggerMiddleware)
      .forRoutes({ path: 'students', method: RequestMethod.GET });
  }

  // //! exclude path
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(logger, LoggerMiddleware)
  //     .exclude({ path: 'students', method: RequestMethod.PATCH })
  //     .forRoutes({ path: 'students', method: RequestMethod.GET });
  // }

  //   //! auth middleware
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(AuthMiddleware)
  //       .forRoutes({ path: 'students/:id', method: RequestMethod.DELETE });
  //   }
}
