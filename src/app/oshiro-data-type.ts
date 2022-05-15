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
export interface CharacterTypeDoc {
  id: string;
  code: string;
  names: string[];
  num: number;
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
  types: string[]; // CharacterTypeDoc.id, CharacterTypeDoc.subCharacterType.id
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
