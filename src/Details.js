import React, { Component } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";

class Details extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    pet.animal(parseInt(this.props.id)).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    });
  }

  render() {
    const {
      name,
      animal,
      breed,
      location,
      description,
      loading,
      media
    } = this.state;

    if (loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
