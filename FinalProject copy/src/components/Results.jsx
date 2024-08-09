
import React from "react";
import { useState, useContext, createContext } from "react";
import {UserContext, UserProvider} from "./UserContext";


export default function Results({ element, artwork }) {
    const {name} = useContext(UserContext)
    console.log(artwork)

  return (
    <div id="Results">
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{artwork.title}</h2>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p>{artwork.artistDisplayName}</p>
          <p>{artwork.objectDate}</p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}