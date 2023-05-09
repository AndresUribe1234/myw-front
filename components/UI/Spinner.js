import classes from "../../styles/Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes["loading-container"]}>
      <div className={classes.spinner}></div>
      <p>cargando información...</p>
    </div>
  );
};

export default Spinner;
