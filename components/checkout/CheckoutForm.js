import { useRef } from "react";
import MainBtn from "../UI/MainBtn";

const CheckoutForm = (props) => {
  const nameRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const nameEntered = nameRef.current.value;

    console.log("name entered", nameEntered);
    props.onRender();
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div>
        <label>Name</label>
        <input ref={nameRef}></input>
      </div>
      <MainBtn type="submit">Submit</MainBtn>
    </form>
  );
};

export default CheckoutForm;
