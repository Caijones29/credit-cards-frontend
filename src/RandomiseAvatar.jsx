import React from 'react';
import './AvatarCustomiserPopUp.css';
import {
    baseOptions,
    eyeOptions,
    mouthOptions,
    hatOptions,
    clothingOptions,
    extrasOptions
} from './avatarObject';

const RandomiseAvatar = ({
                             setBaseIndex,
                             setEyeIndex,
                             setMouthIndex,
                             setHatIndex,
                             setClothingIndex,
                             setExtrasIndex
                         }) => {
    const getRandomIndex = (options, excludeFirst = false) => {
        const start = excludeFirst ? 1 : 0;
        return Math.floor(Math.random() * (options.length - start)) + start;
    };

    const handleClick = () => {
        setBaseIndex(getRandomIndex(baseOptions, true));
        setEyeIndex(getRandomIndex(eyeOptions));
        setMouthIndex(getRandomIndex(mouthOptions));
        setHatIndex(getRandomIndex(hatOptions));
        setClothingIndex(getRandomIndex(clothingOptions));
        setExtrasIndex(getRandomIndex(extrasOptions));
    };

    return (
        <button className="Randomise-avatar-button" onClick={handleClick}>
            Randomise
        </button>
    );
};

export default RandomiseAvatar;