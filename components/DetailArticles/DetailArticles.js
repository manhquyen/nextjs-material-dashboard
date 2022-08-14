import React, { useMemo, useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Divider } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ListItem from '@material-ui/core/ListItem';
import { useRouter } from "next/router";
import moment from "moment";
import { numeralFormat } from "../../utils";
import Image from 'next/image'

import { getDetailArticles } from "../../api/my_master";

const styles = {
    container: {
        display: "flex",
        flex: 1,
        justifyContent: 'center'
    },
    containerItem: {
        display: "flex",
        padding: "16px",
        background: 'white',
        borderRadius: '8px',
        flexDirection: 'column',
    },
    containerButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '32px 0px',
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
    },
    buttonDeactive: {
        marginLeft: '20px'
    },
    containerEntry: {
        marginTop: '20px'
    }
};

const DetailArticles = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { detailArticle } = props;


    // const { id } = props;

    // useEffect(() => {
    //   getInfoDetailArticles();
    // }, []);

    // const getInfoDetailArticles = async () => {
    //   const res = await getDetailArticles({ articlesId: id });
    //   if (res.status === 200) {
    //     setDetailArticle(res?.data)
    //   }
    //   console.log("res  detail articles ", res);
    // };

  const time = useMemo(() => {
    if (detailArticle) {
        return moment(detailArticle?.createdDate * 1000).format('HH:mm DD/MM/YYYY')
    }
  }, [detailArticle?.createdDate]) 


  return (
    <div className={classes.container}>
        <div className={classes.containerItem}>
          <div className={classes.header}>
            <Avatar alt="avatar" src={detailArticle?.user?.imageUrl} />
            <div>
              <div className={classes.name}>{detailArticle?.user?.name}</div>
              <div className={classes.containerTime}>
                <AccessTimeIcon fontSize="small" />
                <div className={classes.time}>{time}</div>
              </div>
            </div>
          </div>
          <div>
            <span className={classes.type}>#{detailArticle?.trans}</span>
            <span className={classes.title}>{detailArticle?.title}</span>
          </div>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: detailArticle?.content }}
          />
          {detailArticle?.images?.length > 0 && (
            <Image
              height={582}
              width={1125}
              alt="image articles"
              src={detailArticle?.images?.length > 0 ? detailArticle?.images[0]?.link_aws : ""}
            />
          )}
          <div>
            <div className={classes.containerEntry}>
              Giá vào{" "}
              <span className={classes.entry}>{numeralFormat(detailArticle?.entry)}</span>
              <span className={classes.leverage}>
                {detailArticle?.trans !== "SPOT" ? (
                  <span>
                    Đòn bẩy <span className={classes.entry}>{detailArticle?.leverage}x</span>
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className={classes.containerButton}>
                <Button variant="contained" color="primary">Mở bài viết</Button>
                <Button className={classes.buttonDeactive} variant="contained" color="secondary">Hủy bài viết</Button>
            </div>
          </div>
        </div>
    </div>
  );
}


DetailArticles.propTypes = {
    detailArticle: PropTypes.any
  };

export default DetailArticles;