import { Module } from '@nestjs/common';
import { HomeIdController } from './home-id.controller';
import { HomeIdService } from './home-id.service';

@Module({
  controllers: [HomeIdController],
  providers: [HomeIdService],
  exports: [HomeIdService],
})
export class HomeIdModule {}