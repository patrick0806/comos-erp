import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './image.entity';
import AWS from 'aws-sdk';

interface ImageType {
  mimetype: string;
  extension: string;
}

const imageTransformations = [
  { id: 'thumbnail', width: 90, height: 90, strategy: 'auto', enhance: true },
  { id: 'small', width: 180, height: 180, strategy: 'auto', enhance: true },
  { id: 'medium', width: 360, height: 360, strategy: 'auto' },
  { id: 'large', width: 720, height: 720, strategy: 'auto' },
  { id: 'extra-large', width: 1080, height: 1080, strategy: 'auto' },
  { id: 'original', strategy: 'none' },
];

const supportedImageTypes: ImageType[] = [
  { mimetype: 'image/jpeg', extension: '.jpg' },
  { mimetype: 'image/png', extension: '.png' },
];

@Injectable()
export class MediaLibraryService {
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  });

  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  async saveImage(image: Express.Multer.File): Promise<ImageEntity> {
    const imageUrl = await this.uploadImageToS3(image);
    return this.imageRepository.save({ imageUrl });
  }

  private async uploadImageToS3(image: Express.Multer.File) {
    const formatedFileName = this.formatFilename(image.originalname);
    const s3params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: formatedFileName,
      Body: image.buffer,
    };
    const data = await this.s3.upload(s3params).promise();
    return data.Location;
  }

  private formatFilename(fileOrignalName: string) {
    const now = Date.now();
    const indexOfFileExtensionSeparator = fileOrignalName.lastIndexOf('.');
    const fileNameWithoutExtension = fileOrignalName.substring(
      0,
      indexOfFileExtensionSeparator,
    );
    return `${fileNameWithoutExtension}-${now}`;
  }
}
