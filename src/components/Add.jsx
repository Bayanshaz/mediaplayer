// rafce
import React,{useState} from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { saveVideoAPI } from '../services/allAPI'


const Add = ({setAddResponseFromHome}) => {
  const [InvalidYouTubeLink,setInvalidYouTubeLink] = useState(false)
  const [videoDeatails,setVideoDetail] = useState({caption:"",imgUrl:"",youTubeLink:""})
  const [show, setShow] = useState(false);
  console.log(videoDeatails);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const extratingEmbededLinkFromVideoLink = (userInputYouTubeLink) => {
// {steps for create embeded youtube link}
if(userInputYouTubeLink.includes("https://www.youtube.com/watch?v="))
{
  console.log(userInputYouTubeLink.split("v=")[1].slice(0,11));
  const VideoId = userInputYouTubeLink.split("v=")[1].slice(0,11)
  setInvalidYouTubeLink(false)
  setVideoDetail({...videoDeatails,youTubeLink: `https://www.youtube.com/embed/${VideoId}`})
}else{
  // alert("Invalid ...please try another")
  setInvalidYouTubeLink(true)
  setVideoDetail({...videoDeatails,youTubeLink:""})
}


  }

  const handleUploadVideo = async () =>{
    // object destructure : const {key1,key2...} = object name
    const {caption,imgUrl,youTubeLink} = videoDeatails
    if(caption && imgUrl && youTubeLink)
    {
      // store video detail permanently
      // alert("Store video permanently")
      try {
        const result = await saveVideoAPI(videoDeatails)
        console.log(result);
        if(result.status>=200 && result.status<300){
          // video added to json file
          alert("Video Uploaded successfully!!!")
          handleClose()

          // pass result to json file
          setAddResponseFromHome(result)
        }else{
          console.log(result);
        }        

      } catch (err) {
        console.log(err);
      }
    }
    else
    {
      alert("Please fill the form")
    }
  }




  return (
    <>
        <div className="d-flex align-items-center">
          <h5>Upload Videos</h5>
          <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
          
          </div> 

          <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Uploading Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="border rounded p-3">
            <FloatingLabel controlId="floatingCaption" label="Caption">
              <Form.Control onChange={e=>setVideoDetail({...videoDeatails,caption:e.target.value})}  type="text" placeholder="Caption" />
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId="floatingUrl" label="Vedio Image URL">
              <Form.Control onChange={e=>setVideoDetail({...videoDeatails,imgUrl:e.target.value})} type="text" placeholder="Caption" />
            </FloatingLabel>
            <FloatingLabel onChange={e=>extratingEmbededLinkFromVideoLink(e.target.value)} className='mt-2' controlId="floatingLink" label="Vedio YouTube Link">
              <Form.Control type="text" placeholder="Caption" />
            </FloatingLabel>
            {
              InvalidYouTubeLink &&
              <div className='text-danger fw-bolder mt-2'>Invalid Youtube Link..</div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUploadVideo} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
        
        
        
         </>
  )
}

export default Add
