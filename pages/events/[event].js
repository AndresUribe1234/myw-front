import { useRouter } from "next/router";

const EventDetail = () => {
  const router = useRouter();
  const event = router.query.event;
  return <div>Detalles {event}</div>;
};

export default EventDetail;
