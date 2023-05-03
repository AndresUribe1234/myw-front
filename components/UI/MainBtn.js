import styles from "../../styles/MainBtn.module.scss";

const MainBtn = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      className={[styles.btn, props.className ? props.className : ""].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default MainBtn;
