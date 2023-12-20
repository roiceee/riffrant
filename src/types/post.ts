type Post = {
    _id?: string;
    creatorId?: string;
    creatorName?: string;
    title?: string;
    body?: string;
    upvotes?: Array<string>;
    downvotes?: Array<string>
    createdAt?: string;
}

export default Post;