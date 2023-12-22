export default function PostControlContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-3 pt-2 border-t border-base-100">{children}</div>;
}
