function NormalContainer({ children, className }: { children: React.ReactNode, className? : string }) {
  return <div className={"p-4 rounded-lg border shadow-md bg-neutral " + className}>{children}</div>;
}

export default NormalContainer;
