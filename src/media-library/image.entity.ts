import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: false,
  })
  imageUrl: string;

  @Column({
    name: 'archived',
    type: 'boolean',
    unique: false,
    nullable: false,
    default: false,
  })
  archived?: boolean = false;
}
