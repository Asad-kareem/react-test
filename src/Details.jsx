import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetch";
const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">😞</h2>
      </div>
    );
  }

  const pets = results.data.pets[0];
  return (
    <div className="details">
      <div>
        <h1>{pets.name}</h1>
        <h2>
          {pets.animal}-{pets.breed} -{pets.city} -{pets.state}
        </h2>
        <button>Adopt {pets.name}</button>
        <p>{pets.description}</p>
      </div>
    </div>
  );
};

export default Details;
