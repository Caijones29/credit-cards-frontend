import React from 'react';

const AvatarPreview = ({ avatarObject }) => {
    if (!avatarObject) return null;

    const { base, eyes, mouth, hat, clothing, extras } = avatarObject;

    return (
        <div className="Avatar-preview-container">
            {base && <img src={base} alt="Avatar Base" className="Avatar-preview-image" />}
            {eyes && <img src={eyes} alt="Avatar Eyes" className="Avatar-eye-image" />}
            {mouth && <img src={mouth} alt="Avatar Mouth" className="Avatar-mouth-image" />}
            {hat && <img src={hat} alt="Avatar Hat" className="Avatar-hat-image" />}
            {clothing && <img src={clothing} alt="Avatar Clothing" className="Avatar-clothing-image" />}
            {extras && <img src={extras} alt="Avatar Extras" className="Avatar-extras-image" />}
        </div>
    );
};

export default AvatarPreview;
