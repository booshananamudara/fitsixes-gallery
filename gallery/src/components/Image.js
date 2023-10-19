import React from 'react'
import { useState } from 'react';
import FileSaver from 'file-saver';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Image = ({url,public_id}) => {
   

   
    const [responseData, setResponseData] = useState(null);
    
    
    const handleButtonClick = () => {
         FileSaver.saveAs(url,`Fitsixes-${public_id}.png`);   
	  };

  return (
    <div className='image_container '>
        <img src={url} alt={public_id} ></img>
	
        <FileDownloadOutlinedIcon onClick={handleButtonClick} className='download_icon'></FileDownloadOutlinedIcon>
    </div>
  )
}

export default Image