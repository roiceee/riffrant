function NormalContainer({ children, className }: { children: React.ReactNode, className? : string }) {
  return <div className={"p-4 rounded-lg border shadow-sm " + className}>{children}</div>;
}

export default NormalContainer;
