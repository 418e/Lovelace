interface LinesProps {
  lineCount: number;
}

const Lines: React.FC<LinesProps> = ({ lineCount }) => {
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="lines-container">
      {lines.map((line) => (
        <div key={line} className="line-number w-4 text-end">
          {line}
        </div>
      ))}
    </div>
  );
};

export default Lines;
