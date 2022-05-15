import { Timestamp } from '@firebase/firestore-types';

/**
 * Base data types (private)
 */
interface IdAndName {
  id: string;
  name: string;
}
interface IdAndNameAndOrder extends IdAndName {
  order: number;
}
interface IdAndNameAndType extends IdAndName {
  type: string;
}

/**
 * Data types for Firestore documents.
 */
/** Collection: Abilities */
export interface T_Ability_Base {
  name: string;
  type: string; // AbilityTypes.id
  desc: string[];
}
export interface T_Ability_AfsDoc extends T_Ability_Base {
  id: string;
}
export interface T_Ability_FsDoc {
  [id: string]: T_Ability_Base;
}

/** Collection: AbilityTypes */
export interface T_AbilityType_Base {
  name: string;
  order: number;
}
export interface T_AbilityType_AfsDoc extends T_AbilityType_Base {
  id: string;
}
export interface T_AbilityType_FsDoc {
  [id: string]: T_AbilityType_Base;
}

/** Collection: CharacterParamTypes */
export interface T_CharacterParamType_Base {
  name: {
    normal: string;
    short: string;
  };
  order: number;
}
export interface T_CharacterParamType_AfsDoc extends T_CharacterParamType_Base {
  id: string;
}
export interface T_CharacterParamType_FsDoc {
  [id: string]: T_CharacterParamType_Base;
}

/** Collection: CharacterTags */
export interface T_CharacterTag_Base {
  name: string;
  characters: string[];
}
export interface T_CharacterTag_AfsDoc extends T_CharacterTag_Base {
  is: string;
}
export interface T_CharacterTag_FsDoc {
  [id: string]: T_CharacterTag_Base;
}

/** Collection: CharacterTypes */
export interface T_CharacterType_Base {
  code: string;
  names: string[];
  num: number;
}
export interface T_CharacterType_AfsDoc extends T_CharacterType_Base {
  id: string;
}
export interface T_CharacterType_FsDoc {
  [id: string]: T_CharacterType_Base;
}

/** Collection: Characters */
export interface T_Character_Base {
  name: string;
  type: string; // CharacterTypeDoc.id
  creationDateTime: Timestamp;
  rarerity: number;
  geographTypes: string[]; // GeographTypeDoc.id
  region: string; // RegionDoc.id
  weaponType: string; // WeaponTypeDoc.id
  cost: number;
  cost_kai?: number;
  abilities?: string[]; // AbilityDoc.id
  abilities_kai?: string; // AbilityDoc.id
  voiceActors?: string[]; // VoiceActorDoc.id
  illustrators?: string[]; // IllustratorDoc.id
  imageWeapons?: IdAndName[]; // {WeaponDoc.id, string}
  imageFacilities?: IdAndNameAndType[]; // {FacilityDoc.id, string, FacilityTypeDoc.id}
  tags?: string[]; // CharacterTagDoc.id
}
export interface T_Character_AfsDoc extends T_Character_Base {
  id: string;
}
export interface T_Character_FsDoc {
  [id: string]: T_Character_Base;
}

/** Collection: Facilities */
export interface T_Facility_Base {
  name: string;
  type: string; // FacilityTypes.id
  rarerity: number;
  desc: string[];
}
export interface T_Facility_AfsDoc extends T_Facility_Base {
  id: string;
}
export interface T_Facility_FsDoc {
  [id: string]: T_Facility_Base;
}

/** Collection: FacilityTypes */
export interface T_FacilityType_Base {
  name: string;
  order: string;
}
export interface T_FacilityType_AfsDoc extends T_FacilityType_Base {
  id: string;
}
export interface T_FacilityType_FsDoc {
  [id: string]: T_FacilityType_Base;
}

/** Collection: GeographTypes */
export interface T_GeographType_Base {
  name: string;
  order: string;
}
export interface T_GeographType_AfsDoc extends T_GeographType_Base {
  id: string;
}
export interface T_GeographType_FsDoc {
  [id: string]: T_GeographType_Base;
}

/** Collection: Illustrators */
export interface T_Illustrator_Base {
  name: string;
}
export interface T_Illustrator_AfsDoc extends T_Illustrator_Base {
  id: string;
}
export interface T_Illustrator_FsDoc {
  [id: string]: T_Illustrator_Base;
}

/** Collection: Regions */
export interface T_Region_Base {
  name: string;
  order: string;
}
export interface T_Region_AfsDoc extends T_Region_Base {
  id: string;
}
export interface T_Region_FsDoc {
  [id: string]: T_Region_Base;
}

/** Collection: UserCharacterLists */
export interface T_UserCharacterList_Base {
  user: string; // UserDoc.id
  characters: string[]; // CharacterDoc.id
}
export interface T_UserCharacterList_AfsDoc extends T_UserCharacterList_Base {
  id: string;
}
export interface T_UserCharacterList_FsDoc {
  [id: string]: T_UserCharacterList_Base;
}

/** Collection: UserFacilityLists */
export interface T_UserFacilityList_Base {
  user: string; // UserDoc.id
  characters: string[]; // CharacterDoc.id
}
export interface T_UserFacilityList_AfsDoc extends T_UserFacilityList_Base {
  id: string;
}
export interface T_UserFacilityList_FsDoc {
  [id: string]: T_UserFacilityList_Base;
}

/** Collection: UserWeaponLists */
export interface T_UserWeaponList_Base {
  user: string; // UserDoc.id
  characters: string[]; // CharacterDoc.id
}
export interface T_UserWeaponList_AfsDoc extends T_UserWeaponList_Base {
  id: string;
}
export interface T_UserWeaponList_FsDoc {
  [id: string]: T_UserWeaponList_Base;
}

/** Collection: Users */
export interface T_User_Base {
  name: string;
}
export interface T_User_AfsDoc extends T_User_Base {
  id: string;
}
export interface T_User_FsDoc {
  [id: string]: T_User_Base;
}

/** Collection: VoiceActors */
export interface T_VoiceActor_Base {
  name: string;
}
export interface T_VoiceActor_AfsDoc extends T_VoiceActor_Base {
  id: string;
}
export interface T_VoiceActor_FsDoc {
  [id: string]: T_VoiceActor_Base;
}

/** Collection: WeaponTypes */
export interface T_WeaponType_Base {
  name: string;
  order: number;
  baseCost: number;
}
export interface T_WeaponType_AfsDoc extends T_WeaponType_Base {
  id: string;
}
export interface T_WeaponType_FsDoc {
  [id: string]: T_WeaponType_Base;
}

/** Collection: Weapons */
export interface T_Weapon_Base {
  name: string;
  type: string; // WeaponTypes.id
  rarerity: number;
  desc: string[];
}
export interface T_Weapon_AfsDoc extends T_Weapon_Base {
  id: string;
}
export interface T_Weapon_FsDoc {
  [id: string]: T_Weapon_Base;
}

/**
 * Old version definitions.
 */
export interface CharacterTypeDoc {
  id: string;
  code: string;
  names: string[];
  num: number;
}
export interface CharacterTypeMap {
  [id: string]: {
    code: string;
    names: string[];
    num: number;
  };
}

export interface GeographTypeDoc extends IdAndNameAndOrder {}

export interface RegionDoc extends IdAndNameAndOrder {}

export interface WeaponTypeDoc extends IdAndNameAndOrder {
  baseCost: number;
}

export interface WeaponDoc extends IdAndNameAndType {
  rarerity: number;
  desc: string[];
}

export interface FacilityTypeDoc extends IdAndNameAndOrder {}

export interface FacilityDoc extends IdAndNameAndType {
  rarerity: number;
  desc: string[];
}

export interface AbilityTypeDoc extends IdAndNameAndOrder {}

export interface AbilityDoc extends IdAndNameAndType {
  desc: string[];
}

export interface VoiceActorDoc extends IdAndName {}

export interface IllustratrDoc extends IdAndName {}

export interface CharacterTagDoc extends IdAndName {
  characters: string[]; // CharacterDoc.id
}

export interface CharacterParamTypeDoc {
  id: string;
  name: {
    normal: string;
    short: string;
  };
  order: number;
}

export interface CharacterDoc extends IdAndName {
  type: string; // CharacterTypeDoc.id
  creationDateTime: Timestamp;
  rarerity: number;
  geographTypes: string[]; // GeographTypeDoc.id
  region: string; // RegionDoc.id
  weaponType: string; // WeaponTypeDoc.id
  cost: number;
  cost_kai?: number;
  abilities?: string[]; // AbilityDoc.id
  abilities_kai?: string; // AbilityDoc.id
  voiceActors?: string[]; // VoiceActorDoc.id
  illustrators?: string[]; // IllustratorDoc.id
  imageWeapons?: IdAndName[]; // {WeaponDoc.id, string}
  imageFacilities?: IdAndNameAndType[]; // {FacilityDoc.id, string, FacilityTypeDoc.id}
  tags?: string[]; // CharacterTagDoc.id
}

export interface UserCharacterListDoc {
  id: string;
  user: string; // UserDoc.id
  characters: string[]; // CharacterDoc.id
}

export interface UserFacilityListDoc {
  id: string;
  user: string; // UserDoc.id
  facilities: string[]; // FacilityDoc.id
}

export interface UserWeaponListDoc {
  id: string;
  user: string; // UserDoc.id
  weapons: string[]; // WeaponDoc.id
}

export interface UserDoc extends IdAndName {}
