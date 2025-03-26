import emptyBaseAvatar from './avatarCreationImages/Bases/emptyBaseAvatar.png';
import TabbyBase from './avatarCreationImages/Bases/TabbyBase.png';
import TomcatBase from './avatarCreationImages/Bases/TomcatBase.png';
import TuxedoBase from './avatarCreationImages/Bases/TuxedoBase.png';
import CalicoBase from './avatarCreationImages/Bases/CalicoBase.png';

import DizzyEyes from './avatarCreationImages/Eyes/DizzyEyes.png';
import HeterochromiaEyes from './avatarCreationImages/Eyes/HeterochromiaEyes.png';
import ThugEyes from './avatarCreationImages/Eyes/ThugEyes.png';
import HeartEyes from './avatarCreationImages/Eyes/HeartEyes.png'

import NyahMouth from './avatarCreationImages/Mouths/NyahMouth.png';
import PepesMouth from './avatarCreationImages/Mouths/PepesMouth.png';
import PoutMouth from './avatarCreationImages/Mouths/PoutMouth.png';
import SilencedMouth from './avatarCreationImages/Mouths/SilencedMouth.png';

import ErrorHat from './avatarCreationImages/Hats/ErrorHat.png';
import FrogHat from './avatarCreationImages/Hats/FrogHat.png';
import RoyalHat from './avatarCreationImages/Hats/RoyalHat.png';
import SombreroHat from './avatarCreationImages/Hats/SombreroHat.png';

import PikachuClothing from './avatarCreationImages/Clothing/PikachuClothing.png';
import RaccoonClothing from './avatarCreationImages/Clothing/RaccoonClothing.png';
import TurtleneckClothing from './avatarCreationImages/Clothing/TurtleneckClothing.png';
import VintageClothing from './avatarCreationImages/Clothing/VintageClothing.png';

import BillboardExtra from './avatarCreationImages/Extras/BillboardExtra.png';
import DuckyExtra from './avatarCreationImages/Extras/DuckyExtra.png';
import RedbullExtra from './avatarCreationImages/Extras/RedbullExtra.png';
import SushiExtra from './avatarCreationImages/Extras/SushiExtra.png';

// Arrays of all the options user has
export const baseOptions = [
    emptyBaseAvatar,
    TabbyBase,
    TomcatBase,
    TuxedoBase,
    CalicoBase
];

export const eyeOptions = [
    DizzyEyes,
    HeterochromiaEyes,
    ThugEyes,
    HeartEyes
];

export const mouthOptions = [
    NyahMouth,
    PepesMouth,
    PoutMouth,
    SilencedMouth
];

export const hatOptions = [
    ErrorHat,
    FrogHat,
    RoyalHat,
    SombreroHat
];

export const clothingOptions = [
    PikachuClothing,
    RaccoonClothing,
    TurtleneckClothing,
    VintageClothing
];

export const extrasOptions = [
    BillboardExtra,
    DuckyExtra,
    RedbullExtra,
    SushiExtra
];

// the initial avatar object. When the user starts editing their avatar, the default empty one is displayed.
export const defaultAvatarObject = {
    base: null,
    eyes: null,
    mouth: null,
    hat: null,
    clothing: null,
    extras: null,
    unlockables: []
};