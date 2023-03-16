import React, { useContext } from "react";
import Button from "@mui/material/Button";

import ImageUploading from "react-images-uploading";
import { FormContext } from "../Form";

export default function UploadImage({ name }) {
  const formContext = useContext(FormContext);
  const { handleFormChange } = formContext;
  const [images, setImages] = React.useState([]);
  let formData = new FormData();

  const maxNumber = 1; // Can update to reflect more than one later
  async function uploadFile(formData) {
    let options = {
      method: "POST",
      body: formData,
    };

    try {
      let response = await fetch("/api/files", options);
      if (response.ok) {
        // Server responds with updated array of files
        let data = await response.json();
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  const onChange = (imageList, addUpdateIndex) => {
    formData.append("clientfile", imageList[0].file, imageList[0].file.name);
    //uploadFile(formData);

    handleFormChange(undefined, { name: name, value: formData });
    setImages(imageList);
  };
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <Button
            variant="outlined"
            size="small"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </Button>
          &nbsp;
          <Button onClick={onImageRemoveAll}>Remove all images</Button>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image["data_url"]} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onImageUpdate(index)}
                >
                  Update
                </Button>
                &nbsp;
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => onImageRemove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}
