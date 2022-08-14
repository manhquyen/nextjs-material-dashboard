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
import { useRouter } from "next/router";
import config from "../../../api/config";


import { useState } from "react";
import { getArticlesByMaster, getInfoMaster } from "../../../api/my_master";
import Image from "next/image";
import { Avatar } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "45%",
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
  },
  paginationContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const ListArticlesByMaster = (props) => {
  const router = useRouter();
  const id = router.query.id;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [listArticles, setListArticles] = useState([]);
  const [infoUser, setInfoUser] = useState(null);
  const [showPaging, setShowPaging] = useState(true);
  const pageSize = 20;

  console.log('id ', id)
  const scrollableListRef = React.createRef();



  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    const promiseGetArticles =  getArticlesByMaster({ masterId: id, page: 0, pageSize});
    const promiseGetInfo =  getInfoMaster({ masterId: id })
    const res = await Promise.all([promiseGetArticles, promiseGetInfo]);
    if (res[0].status === 200) {
      console.log('res ', res.data);
      setListArticles(res[0].data)
      if (res[0].data?.length < pageSize) {
        setShowPaging(false)
      }
    }
    if (res[1].status === 200) {
        setInfoUser(res[1].data);
        console.log('res info master ', res[1].data);
    }
  }


  const getListArticles = async (newPage) => {
    const res = await getArticlesByMaster({ masterId: id, page: newPage, pageSize});
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
    <div className={classes.root}>
      <div className={classes.container}>
        {!!infoUser?.coverImage && (
          <div style={{ width: "100%", height: "500px", position: "relative", borderTopLeftRadius: '8px', borderTopRightRadius: '8px', overflow: 'hidden' }}>
            <Image
              alt="cover image"
              layout="fill"
              src={`${config.baseUrlImage}${infoUser?.coverImage}`}
            />
          </div>
        )}
        <Avatar alt="avatar" sizes="large" src={`https://core.vndc.io/vndc_new/content/images/${infoUser?.imageUrl}?width=300&height=300`} />
        <ListArticles
          enableDetailMaster={false}
          scrollableListRef={scrollableListRef}
          data={listArticles}
        />
        {showPaging && (
          <div className={classes.paginationContainer}>
            <PaginationRounded
              page={page + 1}
              handleChange={handleChangePage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ListArticlesByMaster.layout = Admin;

export default ListArticlesByMaster;
