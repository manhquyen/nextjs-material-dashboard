import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PropTypes from "prop-types";
import ItemArticles from './ItemArticles';
import Popover from '@material-ui/core/Popover';
import DetailArticles from '../DetailArticles/DetailArticles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function ListArticles(props) {
  const classes = useStyles();
  const { data, scrollableListRef, enableDetailMaster } = props

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDataArticles, setCurrentDataArticles] = useState(null);

//   useEffect(() => {
//     if (currentDataArticles) {
//         handleClick();
//     }
//   }, [currentDataArticles])

  const handleClick = (event) => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    console.log('close ')
    setAnchorEl(null);
  };

  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl])
//   const id = open ? 'simple-popover' : undefined;

  const showDetail = (dataArticles) => {
    setCurrentDataArticles(dataArticles);
    handleClick();
  }



  return (
    <div className={classes.root}>
      <List ref={scrollableListRef} component="nav">
        {data &&
          data?.length > 0 &&
          data.map((item, index) => (
            <ItemArticles
              key={item?.id}
              masterId={item?.user?.id}
              dataArticles={item}
              createDate={item?.createdDate}
              id={item?.id}
              name={item?.user?.name}
              avatar={item?.user?.imageUrl}
              image={item?.images?.length > 0 ? item?.images[0]?.link_aws : ""}
              title={item?.title}
              content={item?.content}
              trans={item?.trans}
              entry={Number(item?.entry)}
              goDetail={showDetail}
              leverage={item?.leverage}
              enableDetailMaster={enableDetailMaster}
            />
          ))}
      </List>
      <Popover
        id={open ? 'simple-popover' : undefined}
        style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)'}}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
      >
        <DetailArticles detailArticle={currentDataArticles}/>
      </Popover>
    </div>
  );
}

ListArticles.propTypes = {
  data: PropTypes.array,
  enableDetailMaster: PropTypes.bool || true,
};
