import { IProps } from "./props";

export default function Header(props: IProps) {
  const { title = "Missing Title", color } = props;
  return <h1 style={{ color: color }}>{title}</h1>;
}
