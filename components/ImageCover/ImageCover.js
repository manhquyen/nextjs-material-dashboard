import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from 'next/image'

const ImageCover = (props) => {
  const { src } = props;
  const [coverImage, setCoverImage] = useState(src);
  return !!coverImage ? (
      <Image
        onError={() => {
            setCoverImage("/images/default_cover_img.png");
        }}
        alt="cover image"
        layout="fill"
        src={coverImage}
      />
  ) : (
    <Image
      alt="cover image"
      layout="fill"
      src={"/images/default_cover_img.png"}
    />
  );
};

ImageCover.propTypes = {
    src: PropTypes.string,
};

export default ImageCover
