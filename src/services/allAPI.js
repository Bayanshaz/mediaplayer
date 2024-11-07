// upload video-  post htpp req called add  component

import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"
 
 

export const saveVideoAPI = async (videoDetails)=> {
    return await commonAPI("POST",`${SERVERURL}/uploadVideos`,videoDetails)
}

export const getAllVideosAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/uploadVideos`,"")
}


// save history api - post http req to http://localhost:5173/history called by video card component when we play video

export const saveHistoryAPI = async (historyDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/history`,historyDetails)
}


// save history api - post http req to http://localhost:5173/history called by video card component when we play video

export const getAllHistoryAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/history`,"")
}

// Delete history api - post http req to http://localhost:5173/history called by history when user click on delete button

export const deleteHistoryAPI = async (id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/history/${id}`,{})
}

// remove video api - device

export const removeVideosAPI = async (id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/uploadVideos/${id}`,{})
}

// savecategoryapi -posst http req to http://localhost:3000/categories 

export const saveCategoryAPI = async (categoryDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/categories`,categoryDetails)
}

// save category api get category name
export const getAllCategoryAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/categories`,"")
}

// delete category api

export const removeCategoryAPI = async (id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/categories/${id}`,{})
}


// update category - put htpp request to http://localhost:3000/categories/id called by category when video drop over category
export const updateCategoryAPI = async (categoryDetails)=>{
    return await commonAPI("PUT",`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}