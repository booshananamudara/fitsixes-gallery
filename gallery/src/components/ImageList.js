
import React, { useState, useEffect } from 'react';
import Image from './Image';

import { getImages } from '../api';


const ImageList = ({imageList}) => {
    // const [imageList, setImageList] = useState([]);
	const [nextCursor, setNextCursor] = useState(null);

   
  return (
    <div className='image_container_second'>
        {imageList.map((image) => (
					<div>
						<Image url={image.url} key={image.public_id} public_id={image.public_id}/>
					</div>
		))}

    </div>
  )
}

export default ImageList