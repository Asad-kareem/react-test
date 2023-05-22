import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundry from "./ErrorBoundry";
import Carasoul from "./Carosouls";
import fetchPet from "./fetch";
const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate;
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
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
      <Carasoul images={pets.images} />
      <div>
        <h1>{pets.name}</h1>
        <h2>
          {pets.animal}-{pets.breed} -{pets.city} -{pets.state}
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Adopt {pets.name}
        </button>
        <p>{pets.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pets.name}?</h1>
              <div>
                <button
                  onClick={() => {
                    setAdoptedPet(pets);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundries() {
  return (
    <ErrorBoundry>
      <Details />
    </ErrorBoundry>
  );
}

export default DetailsErrorBoundries;
