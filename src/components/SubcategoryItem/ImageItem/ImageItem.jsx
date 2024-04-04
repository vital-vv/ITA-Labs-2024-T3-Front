import {useState} from "react";
import NoItem from "../../../assets/images/noItem.png";

const ImageItem = ({ imageUrl, name }) => {
    const [loadingError, setLoadingError] = useState(false);

    const handleImageError = () => {
        setLoadingError(true);
    };

    return (
        <img
            src={loadingError ? NoItem : imageUrl}
            alt={name}
            onError={handleImageError}
        />
    );
};

export {ImageItem}