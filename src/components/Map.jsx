import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div onClick={() => navigate("form")} className={styles.mapContainer}>
      Map
      <p>{searchParams.get("lat")}</p>
      <p>{searchParams.get("lng")}</p>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        Change Position
      </button>
    </div>
  );
}

export default Map;
