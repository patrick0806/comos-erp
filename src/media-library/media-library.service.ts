import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { Image, Prisma } from '@prisma/client';
import AWS from 'aws-sdk';

@Injectable()
export class MediaLibraryService {
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  });

  constructor(private prismaService: PrismaService) {}

  async saveImage(image: Express.Multer.File): Promise<any> {
    const imageUrl = await this.uploadImageToS3(image);
    return this.prismaService.image.create({
      data: { url: imageUrl, archived: false },
    });
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
