import {commentView} from './commentView';

export type postView = {
    aggregateId: string,
    title: string,
    author: string,
    favorite: string,
    comments: commentView[]
}