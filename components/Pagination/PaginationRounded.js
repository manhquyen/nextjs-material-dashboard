import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationRounded = (props) => {
    
  const classes = useStyles();
  const { handleChange, page } = props;

  return (
    <div className={classes.root}>
      <Pagination
        onChange={handleChange}
        count={10}
        page={page}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default PaginationRounded