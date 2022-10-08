import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComment } from './comments.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment')
    private commentModel: Model<IComment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = new this.commentModel(createCommentDto);

    const savedComment = await newComment.save();

    return savedComment;
  }

  async findAll() {
    const comments = await this.commentModel.find();

    return comments;
  }

  async findOne(id: string) {
    try {
      const comment = await this.commentModel.findById(id);

      if (!comment) {
        throw new NotFoundException(`Comentário ${id} não encontrado`);
      }

      return comment;
    } catch (err) {
      throw new NotFoundException(`Comentário ${id} não encontrado`);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.findOne(id);

    await this.commentModel.findOneAndUpdate({ _id: id }, updateCommentDto);

    const updatedComment = await this.findOne(id);

    return updatedComment;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.commentModel.findByIdAndDelete(id);
  }

  async findByUserId(id: string) {
    try {
      const comments = await this.commentModel.find({ user_id: id });

      if (!comments.length) {
        throw new NotFoundException(
          `Comentário do usuario ${id} não encontrado`,
        );
      }

      return comments;
    } catch (err) {
      throw new NotFoundException(`Comentário do usuario ${id} não encontrado`);
    }
  }
}
