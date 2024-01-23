import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserRepository } from 'src/domain/user/user.repository';
import { UsersController } from './users.controller';
import { User } from 'src/domain/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
