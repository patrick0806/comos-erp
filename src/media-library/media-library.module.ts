import { Module } from '@nestjs/common';
import { MediaLibraryService } from './media-library.service';
import { MediaLibraryController } from './media-library.controller';
import { ImageEntity } from './image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [MediaLibraryService],
  controllers: [MediaLibraryController],
})
export class MediaLibraryModule {}
