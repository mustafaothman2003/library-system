import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  national_id!: string;

  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  full_name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: ['librarian', 'admin'], default: 'librarian' })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
