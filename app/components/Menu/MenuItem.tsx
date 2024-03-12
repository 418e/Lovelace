export const MenuItem = ({
  Icon,
  action,
  title,
}: {
  Icon: React.FC<{ size: number; className: string }>;
  action: () => void;
  title: string;
}) => {
  return (
    <button
      className="text-center gap-0 p-2 min-w-6 h-full hover:bg-transparent/10"
      onClick={action}
    >
      <Icon size={24} className="mx-auto" />
      <div className="text-sm">{title}</div>
    </button>
  );
};
