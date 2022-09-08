import { CommentType } from "./comment"

export type Post = {
  aggregateId: string,
  title: string,
  author: string,
  favorite: string,
  comments: CommentType[]
}
