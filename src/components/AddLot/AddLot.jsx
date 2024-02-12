import ArrowLeft from '../../assets/svg/ArrowLeft';
import InputForNewLot from '../InputForNewLot/InputForNewLot';
import SelectorForAddLot from '../SelectorForAddLot/SelectorForAddLot';
import classes from './AddLot.module.scss';
import { countries, quantity, regions, valutes } from '../dataoffilter';
import SelectorAndInputForAddLot from '../SelectorAndInputForAddLot/SelectorAndInputForAddLot';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AddLot() {
  const [showFileInput, setShowFileInput] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const handleFileInputClick = () => {
    setShowFileInput(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > 1024 * 1024 * 5) {
        alert('Your file is too large');
        return;
      }
    }
    setFiles([...files, ...event.target.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = [];
    let invalidFileFound = false;

    droppedFiles.forEach((file) => {
      if (file.size > 1024 * 1024 * 5) {
        alert('Your file is too large');
        invalidFileFound = true;
      } else {
        validFiles.push(file);
      }
    });
    if (!invalidFileFound) {
      setFiles([...files, ...validFiles]);
    }
  };
  return (
    <div className={classes.addlot}>
      <div className={classes.labelNewLot}>
        <div onClick={goBack}>
          <ArrowLeft />
        </div>
        <p>New advertisment</p>
      </div>
      <div className={classes.formLot}>
        <div>
          <InputForNewLot
            title={'Title'}
            placeholder={'For example: My apples'}
          />
          <p className={classes.comment}>No more 40 characters</p>
        </div>

        <SelectorForAddLot
          firstSelector={countries}
          secondSelector={regions}
          firstPlaceholder={'Select a country'}
          secondPlaceholder={'Select a region'}
          label={'Location'}
        />

        <SelectorForAddLot
          firstSelector={countries}
          secondSelector={regions}
          firstPlaceholder={'Select a category'}
          secondPlaceholder={'Select a product type'}
          label={'Category'}
        />

        <SelectorAndInputForAddLot
          label={'Quantity'}
          placeholder={'Enter the quantity'}
          options={quantity}
        />
        <SelectorAndInputForAddLot
          label={'Price'}
          placeholder={'Enter the price'}
          options={valutes}
        />
        <div>
          <p>Product Images</p>
          <div
            className={classes.dragNDrop}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <span onClick={handleFileInputClick}>Choose a files</span>or drag
            and drop it here
            {showFileInput && (
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
              />
            )}
          </div>
          <p className={classes.comment}>{files.length} of 9 images</p>
        </div>
      </div>
      <div className={classes.buttons}>
        <div>Preview</div>
        <div>Place an advertisment</div>
      </div>
      <p className={classes.comment}>
        This ad will placed on the site after review the moderator and will be
        valid for the next 30 days.
      </p>
    </div>
  );
}

export default AddLot;
