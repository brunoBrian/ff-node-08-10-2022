import { CommentEntity } from '../entities/comment.entity';

export class CreateCommentDto extends CommentEntity {
  user_id: string;
  comment: string;
}
