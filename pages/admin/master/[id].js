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
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import Link from '@material-ui/core/Link';


import { useState } from "react";
import { getArticlesByMaster, getFollowerByMaster, getInfoMaster } from "../../../api/my_master";
import Image from "next/image";
import { Avatar, Divider } from "@material-ui/core";
import ImageCover from "../../../components/ImageCover/ImageCover";

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
  large: {
    border: `solid 2px ${theme.palette.background.paper}`,
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  containerAvatar: {
    padding: "0px 16px",
    marginTop: "-60px",    
  },
  name: {
    fontSize: "20px",
    fontWeight: '500',
  },
  masterId: {
    fontSize: "14px",
    color: "#8492A7",
    fontWeight: "400",
  },
  containerName: {
    marginTop: '16px'
  },
  containerInfoSignal: {
    padding: "16px",
    display: 'flex',
  },
  containerNoSignal: {
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '400', 
},
containerContact: {
    padding: "16px 16px 0px",
    display: "flex",
  },
  containerLink: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    marginLeft: "6px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    maxWidth: "300px",
    "-webkit-line-clamp": 1,
    "line-clamp": 1,
    "-webkit-box-orient": "vertical",
  },
  signalTitle: {
    fontSize: '16px',
    color: "#8492A7",
    fontWeight: '400'
  },
  signal: {
    fontSize: '20px',
    fontWeight: '500',
  },
  titleIntro: {
    fontSize: "16px",
    fontWeight: '400',
    color: "#8492A7",
  },
  intro: {
    fontSize: "14px",
    fontWeight: "500",
  }
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
  const [followers, setFollowers] = useState(0)
  const pageSize = 20;

  console.log('id ', id)
  const scrollableListRef = React.createRef();



  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    const promiseGetArticles =  getArticlesByMaster({ masterId: id, page: 0, pageSize});
    const promiseGetInfo =  getInfoMaster({ masterId: id })
    const promiseFollowerByMaster = getFollowerByMaster({ masterId: id});

    const res = await Promise.all([promiseGetArticles, promiseGetInfo, promiseFollowerByMaster]);
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
    if (res[2].status === 200) {
        setFollowers(res[2].data?.length)
      }
  }


  const getListArticles = async (newPage) => {
    const res = await getArticlesByMaster({ masterId: id, page: newPage, pageSize});
    if (res.status === 200) {
      console.log('res ', res.data);
      setListArticles(res?.data)
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
          <div
            style={{
              width: "100%",
              height: "500px",
              position: "relative",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              overflow: "hidden",
            }}
          >
            <ImageCover src={`${config.baseUrlImage}${infoUser?.coverImage}`} />
          </div>
        )}
        <div className={classes.containerAvatar}>
          <Avatar
            alt="avatar"
            className={classes.large}
            src={`https://core.vndc.io/vndc_new/content/images/${infoUser?.imageUrl}?width=300&height=300`}
          />
          <div className={classes.containerName}>
            <div className={classes.name}>{infoUser?.name}</div>
            <div className={classes.masterId}>{infoUser?.id}</div>
          </div>
          <div className={classes.containerName}>
            <div className={classes.titleIntro}>Giới thiệu</div>
            <div className={classes.intro} style={{ marginTop: "16px" }}>
              {infoUser?.introduction}
            </div>
          </div>
        </div>
        {!!infoUser?.facebook && !!infoUser?.telegram && (
        <div className={classes.containerContact}>
          {!!infoUser?.facebook && (
            <div className={classes.containerLink}>
              <FacebookIcon/>
              <Link
                className={classes.link}
                href={infoUser?.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {infoUser?.facebook}
              </Link>
            </div>
          )}
          {!!infoUser?.telegram && (
            <div className={classes.containerLink} style={{ maxWidth: '150px', marginLeft: '64px'}}>
              <TelegramIcon />
              <Link
                className={classes.link}
                href={infoUser?.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {infoUser?.telegram}
              </Link>
            </div>
          )}
        </div>
      )}
        <div className={classes.containerInfoSignal}>
          <div>
            <div className={classes.signalTitle}>Tín hiệu</div>
            <div className={classes.signal}>28</div>
          </div>
          <div style={{ marginLeft: '40px'}}>
            <div className={classes.signalTitle}>Người theo dõi</div>
            <div className={classes.signal}>{followers}</div>
          </div>
        </div>
        <Divider />

        {listArticles && listArticles?.length > 0 ? (
          <ListArticles
            enableDetailMaster={false}
            scrollableListRef={scrollableListRef}
            data={listArticles}
          />
        ) : (
          <div className={classes.containerNoSignal}>
            Master chưa có tín hiệu nào
          </div>
        )}
        {listArticles && listArticles?.length > 0 && showPaging && (
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
