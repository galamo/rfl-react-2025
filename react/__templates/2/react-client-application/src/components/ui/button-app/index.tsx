// import "./index.css";
import css from "./buttonApp.module.css";

interface IProps {
  theme?: "DARK" | "LIGHT";
}
export default function ButtonApp(props: IProps) {
  const { theme = "DARK" } = props;
  return (
    <div>
      <button
        className={theme === "DARK" ? css.buttonAppDark : css.buttonAppLight}
      >
        Click to search
      </button>
    </div>
  );
}
