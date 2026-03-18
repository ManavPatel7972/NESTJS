import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './entities/student.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = new this.studentModel(createStudentDto);
    return student.save();
  }

  findAll() {
    return this.studentModel.find();
  }

  findOne(id: Types.ObjectId) {
    const stu = this.studentModel.findById(id);
    return stu;
  }

  update(id: Types.ObjectId, updateStudentDto: UpdateStudentDto) {
    const updatedStu = this.studentModel.findByIdAndUpdate(
      id,
      updateStudentDto,
    );
    return updatedStu;
  }

  remove(id: Types.ObjectId) {
    const deletedStu = this.studentModel.findByIdAndDelete(id);
    return deletedStu;
  }
}
