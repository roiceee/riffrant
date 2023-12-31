"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
 
}
export default function CommentTextarea({ }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");

  const set = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const autoResize = () => {
    if (!ref.current) {
      return;
    }
    ref.current.style.height = "auto"; // Reset height to auto
    ref.current.style.height = ref.current.scrollHeight + "px"; // Set the height to the scrollHeight
  };

  useEffect(() => {
    autoResize();
  }, [ref]);

  return (
    <div className="mt-8 text-sm w-full">
      <h6 className="mb-2">Comment</h6>
      <textarea
        ref={ref}
        className="textarea textarea-bordered w-full overflow-y-hidden resize-none"
        placeholder="What are your thoughts?"
        onInput={autoResize}
        onChange={set}
        value={value}
      />
      <div className="text-right">
        <button className="btn btn-sm mt-2">Comment</button>
      </div>
    </div>
  );
}
