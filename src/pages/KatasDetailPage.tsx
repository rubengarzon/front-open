import react, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "../editor/editor";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let loggedIn = useSessionStorage("token");

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <h1>Katas Detail Page: {id}</h1>
      <Editor />
    </div>
  );
};

export default KatasDetailPage;
