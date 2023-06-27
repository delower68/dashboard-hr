import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const value = localStorage.getItem("user");
    if (value) {
      setUser(JSON.parse(value));
    }
  }, []);

  return {
    user
  }
}


