import {
  SiC,
  SiCss3,
  SiGo,
  SiHtml5,
  SiImgur,
  SiJavascript,
  SiJson,
  SiMarkdown,
  SiPython,
  SiReact,
  SiRust,
  SiSass,
  SiSvg,
  SiTypescript,
} from "react-icons/si";
import { TiDocument } from "react-icons/ti";

export const useFsLogo = () => {
  const Logo = ({ suffix }: { suffix: string }): React.ReactElement => {
    switch (suffix) {
      case "html":
        return <SiHtml5 className="text-red-500" />;
      case "css":
        return <SiCss3 className="text-blue-400" />;
      case "scss":
        return <SiSass className="text-pink-600" />;
      case "js":
        return <SiJavascript className="text-yellow-400" />;
      case "mjs":
        return <SiJavascript className="text-yellow-400" />;
      case "ts":
        return <SiTypescript className="text-blue-400" />;
      case "jsx":
        return <SiReact className="text-blue-500" />;
      case "tsx":
        return <SiReact className="text-blue-500" />;
      case "rs":
        return <SiRust className="text-orange-500" />;
      case "go":
        return <SiGo className="text-blue-500" />;
      case "py":
        return <SiPython className="text-yello-400" />;
      case "c":
        return <SiC className="text-blue-500" />;
      case "md":
        return <SiMarkdown className="text-blue-500" />;
      case "json":
        return <SiJson className="text-green-600" />;
      case "png":
        return <SiImgur className="text-green-700" />;
      case "svg":
        return <SiSvg className="text-yello-500" />;
      default:
        return <TiDocument />;
    }
  };
  return Logo;
};
