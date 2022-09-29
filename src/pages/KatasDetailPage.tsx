import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "../components/editor/editor";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataById } from "../services/katasService";
import { AxiosResponse } from "axios";
import { IKata } from "../utils/types/IKata.type";

export const KatasDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kata, setKata] = useState<IKata | undefined>(undefined);
  const [showSolution, setShowSolution] = useState(true);

  let loggedIn = useSessionStorage("token");

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      if (id) {
        getKataById(loggedIn, id)
          .then((response: AxiosResponse) => {
            if (response.status === 200 && response.data) {
              let kataResponse = {
                _id: response.data._id,
                name: response.data.name,
                description: response.data.description,
                stars: response.data.stars,
                level: response.data.level,
                intents: response.data.intents,
                creator: response.data.creator,
                solution: response.data.solution,
                participants: response.data.participants,
              };
              setKata(kataResponse);
            } else {
              throw new Error("Error getting kata" + response.data);
            }
          })
          .catch((error) => {
            console.log(`[Get kata by id] Error: ${error}`);
          });
      } else {
        navigate("/katas");
      }
    }
  }, [loggedIn, navigate, id]);

  return (
    <div>
      <h1>Katas Detail Page: {id}</h1>
      {kata ? (
        <div className="kata-data">
          <h2>{kata.description}</h2>
          <h3>Rating: {kata.stars}/5</h3>
          <button onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? "Show Solution" : "Hide Solution"}
          </button>
          {showSolution ? null : <Editor code={kata?.solution} />}
        </div>
      ) : (
        <div>
          <h2>Loading data...</h2>
        </div>
      )}
    </div>
  );
};

export default KatasDetailPage;
