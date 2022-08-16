import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import { getListMaster } from "../../api/my_master";
import ItemMaster from "../../views/ItemMaster";

const styles = {
  cardContainer: {
    height: '500px',
    "&:hover": {
      cursor: "pointer",
      background: 'rgba(0,0,0,0.02)'
    },
  }
};

const ListMaster = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [listMaster, setListMaster] = useState([])

  useEffect(() => {
    getInfoListMaster()
  }, [])

  const getInfoListMaster = async () => {
    const res = await getListMaster();
    if (res.status === 200) {
      setListMaster(res.data)
    }
    console.log('res list master', res);
  }

  return (
    <div>
      <GridContainer>
        {listMaster.map((item) => (
          <GridItem xs={6} sm={3} md={3}>
            <Card className={classes.cardContainer}>
            <ItemMaster
              coverImage={item?.coverImage}
              masterId={item?.id}
              avatar={item?.imageUrl}
              intro={item?.introduction}
              name={item?.name}
              telegram={item?.telegram}
              facebook={item?.facebook}
            />
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}

ListMaster.layout = Admin;

export default ListMaster;
