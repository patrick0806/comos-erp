import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'main_filename',
    type: 'varchar',
    length: 140,
    unique: true,
    nullable: false,
  })
  mainFilename: string;

  @Column({
    name: 'original_filename',
    type: 'varchar',
    length: 140,
    nullable: false,
  })
  originalFilename: string;

  @Column({
    name: 'mimetype',
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  mimetype: string;

  @Column({
    name: 'original_file_url',
    type: 'varchar',
    length: 400,
    unique: true,
    nullable: false,
  })
  originalFileURL: string;

  @Column({
    name: 'extra_large_file_url',
    type: 'varchar',
    length: 400,
    unique: true,
    nullable: false,
  })
  extraLargeFileURL: string;

  @Column({
    name: 'large_file_url',
    type: 'varchar',
    length: 400,
    unique: true,
    nullable: false,
  })
  largeFileURL: string;

  @Column({
    name: 'medium_file_url',
    type: 'varchar',
    length: 400,
    unique: true,
    nullable: false,
  })
  mediumFileURL: string;

  @Column({
    name: 'small_file_url',
    type: 'varchar',
    length: 400,
    unique: true,
    nullable: false,
  })
  smallFileURL: string;

  @Column({
    name: 'thumbnail_file_url',
    type: 'varchar',
    length: 400,
    unique: true,
    nullable: false,
  })
  thumbnailFileURL: string;

  @Column({
    name: 'archived',
    type: 'boolean',
    unique: false,
    nullable: false,
  })
  archived?: boolean = false;

  @Column({
    name: 'file_size',
    type: 'integer',
    unique: false,
    nullable: false,
  })
  fileSize: number = 0;

  @Column({
    name: 'width',
    type: 'integer',
    unique: false,
    nullable: false,
  })
  width: number = 0;

  @Column({
    name: 'height',
    type: 'integer',
    unique: false,
    nullable: false,
  })
  height: number = 0;
}
