import { Module } from '@nestjs/common';
import { MediaLibraryService } from './media-library.service';
import { MediaLibraryController } from './media-library.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MediaLibraryController],
  providers: [MediaLibraryService, PrismaService],
})
export class MediaLibraryModule {}
