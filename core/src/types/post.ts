type Post = {
  _id?: string;
  creatorId?: string;
  creatorName?: string;
  title?: string;
  body?: string;
  comments?: number;
  upvotes?: Array<string>;
  downvotes?: Array<string>;
  score?: number;
  createdAt?: string;
};

export default Post;
