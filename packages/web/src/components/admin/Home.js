import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Container,
  Card,
  Fade,
  makeStyles
} from "@material-ui/core";
import links from "./navbar/navLinks";
import text from "../../utils/_text";

const useStyles = makeStyles(theme => ({
  card: {
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <Container style={{ marginTop: "100px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary" align="center">
            {text.adminPanel}
          </Typography>
        </Grid>
        {links.map((l, i) => (
          <Fade in timeout={200 * i} key={l.to}>
            <Grid item md={3} sm={6} xs={12}>
              <Link to={l.to} style={{ textDecoration: "none" }}>
                <Card className={classes.card}>
                  <Typography variant="h5" align="center" color="primary">
                    {l.text}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
