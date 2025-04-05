import React, { useState, useEffect } from 'react';
import './AvatarCustomiserPopUp.css';
import './AvatarPreview.css';
import AvatarPreview from './AvatarPreview';
import RandomiseAvatar from './RandomiseAvatar';

import {
    baseOptions,
    eyeOptions,
    mouthOptions,
    hatOptions,
    clothingOptions,
    extrasOptions,
    defaultAvatarObject
} from './avatarObject';

const AvatarCustomiserPopUp = ({ closePopup }) => {
    // Initialize avatarObject using useState to allow state management
    const [avatarObject, setAvatarObject] = useState(() => {
        const savedAvatar = sessionStorage.getItem("avatar");
        return savedAvatar ? JSON.parse(savedAvatar) : { ...defaultAvatarObject };
    });

    // Initialize state with current values from avatarObject or default to -1 if not set
    const [baseIndex, setBaseIndex] = useState(() => baseOptions.indexOf(avatarObject.base) || 0);
    const [eyeIndex, setEyeIndex] = useState(() => eyeOptions.indexOf(avatarObject.eyes) || -1);
    const [mouthIndex, setMouthIndex] = useState(() => mouthOptions.indexOf(avatarObject.mouth) || -1);
    const [hatIndex, setHatIndex] = useState(() => hatOptions.indexOf(avatarObject.hat) || -1);
    const [clothingIndex, setClothingIndex] = useState(() => clothingOptions.indexOf(avatarObject.clothing) || -1);
    const [extrasIndex, setExtrasIndex] = useState(() => extrasOptions.indexOf(avatarObject.extras) || -1);

    // Function to handle cycling through avatar parts
    const nextBase = () => setBaseIndex((baseIndex + 1) % baseOptions.length);
    const prevBase = () => setBaseIndex((baseIndex - 1 + baseOptions.length) % baseOptions.length);

    const nextEye = () => setEyeIndex((eyeIndex + 1) % eyeOptions.length);
    const prevEye = () => setEyeIndex((eyeIndex - 1 + eyeOptions.length) % eyeOptions.length);

    const nextMouth = () => setMouthIndex((mouthIndex + 1) % mouthOptions.length);
    const prevMouth = () => setMouthIndex((mouthIndex - 1 + mouthOptions.length) % mouthOptions.length);

    const nextHat = () => setHatIndex((hatIndex + 1) % hatOptions.length);
    const prevHat = () => setHatIndex((hatIndex - 1 + hatOptions.length) % hatOptions.length);

    const nextClothing = () => setClothingIndex((clothingIndex + 1) % clothingOptions.length);
    const prevClothing = () => setClothingIndex((clothingIndex - 1 + clothingOptions.length) % clothingOptions.length);

    const nextExtras = () => setExtrasIndex((extrasIndex + 1) % extrasOptions.length);
    const prevExtras = () => setExtrasIndex((extrasIndex - 1 + extrasOptions.length) % extrasOptions.length);

    // Update the global avatarObject whenever selections change
    const updateAvatarObject = () => {
        setAvatarObject({
            base: baseOptions[baseIndex],
            eyes: eyeIndex >= 0 ? eyeOptions[eyeIndex] : avatarObject.eyes,
            mouth: mouthIndex >= 0 ? mouthOptions[mouthIndex] : avatarObject.mouth,
            hat: hatIndex >= 0 ? hatOptions[hatIndex] : avatarObject.hat,
            clothing: clothingIndex >= 0 ? clothingOptions[clothingIndex] : avatarObject.clothing,
            extras: extrasIndex >= 0 ? extrasOptions[extrasIndex] : avatarObject.extras
        });
        console.log('Updated avatarObject:', avatarObject);
    };

    // Call updateAvatarObject whenever any index changes
    useEffect(() => {
        updateAvatarObject();
    }, [baseIndex, eyeIndex, mouthIndex, hatIndex, clothingIndex, extrasIndex]);

    return (
        <div className="AvatarCustomiserPopUp-overlay">
            <div className="Login-popup">
                <h2 className="Popup-title">Avatar Customisation</h2>

                {/* Use the AvatarPreview component to render the avatar */}
                <AvatarPreview avatarObject={avatarObject} />

                <div className="Randomise-button-wrapper">
                    <RandomiseAvatar
                        setBaseIndex={setBaseIndex}
                        setEyeIndex={setEyeIndex}
                        setMouthIndex={setMouthIndex}
                        setHatIndex={setHatIndex}
                        setClothingIndex={setClothingIndex}
                        setExtrasIndex={setExtrasIndex}
                    />
                </div>


                <div className="Avatar-button-row">
                    <button className="Avatar-cycle-button" onClick={prevBase}>⟵</button>
                    <span className="Customisation-label">Base</span>
                    <button className="Avatar-cycle-button" onClick={nextBase}>⟶</button>
                </div>

                <div className="Avatar-button-row">
                    <button className="Avatar-cycle-button" onClick={prevEye}>⟵</button>
                    <span className="Customisation-label">Eyes</span>
                    <button className="Avatar-cycle-button" onClick={nextEye}>⟶</button>
                </div>

                <div className="Avatar-button-row">
                    <button className="Avatar-cycle-button" onClick={prevMouth}>⟵</button>
                    <span className="Customisation-label">Mouth</span>
                    <button className="Avatar-cycle-button" onClick={nextMouth}>⟶</button>
                </div>

                <div className="Avatar-button-row">
                    <button className="Avatar-cycle-button" onClick={prevHat}>⟵</button>
                    <span className="Customisation-label">Hat</span>
                    <button className="Avatar-cycle-button" onClick={nextHat}>⟶</button>
                </div>

                <div className="Avatar-button-row">
                    <button className="Avatar-cycle-button" onClick={prevClothing}>⟵</button>
                    <span className="Customisation-label">Clothing</span>
                    <button className="Avatar-cycle-button" onClick={nextClothing}>⟶</button>
                </div>

                <div className="Avatar-button-row">
                    <button className="Avatar-cycle-button" onClick={prevExtras}>⟵</button>
                    <span className="Customisation-label">Extras</span>
                    <button className="Avatar-cycle-button" onClick={nextExtras}>⟶</button>
                </div>

                {/* Button to save the customised avatar and close the popup */}
                <button
                    className="Save-avatar-button"
                    onClick={() => {
                        updateAvatarObject();
                        sessionStorage.setItem("avatar", JSON.stringify(avatarObject));
                        console.log("Avatar saved into sessionStorage", avatarObject);

                        closePopup();
                    }}
                >
                    Save Avatar
                </button>

            </div>
        </div>
    );
};

export default AvatarCustomiserPopUp;
