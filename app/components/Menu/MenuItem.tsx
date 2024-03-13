export const MenuItem = ({
  Icon,
  action,
  title,
  disabled,
}: {
  Icon: React.FC<{ size: number; className: string }>;
  action: () => void;
  title: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className="text-center gap-0 p-2 min-w-6 h-full hover:bg-transparent/10"
      onClick={() => !disabled && action()}
    >
      <Icon size={24} className={`mx-auto ${disabled && "text-zinc-600"}`} />
      <div className="text-sm">{title}</div>
    </button>
  );
};
