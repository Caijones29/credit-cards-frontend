import emptyBaseAvatar from '../../../customImages/avatarCreationImages/Bases/emptyBaseAvatar.png';
import TabbyBase from '../../../customImages/avatarCreationImages/Bases/TabbyBase.png';
import TomcatBase from '../../../customImages/avatarCreationImages/Bases/TomcatBase.png';
import TuxedoBase from '../../../customImages/avatarCreationImages/Bases/TuxedoBase.png';
import CalicoBase from '../../../customImages/avatarCreationImages/Bases/CalicoBase.png';

import DizzyEyes from '../../../customImages/avatarCreationImages/Eyes/DizzyEyes.png';
import HeterochromiaEyes from '../../../customImages/avatarCreationImages/Eyes/HeterochromiaEyes.png';
import ThugEyes from '../../../customImages/avatarCreationImages/Eyes/ThugEyes.png';
import HeartEyes from '../../../customImages/avatarCreationImages/Eyes/HeartEyes.png'

import NyahMouth from '../../../customImages/avatarCreationImages/Mouths/NyahMouth.png';
import PepesMouth from '../../../customImages/avatarCreationImages/Mouths/PepesMouth.png';
import PoutMouth from '../../../customImages/avatarCreationImages/Mouths/PoutMouth.png';
import SilencedMouth from '../../../customImages/avatarCreationImages/Mouths/SilencedMouth.png';

import ErrorHat from '../../../customImages/avatarCreationImages/Hats/ErrorHat.png';
import FrogHat from '../../../customImages/avatarCreationImages/Hats/FrogHat.png';
import RoyalHat from '../../../customImages/avatarCreationImages/Hats/RoyalHat.png';
import SombreroHat from '../../../customImages/avatarCreationImages/Hats/SombreroHat.png';

import PikachuClothing from '../../../customImages/avatarCreationImages/Clothing/PikachuClothing.png';
import RaccoonClothing from '../../../customImages/avatarCreationImages/Clothing/RaccoonClothing.png';
import TurtleneckClothing from '../../../customImages/avatarCreationImages/Clothing/TurtleneckClothing.png';
import VintageClothing from '../../../customImages/avatarCreationImages/Clothing/VintageClothing.png';

import BillboardExtra from '../../../customImages/avatarCreationImages/Extras/BillboardExtra.png';
import DuckyExtra from '../../../customImages/avatarCreationImages/Extras/DuckyExtra.png';
import RedbullExtra from '../../../customImages/avatarCreationImages/Extras/RedbullExtra.png';
import SushiExtra from '../../../customImages/avatarCreationImages/Extras/SushiExtra.png';

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
    base: emptyBaseAvatar,
    eyes: null,
    mouth: null,
    hat: null,
    clothing: null,
    extras: null
};