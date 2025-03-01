import clsx from "clsx";
export default function Wrapper({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;

  return (
    <div className={clsx("w-full max-w-7xl mx-auto", className)} {...rest}>
      {children}
    </div>
  );
}
