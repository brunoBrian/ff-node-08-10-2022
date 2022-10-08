import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    description: 'Comentário',
    example: 'Algum comentário',
  })
  comment: string;
}
