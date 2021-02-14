import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

const position = { lat: 45.52, lng: -122.6716007 };

const Index = () => {
  const router = useRouter();

  const queryZoom = router.query?.zoom as string;
  const zoom = queryZoom ? parseInt(queryZoom, 10) : 14;

  useRouter();

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <Map zoom={zoom} position={position} vehicles={[]} />
    </div>
  );
};

export default Index;
