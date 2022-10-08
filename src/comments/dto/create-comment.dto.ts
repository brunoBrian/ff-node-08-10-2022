import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from '../entities/comment.entity';

export class CreateCommentDto extends CommentEntity {
  @ApiProperty({
    description: 'ID de um usuario existente',
    example: '12345',
  })
  user_id: string;

  @ApiProperty({
    description: 'Comentário',
    example: 'Algum comentário',
  })
  comment: string;
}
