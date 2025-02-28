export default function Wrapper({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-full max-w-7xl mx-auto" {...props}>
      {children}
    </div>
  );
}
