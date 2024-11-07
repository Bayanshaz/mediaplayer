 // rafce
import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import VedioCard from './VedioCard'
import { getAllVideosAPI, saveVideoAPI, updateCategoryAPI } from '../services/allAPI'


const View = ({addResponseFromHome,deleteResponceFromCategory,setDeleteResponseFromview}) => {
const [deleteVideoResponseFromVideoCard,setDeleteVideoResponseFromVideoCard]= useState("")
  const [allVideos,setAllVideos] = useState([])

  useEffect(()=>{
    getAllVideos()
  },[addResponseFromHome,deleteVideoResponseFromVideoCard,deleteResponceFromCategory])
  console.log(allVideos);
  

  const getAllVideos = async ()=>{
    try {
      const result = await getAllVideosAPI()
      console.log(result);

      if(result.status>=200 && result.status<300){
        setAllVideos(result.data);
      }
      
    } catch (err) {
      console.log(err);
    }
  }


  const dragOverView = (e)=>{
    e.preventDefault()
  }

  const  categoryVideoDropOverView = async (e) =>{
    console.log("inside categoryVideoDropOverView");
    const {video,CategoryDetails}= JSON.parse(e.dataTransfer.getData("dragData"))
    console.log(video,CategoryDetails);
    
    const updatedCategoryVideoList = CategoryDetails?.allVideos?.filter(item=>item.id!=video?.id)
    const updateCategory = {...CategoryDetails,allVideos:updatedCategoryVideoList}
    console.log(updateCategory);
    // update the category by delte video from category using api
    const result = await updateCategoryAPI(updateCategory)
    // use sate lifting
    setDeleteResponseFromview(result)
    // user api to upload video
    await saveVideoAPI(video)
    // call getAllVideos function
    getAllVideos
  }
  return (
    <>
      <Row droppable="true" onDragOver={dragOverView} onDrop={e=>categoryVideoDropOverView(e)}>
        {
          allVideos?.length>0?
          allVideos?.map(video=>(
            <Col key={video?.id} className='mb-2' sm={12} md={6} lg={4}>
              <VedioCard setDeleteVideoResponseFromVideoCard = {setDeleteVideoResponseFromVideoCard} displayData={video} />
            </Col>
          ))
          :
          <div className="fw-bolder text-danger fs-5">No videos are Uploaded!!!</div>
        }
      </Row>
    </>
  )
}

export default View