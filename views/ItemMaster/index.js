import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ListItem from '@material-ui/core/ListItem';
import Router from "next/router";
import moment from "moment";
import Image from 'next/image'
import { numeralFormat } from "../../utils";
import config from "../../api/config";
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import Link from '@material-ui/core/Link';
import ImageCover from "../../components/ImageCover/ImageCover";

const styles = () => ({
  container: {
    padding: "16px 0px",
    display: "block",
  },
  header: {
    display: "flex",
    padding: "0px 16px 16px",
    alignItems: "center",
  },
  name: {
    fontWeight: "400",
    fontSize: 20,
    marginLeft: "10px",
  },
  masterId: {
    fontWeight: "400",
    fontSize: 14,
    color: "#8492A7",
    marginLeft: "10px",
  },
  containerTime: {
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
  },
  time: {
    marginLeft: "4px",
    display: "inline-block",
  },
  content: {
    padding: "12px 0px",
    fontSize: "14px",
    fontWeight: "400",
  },
  intro: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "line-clamp": 2,
    "-webkit-box-orient": "vertical",
    fontSize: "16px",
    color: "#8492A7",
    fontWeight: "400",
  },
  noIntro: {
    textAlign: "center",
    fontSize: "16px",
    color: "#8492A7",
    fontWeight: "400",
    height: "50px",
  },
  imageArticles: {
    height: "290px",
    width: "565px",
  },
  type: {
    marginTop: "12px",
    fontSize: "16px",
    color: "#0068FF",
    fontWeight: "500",
  },
  entry: {
    fontWeight: "500",
  },
  leverage: {
    marginLeft: "50px",
  },
  containerIntro: {
    padding: "16px",
  },
  noCoverImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "200px",
    background: "#EFEFEF",
  },
  introTitle: {
    fontSize: "18px",
    marginBottom: "12px",
    fontWeight: "500",
  },
  containerContact: {
    padding: "0px 16px",
    display: "flex",
    justifyContent: "space-between",
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
    maxWidth: "200px",
    "-webkit-line-clamp": 1,
    "line-clamp": 1,
    "-webkit-box-orient": "vertical",
  },
});

export default function ItemMaster(props) {
  const {  masterId, avatar, name, intro, coverImage, facebook, telegram } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const goToDetailMaster = () => {
    Router.push(`/admin/master/${masterId}`)
  }

  const preventDefault = (event) => event.preventDefault();

  return (
    <div onClick={goToDetailMaster} className={classes.container}>
      <div className={classes.header}>
        <Avatar alt="avatar" src={avatar} />
        <div>
          <div className={classes.name}>{name}</div>
          <div className={classes.masterId}>{masterId}</div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "200px",
          position: "relative",
          overflow: "hidden",
          background: "#EFEFEF",
        }}
      >
        <ImageCover src={coverImage} />
      </div>
      <div className={classes.containerIntro}>
        <div className={classes.introTitle}>Giới thiệu</div>
        {!!intro ? (
          <div className={classes.intro}>{intro}</div>
        ) : (
          <div className={classes.noIntro}>Chưa có giới thiệu</div>
        )}
      </div>
      <div className={classes.introTitle} style={{ marginLeft: "16px" }}>
        Liên hệ
      </div>
      {!!facebook && !!telegram ? (
        <div className={classes.containerContact}>
          {!!facebook && (
            <div className={classes.containerLink}>
              <FacebookIcon />
              <Link
                className={classes.link}
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {facebook}
              </Link>
            </div>
          )}
          {!!telegram && (
            <div className={classes.containerLink} style={{ maxWidth: '150px'}}>
              <TelegramIcon />
              <Link
                className={classes.link}
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {telegram}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className={classes.noIntro}>Chưa có liên hệ</div>
      )}
    </div>
  );
}

ItemMaster.propTypes = {
  masterId: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  image: PropTypes.string || '',
  intro: PropTypes.string,
  facebook: PropTypes.string || '',
  telegram: PropTypes.string || '',
};
