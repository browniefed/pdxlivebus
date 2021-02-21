import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";

const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

const position = { lat: 45.52, lng: -122.6716007 };

const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_VEHICLES_ENDPOINT);
    console.log(socket);
    console.log(process.env.NEXT_PUBLIC_VEHICLES_ENDPOINT);
    socket.on("vehicles", (data) => {
      setVehicles(data);
    });
  }, []);
  return vehicles;
};

const Index = () => {
  const router = useRouter();

  const queryZoom = router.query?.zoom as string;
  const zoom = queryZoom ? parseInt(queryZoom, 10) : 14;
  const vehicles = useVehicles();

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <Map zoom={zoom} position={position} vehicles={vehicles ?? []} />
    </div>
  );
};

export default Index;
