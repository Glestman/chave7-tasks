

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {children}
    </div>
  );
}
