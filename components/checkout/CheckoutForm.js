import React, { useRef, useState, useContext } from "react";
import MainInput from "../UI/MainInput";
import MainBtn from "../UI/MainBtn";
import styles from "../../styles/CreateEventForm.module.scss";
import { useRouter } from "next/router";
import countryPhoneCodes from "@/store/countryPhoneCodes";
import RegistrationCartContext from "@/store/registration-cart-context";

const CheckoutForm = (props) => {
  const router = useRouter();
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const areaRef = useRef();
  const priceRef = useRef();
  const currencyId = props?.currencyId || "COP";
  const registrationCtx = useContext(RegistrationCartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: registrationCtx.eventInformation?.title,
      currency_id: registrationCtx.eventInformation?.currency,
      unit_price: priceRef.current.value,
      email: emailRef.current.value,
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      phone: phoneRef.current.value,
      area_code: areaRef.current.value,
    };

    props.onRender(formData, registrationCtx.eventInformation?.suscriptionType);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.event_form}>
      <h1>información para la suscripción al evento</h1>
      <div className={styles.predifined_information}>
        <p>información predefinida</p>
        <MainInput
          value={registrationCtx.eventInformation?.title}
          label="Título"
          id="title"
          disabled
        />
        <MainInput
          value={registrationCtx.eventInformation?.suscriptionType}
          label="Tipo de suscripción"
          id="unitPrice"
          disabled
        />
        <MainInput
          value={registrationCtx.eventInformation?.registrationFee}
          label="Precio Unitario"
          id="unitPrice"
          type="number"
          disabled
          ref={priceRef}
        />
        <MainInput
          value={registrationCtx.eventInformation?.currency}
          label="moneda"
          id="currencyId"
          disabled
        />
      </div>
      <MainInput ref={nameRef} label="Nombre" id="name" required />
      <MainInput ref={surnameRef} label="Apellido" id="surname" required />
      <MainInput
        ref={emailRef}
        label="Correo Electrónico"
        id="email"
        type="email"
        required
      />
      <MainInput ref={phoneRef} label="Teléfono" id="phone" required />

      <label htmlFor="areaCode">Código de Área</label>
      <select ref={areaRef} defaultValue={"57"} required>
        {countryPhoneCodes.map((phoneCode, index) => (
          <option
            value={phoneCode.code}
            key={index}
          >{`+${phoneCode.code} ${phoneCode.country}`}</option>
        ))}
      </select>

      <MainBtn type="submit">Enviar</MainBtn>
    </form>
  );
};

export default CheckoutForm;
