import classes from "../../styles/Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes["loading-container"]}>
      <div className={classes.spinner}></div>
      <p>Loading data...</p>
    </div>
  );
};

export default Spinner;
