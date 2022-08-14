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

const styles = ({ enableDetailMaster }) =>  ({
    container: {
        padding: "16px 0px",
        display: "block"
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        fontWeight: '400',
        fontSize: 20,
        marginLeft: '10px',
    },
    containerTime: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
    },
    time: {
        marginLeft: '4px',
        display: "inline-block"
    },
    content: {
        padding: "12px 0px",
        fontSize: "14px",
        fontWeight: '400',
    },
    title: {
        fontSize: "16px",
        display: 'inline',
        marginLeft: "4px",
        fontWeight: '500',
    },
    imageArticles: {
        height: "290px",
        width: "565px"
    },
    type: {
        marginTop: '12px',
        fontSize: "16px",
        color: "#0068FF",
        fontWeight: '500',
    },
    entry: {
        fontWeight: '500',
    },
    leverage: {
        marginLeft: '50px'
    }
});

export default function ItemArticles(props) {
  const { id, masterId, avatar, image, title, content, trans, name, createDate, entry, leverage, goDetail, dataArticles, enableDetailMaster } = props;

  const propsStyle = {
    enableDetailMaster
  }
  const useStyles = makeStyles(styles);
  const classes = useStyles(propsStyle);

  const time = moment(createDate * 1000).format('HH:mm DD/MM/YYYY')

  const goToDetailMaster = () => {
    Router.push(`/admin/master/${masterId}`)
  }

  return (
    <div>
      <ListItem button onClick={() => goDetail(dataArticles)}>
        <div className={classes.container}>
          <div onClick={enableDetailMaster ? goToDetailMaster : () => { }} className={classes.header}>
            <Avatar alt="avatar" src={avatar} />
            <div>
              <div className={classes.name}>{name}</div>
              <div className={classes.containerTime}>
                <AccessTimeIcon fontSize="small" />
                <div className={classes.time}>{time}</div>
              </div>
            </div>
          </div>
          <div>
            <span className={classes.type}>#{trans}</span>
            <span className={classes.title}>{title}</span>
          </div>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {!!image && (
            <Image
              height={290}
              width={565}
              alt="image articles"
              src={image}
            />
          )}
          <div>
            <div>
              Giá vào{" "}
              <span className={classes.entry}>{numeralFormat(entry)}</span>
              <span className={classes.leverage}>
                {trans !== "SPOT" ? (
                  <span>
                    Đòn bẩy <span className={classes.entry}>{leverage}x</span>
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </div>
      </ListItem>
      <Divider />
    </div>
  );
}

ItemArticles.propTypes = {
  id: PropTypes.number,
  masterId: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  image: PropTypes.string || '',
  title: PropTypes.string,
  content: PropTypes.string,
  trans:  PropTypes.string,
  createDate: PropTypes.number,
  entry: PropTypes.number,
  leverage: PropTypes.number,
  goDetail: PropTypes.func,
  enableDetailMaster: PropTypes.bool
};
