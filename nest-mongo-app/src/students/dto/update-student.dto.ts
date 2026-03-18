import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  name?: string | undefined;
  email?: string | undefined;
  age?: number | undefined;
}
