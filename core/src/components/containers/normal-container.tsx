function NormalContainer({ children, className }: { children: React.ReactNode, className? : string }) {
  return <div className={"p-4 rounded-lg shadow-md bg-base-100 " + className}>{children}</div>;
}

export default NormalContainer;
