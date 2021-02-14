import classnames from "classnames";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngExpression, divIcon } from "leaflet";

const Map = ({
  position,
  zoom,
  vehicles,
}: {
  zoom: number;
  position: LatLngExpression;
  vehicles: any[];
}) => {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {vehicles.map((vehicle) => {
        const { routeNumber, type } = vehicle;
        let classes = {
          ["marker"]: true,
        };
        if (type === "rail") {
          classes[`rail${routeNumber}`] = true;
        } else if (type === "bus") {
          classes["bus"] = true;
        }

        const icon = divIcon({
          className: classnames(classes),
          html: `<span>${routeNumber}</span>`,
        });

        return (
          <Marker
            icon={icon}
            key={vehicle.vehicleID}
            position={[vehicle.latitude, vehicle.longitude]}
          />
        );
      })}
    </MapContainer>
  );
};

export default Map;
