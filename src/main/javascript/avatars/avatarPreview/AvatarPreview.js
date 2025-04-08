import React from 'react';
import '../../../css/avatars/avatarPreview/AvatarPreview.css'

const AvatarPreview = ({ avatarObject }) => {
    if (!avatarObject) return null;

    const { base, eyes, mouth, hat, clothing, extras } = avatarObject;

    return (
        <div className="Avatar-preview-container">
            {base && <img src={base} alt="Avatar Base" className="Avatar-preview-image" />}
            {eyes && <img src={eyes} alt="Avatar Eyes" className="Avatar-preview-image" />}
            {mouth && <img src={mouth} alt="Avatar Mouth" className="Avatar-preview-image" />}
            {hat && <img src={hat} alt="Avatar Hat" className="Avatar-preview-image" />}
            {clothing && <img src={clothing} alt="Avatar Clothing" className="Avatar-preview-image" />}
            {extras && <img src={extras} alt="Avatar Extras" className="Avatar-preview-image" />}
        </div>
    );
};

export default AvatarPreview;
