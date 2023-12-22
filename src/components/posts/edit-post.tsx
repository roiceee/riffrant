"use client";
import { isBodyLengthMax, timeFormatter } from "@/lib/util";
import Post from "@/types/post";
import { useCallback, useContext, useState } from "react";
import NormalContainer from "../containers/normal-container";
import EditPostControl from "./edit-post-control";
import { useMutation } from "react-query";
import { editPost } from "@/lib/actions-client";
import { useRouter } from "next/navigation";
import GlobalAlertModal from "../util/global-alert";
import { GlobalAlertContext } from "@/context/global-alert";

interface Props {
  post: Post;
}

export default function EditPost({ post }: Props) {
  const router = useRouter();

  const { showAlert } = useContext(GlobalAlertContext);

  const [postContent, setPostContent] = useState<Post>(post);

  const mutation = useMutation({
    mutationFn: (postContent: Post) => {
      return editPost(postContent);
    },
    onSuccess: (data) => {
      if (!data) {
        showAlert("Error editing post");
      }
      showAlert("Post edited successfully");
      router.back();
      router.refresh();
    },
    onError: () => {
      showAlert("Error editing post");
    },
  });

  const onSubmit = useCallback(() => {
    mutation.mutate(postContent);
  }, [postContent, mutation]);

  //only body can be edited

  const bodyChange = (e: any) => {
    if (isBodyLengthMax(e.target.value)) {
      return;
    }
    setPostContent({ ...postContent, body: e.target.value });
  };

  const clearBody = () => {
    setPostContent({ ...postContent, body: "" });
  };

  return (
    <NormalContainer>
      <div>
        <div className="prose">
          <div>
            <div className="font-semibold opacity-80 text-xs">
              Posted by: {post.creatorName}
            </div>
          </div>
          <h3 className="mb-0 mt-2 break-words">{post.title}</h3>
          <div className="font-semibold opacity-80 text-xs">
            {timeFormatter(post.createdAt!)}
          </div>
        </div>
        <textarea
          className=" textarea textarea-bordered mt-12 w-full"
          value={postContent.body}
          onChange={bodyChange}
        />
        <EditPostControl
          postId={post._id!}
          onClear={clearBody}
          onSubmit={onSubmit}
          isLoading={mutation.isLoading}
        />
      </div>
    </NormalContainer>
  );
}
