import ArrowLeft from '../../assets/svg/ArrowLeft';
import InputForNewLot from '../InputForNewLot/InputForNewLot';
import SelectorForAddLot from '../SelectorForAddLot/SelectorForAddLot';
import classes from './AddLot.module.scss';
import { quantity } from '../dataoffilter';
import SelectorAndInputForAddLot from '../SelectorAndInputForAddLot/SelectorAndInputForAddLot';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMainData } from '../../features/main/mainSlice';
import { getCategories } from '../../features/categories/categoriesSlice';
import {
  changeFirstOption,
  changeFirstOptionCat,
  changeRegion,
  changeSubcategory,
  changeTitle,
  changeWeight,
  changePrice,
  changeValidationAfterTimeWeight,
  changeValidationAfterTimePrice,
  changeQuantity,
  changeCurrency,
  changeValidity,
  changeValidationAfterTimeValidity,
} from '../../features/lots/lotsSlice';

function AddLot() {
  const dispatch = useDispatch();
  const { currency, countries } = useSelector((state) => state.main);
  const categories = useSelector((state) =>
    state.categories.list.map((item) => ({
      name: item.name,
      id: item.category_id,
      subcategories: item.subcategories.map((item) => item.name),
    }))
  );
  const {
    regions,
    subcategories,
    currentCountry,
    currentRegion,
    currentCategory,
    currentSubcategory,
    title,
    inputTitleValid,
    currentWeight,
    currentPrice,
    inputWeightValid,
    inputPriceValid,
    currentWeightMeasure,
    currentPricingMeasure,
    isValidValidity,
    currentValidity,
    fullValidationForm
  } = useSelector((state) => state.lots);

  const handleChangeFirstSelector = (event, sendingFunction) => {
    const selectedSubcategory =
      event.target.options[event.target.selectedIndex].dataset.subcategory;
    const chosenOption = event.target.value;
    dispatch(sendingFunction({ selectedSubcategory, chosenOption }));
  };

  const handleChangeInputs = (event, sendingFunction) => {
    dispatch(sendingFunction(event.target.value));
  };

  const handleChangeFirstOptionCountry = (event) => {
    handleChangeFirstSelector(event, changeFirstOption);
  };

  const handleChangeFirstOptionCategory = (event) => {
    handleChangeFirstSelector(event, changeFirstOptionCat);
  };

  const handleChangeRegion = (event) => {
    handleChangeInputs(event, changeRegion);
  };

  const handleChangeSubcategory = (event) => {
    handleChangeInputs(event, changeSubcategory);
  };

  const handleChangeTitle = (event) => {
    handleChangeInputs(event, changeTitle);
  };

  const handleChangeQuantity = (event) => {
    handleChangeInputs(event, changeWeight);
  };

  const handleChangePrice = (event) => {
    handleChangeInputs(event, changePrice);
  };

  const handleChangeSelectorQuantity = (event) => {
    handleChangeInputs(event, changeQuantity);
  };

  const handleChangeSelectorCurrency = (event) => {
    handleChangeInputs(event, changeCurrency);
  };

  const handleChangeValidity = (event) => {
    handleChangeInputs(event, changeValidity);
  };

  useEffect(() => {
    dispatch(fetchMainData());
    dispatch(getCategories());
  }, [dispatch]);

  function useValidationTimer(isValid, dispatch, action, currentValue) {
    useEffect(() => {
      let timer;
      if (!isValid) {
        timer = setTimeout(() => {
          dispatch(action());
        }, 1500);
      }
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [dispatch, isValid, currentValue]);
  }

  useValidationTimer(
    inputWeightValid,
    dispatch,
    changeValidationAfterTimeWeight,
    currentWeight
  );

  useValidationTimer(
    inputPriceValid,
    dispatch,
    changeValidationAfterTimePrice,
    currentPrice
  );

  useValidationTimer(
    isValidValidity,
    dispatch,
    changeValidationAfterTimeValidity,
    currentValidity
  );

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const handleFileInputClick = () => {
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
      {currency ? (
        <>
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
                value={title}
                handleChangeInput={handleChangeTitle}
                isValid={inputTitleValid}
              />
              <p className={classes.comment}>
                No more{' '}
                <span className={inputTitleValid ? null : classes.red}>40</span>{' '}
                characters
              </p>
            </div>

            <SelectorForAddLot
              firstSelector={countries}
              secondSelector={regions}
              firstPlaceholder={'Select a country'}
              secondPlaceholder={'Select a region'}
              label={'Location'}
              changeFirstOption={handleChangeFirstOptionCountry}
              subcategoryKey="regions"
              chosenFirstOption={currentCountry}
              chosenSecondOption={currentRegion}
              changeSecondOption={handleChangeRegion}
            />

            <SelectorForAddLot
              firstSelector={categories}
              secondSelector={subcategories}
              firstPlaceholder={'Select a category'}
              secondPlaceholder={'Select a product type'}
              label={'Category'}
              changeFirstOption={handleChangeFirstOptionCategory}
              subcategoryKey="subcategories"
              chosenFirstOption={currentCategory}
              chosenSecondOption={currentSubcategory}
              changeSecondOption={handleChangeSubcategory}
            />

            <SelectorAndInputForAddLot
              label={'Quantity'}
              placeholder={'Enter the quantity'}
              options={quantity}
              changeInput={handleChangeQuantity}
              inputValue={currentWeight}
              isValid={inputWeightValid}
              changeSelector={handleChangeSelectorQuantity}
              selectorValue={currentWeightMeasure}
            />
            <SelectorAndInputForAddLot
              label={'Price'}
              placeholder={'Enter the price'}
              options={currency}
              changeInput={handleChangePrice}
              inputValue={currentPrice}
              isValid={inputPriceValid}
              changeSelector={handleChangeSelectorCurrency}
              selectorValue={currentPricingMeasure}
            />
            <div>
              <InputForNewLot
                title={'Validity'}
                placeholder={'Validity of ad мах 30 days'}
                isValid={isValidValidity}
                value={currentValidity}
                handleChangeInput={handleChangeValidity}
              />
              <p className={classes.comment}>
                Default terms of validity of ad no more 30 days
              </p>
            </div>
            <div>
              <p>Product Images</p>
              <div
                className={classes.dragNDrop}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <span onClick={handleFileInputClick}>Choose a files</span>
                or drag and drop it here
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ visibility: 'hidden', position: 'absolute' }}
                  multiple
                />
              </div>
              <p className={classes.comment}>{files.length} of 9 images</p>
            </div>
          </div>

          <div className={classes.buttons}>
            <button disabled={!fullValidationForm} className={fullValidationForm ? classes.validButton : null}>Preview</button>
            <button disabled={!fullValidationForm} className={fullValidationForm ? classes.validButton : null}>Place an advertisment</button>
          </div>
          <p className={classes.comment}>
            This ad will placed on the site after review the moderator.
          </p>
        </>
      ) : (
        <img src="https://rb.ru/media/upload_tmp/2018/d3.gif"></img>
      )}
    </div>
  );
}

export default AddLot;
