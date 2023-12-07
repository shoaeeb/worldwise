import { useState } from "react";

export function useGeolocation(defaultPostion = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(defaultPostion);

  async function getLocation() {
    try {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        function successs(position) {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        function error() {
          throw new Error("User Denied Location Access");
        }
      );
    } catch (error) {
      console.error(error.messsage);
      setError(error.messsage);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, position, error, getLocation };
}
