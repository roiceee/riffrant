"use client";
import { useCallback, useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
}

export default function CommentTextarea({ value, label, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.height = "auto"; // Reset height to auto
    ref.current.style.height = ref.current.scrollHeight + "px"; // Set the height to the scrollHeight
  }, []);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length >= 500) {
        return;
      }
      onChange(e);
    },
    [onChange]
  );

  useEffect(() => {
    autoResize();
  }, [ref, autoResize]);

  useEffect(() => {
    if (value === "") {
      autoResize();
    }
  }, [value, autoResize]);

  return (
    <div>
      <div className="label opacity-80">
        <span className="text-sm">{label}</span>
        <span className="text-sm">{value.length}/500</span>
      </div>
      <textarea
        ref={ref}
        className="textarea textarea-bordered w-full overflow-y-hidden resize-none border-2"
        placeholder="What are your thoughts?"
        onInput={autoResize}
        onChange={onChangeHandler}
        value={value}
      />
    </div>
  );
}
