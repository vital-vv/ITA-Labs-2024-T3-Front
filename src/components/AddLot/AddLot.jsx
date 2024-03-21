import InputForNewLot from '../InputForNewLot/InputForNewLot';
import SelectorForAddLot from '../SelectorForAddLot/SelectorForAddLot';
import classes from './AddLot.module.scss';
import SelectorAndInputForAddLot from '../SelectorAndInputForAddLot/SelectorAndInputForAddLot';
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMainData,
  getRegionsCurrentCountry,
} from '../../features/main/mainSlice';
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
  fileTransfer,
  fileChange,
  changeVariety,
  changeSliderValues,
  changeSliderFromByKeys,
  changeSliderUntilByKeys,
  changeMeasure,
  changeMinimalBet,
  changeValidationAfterTimeMinimalBet,
  changePackaging,
  fetchSubcategories,
  addSubscribe,
  postNewLot,
  deleteImage,
  changeMainPicture,
  getActualVariety,
} from '../../features/lots/lotsSlice';
import SingleSelectorForAddLot from '../SingleSelectorForAddLot/SingleSelectorForAddLot';
import Slider from '../Slider/Slider';
import NumberInput from '../NumberInput/NumberInput';
import { ROUTES } from '../../utils/routes';
import OneStepBack from '../OneStepBack/OneStepBack';
import Loader from '../../hoc/Loader/Loader';
import { useValidationTimer } from '../../hook/useValidationAfterTime';
import { v4 as uuidv4 } from 'uuid';
import Close from '../../assets/svg/Close';

function AddLot() {
  const dispatch = useDispatch();
  const { currency, countries, packaging, sizing, quantity } = useSelector(
    (state) => state.main
  );
  const categories = useSelector((state) =>
    state.categories.list.map((item) => ({
      name: item.name,
      id: item.category_id,
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
    fullValidationForm,
    picturesFiles,
    currentVariety,
    sliderCurrent,
    sliderLimitCurrent,
    validSliderFrom,
    validSliderUntil,
    currentMeasure,
    minimalBet,
    inputMinimalBetValid,
    currentPackages,
    isDescriptionValid,
    currentIdCategory,
    description,
    mainPicture,
    varieties,
    currentIdVariety
  } = useSelector((state) => state.lots);

  const findIdCurrentOption = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    return selectedOption.id;
  }

  const handleChangeInputs = (event, sendingFunction) => {
    dispatch(sendingFunction(event.target.value));
  };

  const handleChangeFirstOptionCountry = (event) => {
    dispatch(changeFirstOption(event.target.value));
  };

  const handleChangeFirstOptionCategory = (event) => {
    const selectedId = findIdCurrentOption(event);
    dispatch(fetchSubcategories(selectedId));
    dispatch(
      changeFirstOptionCat({ category: event.target.value, id: selectedId })
    );
  };

  const handleChangeRegion = (event) => {
    handleChangeInputs(event, changeRegion);
  };

  const handleChangeSubcategory = (event) => {
    const selectedId = findIdCurrentOption(event);
    dispatch(
      changeSubcategory({ subcategory: event.target.value, id: selectedId })
    );
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

  const handleChangeVariety = (event) => {
    const selectedId = findIdCurrentOption(event);
    dispatch(changeVariety({ variety: event.target.value, id: selectedId }));
  };

  const handleChangeSlider = (event, newValue) => {
    dispatch(changeSliderValues({ newValue }));
  };

  const handleChangeFromSlider = (event) => {
    handleChangeInputs(event, changeSliderFromByKeys);
  };

  const handleChangeUntilSlider = (event) => {
    handleChangeInputs(event, changeSliderUntilByKeys);
  };

  const handleChangeMeasure = (event) => {
    handleChangeInputs(event, changeMeasure);
  };

  const handleChangeMinimalBet = (event) => {
    handleChangeInputs(event, changeMinimalBet);
  };

  const handleChangePackaging = (event) => {
    handleChangeInputs(event, changePackaging);
  };

  const handleAddSubscribe = (event) => {
    handleChangeInputs(event, addSubscribe);
  };

  useEffect(() => {
    dispatch(fetchMainData());
    dispatch(getCategories());
  }, [dispatch]);

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

  useValidationTimer(
    inputMinimalBetValid,
    dispatch,
    changeValidationAfterTimeMinimalBet,
    minimalBet
  );

  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const serializableFiles = files.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
      isActive: false,
      isMainImage: false,
    }));
    dispatch(fileChange({ payload: serializableFiles }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const serializableFiles = files.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
      isActive: false,
      isMainImage: false,
    }));
    dispatch(fileTransfer({ payload: serializableFiles }));
  };

  const handleDeleteImage = (event) => {
    dispatch(deleteImage(event.currentTarget.id));
  };

  const handleAddLot = () => {
    const newLot = {
      category_id: currentIdVariety,
      price_per_unit: Number((currentPrice / currentWeight).toFixed(2)),
      start_price: minimalBet,
      expiration_days: currentValidity,
      length_unit: currentMeasure,
      title: title,
      quantity: currentWeight,
      weight: currentWeightMeasure,
      location: {
        country: currentCountry,
        region: currentRegion,
      },
      description: description,
      size: sliderCurrent[0],
      packaging: currentPackages,
      currency: currentPricingMeasure,
    };
    dispatch(postNewLot(newLot));
  };

  const handleChangeMainPicture = (event) => {
    dispatch(changeMainPicture(event.currentTarget.id));
  };

  const arrayPicturesPreview = picturesFiles.map((item) => {
    let isMainPicture = item.url === mainPicture;
    return (
      <div className={classes.picture} key={uuidv4()} id={item.url}>
        <img src={item.url} alt="Preview" className={classes.imgPreview} />
        <div
          className={classes.close}
          onClick={handleDeleteImage}
          id={item.url}
        >
          <Close />
        </div>
        <p
          className={classes.toMakeMain}
          onClick={handleChangeMainPicture}
          id={item.url}
        >
          Make the title
        </p>
        <p className={isMainPicture ? classes.titleImage : classes.hidden}>
          Title image
        </p>
      </div>
    );
  });

  useEffect(() => {
    dispatch(getActualVariety());
  }, [dispatch, currentIdCategory]);

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch, currentCategory]);

  useEffect(() => {
    dispatch(getRegionsCurrentCountry(currentCountry));
  }, [dispatch, currentCountry]);

  return (
    <div className={classes.addlot}>
      {currency ? (
        <>
          <div className={classes.labelNewLot}>
            <OneStepBack />
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

            <SingleSelectorForAddLot
              label={'Variety'}
              categories={varieties}
              changeOption={handleChangeVariety}
              chosenOption={currentVariety}
              needPlaceholder={true}
            />
            <div>Size</div>
            <div className={classes.slider}>
              <Slider
                min={sliderLimitCurrent[0]}
                max={sliderLimitCurrent[1]}
                currentValue={sliderCurrent}
                changeSlider={handleChangeSlider}
              />
            </div>

            <div className={classes.numberInputs}>
              <div>
                <NumberInput
                  from={sliderCurrent[0]}
                  until={sliderCurrent[1]}
                  isValidFrom={validSliderFrom}
                  isValidUntil={validSliderUntil}
                  changeFrom={handleChangeFromSlider}
                  changeUntil={handleChangeUntilSlider}
                />
              </div>
              <SingleSelectorForAddLot
                categories={sizing}
                chosenOption={currentMeasure}
                changeOption={handleChangeMeasure}
              />
            </div>

            <SingleSelectorForAddLot
              label={'Packaging'}
              categories={packaging}
              changeOption={handleChangePackaging}
              chosenOption={currentPackages}
              needPlaceholder={false}
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
              <SelectorAndInputForAddLot
                label={'Minimal bet'}
                placeholder={'Enter the minimal bet'}
                options={currency}
                changeInput={handleChangeMinimalBet}
                inputValue={minimalBet}
                isValid={inputMinimalBetValid}
                changeSelector={handleChangeSelectorCurrency}
                selectorValue={currentPricingMeasure}
              />
              <p className={classes.comment}>
                Minimal bet should be less than price
              </p>
            </div>
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
            <div className={classes.describing}>
              <div>Description production</div>
              <textarea
                cols="40"
                rows="5"
                placeholder="Enter your describing here"
                onChange={handleAddSubscribe}
                className={isDescriptionValid ? null : classes.pink}
              ></textarea>
              <p className={classes.comment}>
                Max{' '}
                <span className={isDescriptionValid ? null : classes.red}>
                  200
                </span>{' '}
                symbols
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
                  accept="image/*, .png, .jpg, .gif, .web,"
                />
              </div>
              <p className={classes.comment}>
                {picturesFiles.length} of 9 images
              </p>
              <div className={classes.picturesBlock}>
                {arrayPicturesPreview}
              </div>
            </div>
          </div>

          <div className={classes.buttons}>
            <NavLink to={ROUTES.PREVIEW}>
              <button
                disabled={!fullValidationForm}
                className={fullValidationForm ? classes.validButton : null}
              >
                Preview
              </button>
            </NavLink>
            <NavLink to={ROUTES.FINISHADD}>
              <button
                disabled={!fullValidationForm}
                className={fullValidationForm ? classes.validButton : null}
                onClick={handleAddLot}
              >
                Place an advertisment
              </button>
            </NavLink>
          </div>
          <p className={classes.comment}>
            This ad will placed on the site after review the moderator.
          </p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default AddLot;
