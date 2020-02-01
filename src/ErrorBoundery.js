import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundery extends Component {
  state = {
    hasErrors: false,
    redirect: false
  };

  static getDerivedStateFromError() {
    return { hasErrors: true };
  }

  componentDidCatch(error, info) {
    console.log("Error boundary cought an error: ", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasErrors) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasErrors) {
      return (
        <h1>
          There was an error with this listing.
          <Link to="/">Click here</Link> to go back to the home page or wait
          five seconds
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundery;
