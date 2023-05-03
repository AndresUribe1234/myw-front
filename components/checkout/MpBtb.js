import { useEffect } from "react";

// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

function MpBtn(props) {
  useEffect(() => {
    // The async function is needed since we can't do async stuff in the top level of our useEffect
    const fetchCheckout = async () => {
      console.log("Inicio de fetch...");
      console.log(process.env.NEXT_PUBLIC_NODE_URL + "/api/checkout");
      const res = await fetch(
        process.env.NEXT_PUBLIC_NODE_URL + "/api/checkout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      // data.global is the ID that MP returns from the API, it comes from our backend route
      if (data.global) {
        console.log("inside if block");
        const script = document.createElement("script"); // Here we create the empty script tag
        script.type = "text/javascript"; // The type of the script
        script.src = "https://sdk.mercadopago.com/js/v2"; // The link where the script is hosted
        script.setAttribute("data-preference-id", data.global); // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        document.body.appendChild(script); // Here we append it to the body of our page

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
        console.log("---mpbtn---");
        console.log(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
          {
            locale: "es-AR",
          }
        );

        // The ".checkout" is the function that creates the connection between the button and the platform
        console.log(data.global.id);
        mp.checkout({
          preference: {
            id: data.global.id,
          },
          render: {
            container: ".cho-container",
            label: "Pagar",
          },
        });
      }
    };

    // Here we just execute the function
    fetchCheckout();
    //eslint-disable-next-line
    console.log("runned");
  }, []);

  return <div className="cho-container"></div>;
}

export default MpBtn;
