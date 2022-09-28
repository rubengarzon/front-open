import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasPage = () => {
  let loggedIn = useSessionStorage("token");
  let navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  /**
   * Function to navigate to the kata detail page
   * @param id  - id of the kata
   */
  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`);
  };

  return (
    <div>
      <h1>Katas Page</h1>

      <ul>
        <li onClick={() => navigateToKataDetail(1)}>Kata 1</li>
        <li onClick={() => navigateToKataDetail(2)}>Kata 2</li>
      </ul>
    </div>
  );
};

export default KatasPage;
