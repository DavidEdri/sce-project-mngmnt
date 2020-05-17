import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";
import { openDialog } from "../../../redux/actions/utilsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: `${theme.spacing(2)}px ${theme.spacing(0.5)}px`,
  },
  gridList: {
    transform: "translateZ(0)",
  },
  tile: {
    cursor: "pointer",
  },
  img: {
    width: "100%",
    height: "auto",
    maxHeight: "72vh",
    position: "relative",
  },
  leftArrow: {
    position: "absolute",
    top: "45%",
    right: 0,
  },
  RightArrow: {
    position: "absolute",
    top: "45%",
    left: 0,
  },
}));

const layout = [
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 4,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
];

export default function Gallery({ images }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const numOfCols = 4;

  const imgClick = (i) => {
    dispatch(
      openDialog(
        "Gallery",
        <ImgSlide images={images} active={i} classes={classes} />,
        ""
      )
    );
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography
        align="center"
        variant="h3"
        color="primary"
        gutterBottom
        style={{ width: "100%" }}
      >
        Gallery
      </Typography>
      <GridList
        cellHeight={200}
        spacing={5}
        className={classes.gridList}
        cols={numOfCols}
      >
        {images.map((tile, i) => (
          <GridListTile
            key={i + tile}
            cols={layout[i % layout.length].cols}
            rows={layout[i % layout.length].rows}
            onClick={() => imgClick(i)}
            className={classes.tile}
          >
            <img src={tile} alt="img" />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
};

function ImgSlide({ images, active, classes }) {
  const [imgIndex, setImgIndex] = React.useState(active);
  const imgData = images[imgIndex];

  const handleNext = () => {
    setImgIndex((old) => (old + 1) % images.length);
  };

  const handlePrev = () => {
    setImgIndex((old) => {
      const next = (old + -1) % images.length;
      return next < 0 ? next + images.length : next;
    });
  };

  return (
    <>
      <img src={imgData} alt="img" className={classes.img} />
      <NavigateBefore className={classes.RightArrow} onClick={handlePrev} />
      <NavigateNext className={classes.leftArrow} onClick={handleNext} />
    </>
  );
}

ImgSlide.propTypes = {
  images: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};
