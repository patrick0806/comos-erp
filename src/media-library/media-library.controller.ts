import { Body, Controller, Post } from '@nestjs/common';
import { MediaLibraryService } from './media-library.service';

@Controller('media-library')
export class MediaLibraryController {
  constructor(private mediaLibraryService: MediaLibraryService) {}

  @Post()
  uploadImage(@Body() image: Buffer) {
    return this.mediaLibraryService.uploadImage(image);
  }
}
