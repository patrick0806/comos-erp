import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaLibraryService } from './media-library.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Media Library')
@UseGuards(JwtAuthGuard)
@Controller('media-library')
export class MediaLibraryController {
  constructor(private mediaLibraryService: MediaLibraryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() image: Express.Multer.File): Promise<any> {
    return this.mediaLibraryService.saveImage(image);
  }
}
