import { useState, useContext } from "react";
import MainInput from "../UI/MainInput";
import MainBtn from "../UI/MainBtn";
import styles from "../../styles/CreateEventForm.module.scss";
import { useRouter } from "next/router";
import countryPhoneCodes from "@/store/countryPhoneCodes";
import RegistrationCartContext from "@/store/registration-cart-context";
import AuthContext from "@/store/auth-context";

const CheckoutForm = (props) => {
  const registrationCtx = useContext(RegistrationCartContext);
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [userWarning, setUserWarning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !authCtx.authObject.email ||
      !authCtx.user.name ||
      !authCtx.user.surname ||
      !authCtx.user.phoneNumber ||
      !authCtx.user.countryCode
    ) {
      console.log(
        "Hasta que la informacion no este completa no te puedes registrar al evento"
      );
      setUserWarning(true);
      return;
    }

    const formData = {
      title: registrationCtx.eventInformation?.title,
      currency_id: registrationCtx.eventInformation?.currency,
      unit_price: registrationCtx.eventInformation?.registrationFee,
      email: authCtx.authObject?.email,
      name: authCtx.user?.name,
      surname: authCtx.user?.surname,
      phone: authCtx.user?.phoneNumber,
      area_code: authCtx.user?.countryCode,
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
        />
        <MainInput
          value={registrationCtx.eventInformation?.currency}
          label="Moneda"
          id="currencyId"
          disabled
        />
        <MainInput
          value={authCtx.user.name}
          label="Nombre"
          id="name"
          disabled
        />
        <MainInput
          value={authCtx.user.surname}
          label="Apellido"
          id="surname"
          disabled
        />
        <MainInput
          value={authCtx.authObject.email}
          label="Correo Electrónico"
          id="email"
          type="email"
          disabled
        />
        <MainInput
          value={authCtx.user.phoneNumber}
          label="Teléfono"
          id="phone"
          disabled
        />
        <label htmlFor="areaCode" className={styles.countryCode}>
          Código de Área
          <select value={authCtx.user.countryCode} defaultValue={"57"} disabled>
            {countryPhoneCodes.map((phoneCode, index) => (
              <option
                value={phoneCode.code}
                key={index}
              >{`+${phoneCode.code} ${phoneCode.country}`}</option>
            ))}
          </select>
        </label>
      </div>
      {userWarning && (
        <p className={styles.warning_text}>
          Hasta que la información no esté completa, no será posible enviar el
          registro. Por favor, asegúrate de proporcionar todos los datos
          requeridos para poder completar el proceso de registro correctamente.
        </p>
      )}
      <div className={styles.button_container}>
        <MainBtn type="submit">Enviar</MainBtn>
        <MainBtn
          type="button"
          onClick={() => {
            router.push("/profile?from=checkout");
          }}
        >
          Modificar
        </MainBtn>
      </div>
    </form>
  );
};

export default CheckoutForm;
