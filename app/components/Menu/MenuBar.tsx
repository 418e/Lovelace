export const MenuBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="w-screen h-16 flex justify-start items-center flex-nowrap overflow-x-auto p-0">
      {children}
    </nav>
  );
};
