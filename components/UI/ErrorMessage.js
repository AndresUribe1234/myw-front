import classes from "./../../styles/Error.module.scss";

const ErrorMessage = (props) => {
  return (
    <div className={classes["error-container"]}>
      <p>{`Error: ${props.error}`}</p>
    </div>
  );
};

export default ErrorMessage;
