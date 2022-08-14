import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PaginationRounded from "components/Pagination/PaginationRounded.js";
import ListArticles from "components/ListArticles/ListArticles.js"


import { bugs, website, server } from "variables/general.js";

import { useState } from "react";
import { getArticles } from "../../api/my_master";

const styles = {
  paginationContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
};

const Dashboard = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [listArticles, setListArticles] = useState([]);
  const pageSize = 20;

  const scrollableListRef = React.createRef();



  useEffect(() => {
    getListArticles(0);
  }, []);

  const getListArticles = async (newPage) => {
    const res = await getArticles({ page: newPage, pageSize});
    if (res.status === 200) {
      console.log('res ', res.data);
      setListArticles(res.data)
    }
  }


  const handleChangePage = (event, value) => {
    setPage(value - 1);
    getListArticles(value - 1);
    scrollableListRef?.current?.scrollIntoView(true);
  };


  return (
    <div>
      <ListArticles enableDetailMaster scrollableListRef={scrollableListRef} data={listArticles} />
      <div className={classes.paginationContainer}>
        <PaginationRounded page={page + 1} handleChange={handleChangePage} />
      </div>
    </div>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
