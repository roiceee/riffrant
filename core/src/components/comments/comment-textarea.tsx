"use client";
import { useCallback, useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CommentTextarea({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.height = "auto"; // Reset height to auto
    ref.current.style.height = ref.current.scrollHeight + "px"; // Set the height to the scrollHeight
  }, []);

  useEffect(() => {
    autoResize();
  }, [ref, autoResize]);

  useEffect(() => {
    if (value === "") {
      autoResize();
    }
  }, [value, autoResize]);

  return (
    <textarea
      ref={ref}
      className="textarea textarea-bordered w-full overflow-y-hidden resize-none border-2"
      placeholder="What are your thoughts?"
      onInput={autoResize}
      onChange={onChange}
      value={value}
    />
  );
}
