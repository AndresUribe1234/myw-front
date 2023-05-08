import Link from "next/link";
import styles from "../../styles/NavigationLink.module.scss";
const NavigationLink = (props) => {
  return (
    <Link
      href={props.href}
      className={[
        styles.linkNavigation,
        props.className ? props.className : "",
      ].join(" ")}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
};

export default NavigationLink;
