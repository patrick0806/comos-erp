import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageEntity } from './image.entity';
import { MediaLibraryService } from './media-library.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media-library')
export class MediaLibraryController {
  constructor(private mediaLibraryService: MediaLibraryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ImageEntity> {
    return this.mediaLibraryService.saveImage(image);
  }
}
