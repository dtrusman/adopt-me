import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundery extends Component {
  public state = {
    hasErrors: false,
    redirect: false
  };

  public static getDerivedStateFromError() {
    return { hasErrors: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Error boundary cought an error: ", error, info);
  }

  public componentDidUpdate() {
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
