import { Container } from "@material-ui/core";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Frame from "./components/Frame/Frame";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user" exact component={Auth} />
            <Route path="/iframes" exact component={Frame} />
            <Route path="/iframes/:id" component={Frame} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
