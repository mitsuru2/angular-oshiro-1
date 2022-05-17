import { Timestamp } from '@firebase/firestore-types'

/**
 * Firestore collection names.
 */
export const FsCollectionName = {
  Abilities: 'Abilities',
  AbilityTypes: 'AbilityTypes',
  CharacterParamTypes: 'CharacterParamTypes',
  CharacterTags: 'CharacterTags',
  Characters: 'Characters',
  Facilities: 'Facilities',
  FacilityTypes: 'FacilityTypes',
  GeographTypes: 'GeographTypes',
  Illustrators: 'Illustrators',
  Regions: 'Regions',
  UserCharacterLists: 'UserCharacterLists',
  UserFacilityLists: 'UserFacilityLists',
  UserWeaponLists: 'UserWeaponLists',
  VoiceActors: 'VoiceActors',
  WeaponTypes: 'WeaponTypes',
  Weapons: 'Weapons'
} as const
export type FsCollectionName = typeof FsCollectionName[keyof typeof FsCollectionName]

export type TFsCollectionName =
  | 'Abilities'
  | 'AbilityTypes'
  | 'CharacterParamTypes'
  | 'CharacterTags'
  | 'CharacterTypes'
  | 'Characters'
  | 'Facilities'
  | 'FacilityTypes'
  | 'GeographTypes'
  | 'Illustrators'
  | 'Regions'
  | 'UserCharacterLists'
  | 'UserFacilityLists'
  | 'UserWeaponLists'
  | 'Users'
  | 'VoiceActors'
  | 'WeaponTypes'
  | 'Weapons';
export namespace TFsCollectionName {
  export const Abilities: TFsCollectionName = 'Abilities'
  export const AbilityTypes: TFsCollectionName = 'AbilityTypes'
  export const CharacterparamTypes: TFsCollectionName = 'CharacterParamTypes'
  export const CharacterTags: TFsCollectionName = 'CharacterTags'
  export const CharacterTypes: TFsCollectionName = 'CharacterTypes'
  export const Characters: TFsCollectionName = 'Characters'
  export const Facilities: TFsCollectionName = 'Facilities'
  export const FacilityTypes: TFsCollectionName = 'FacilityTypes'
  export const GeographTypes: TFsCollectionName = 'GeographTypes'
  export const Illustrators: TFsCollectionName = 'Illustrators'
  export const Regions: TFsCollectionName = 'Regions'
  export const UserCharacterLists: TFsCollectionName = 'UserCharacterLists'
  export const UserFacilityLists: TFsCollectionName = 'UserFacilityLists'
  export const UserWeaponLists: TFsCollectionName = 'UserWeaponLists'
  export const Users: TFsCollectionName = 'Users'
  export const VoiceActors: TFsCollectionName = 'VoiceActors'
  export const WeaponTypes: TFsCollectionName = 'WeaponTypes'
  export const Weapons: TFsCollectionName = 'Weapons'
}

/**
 * Data types for Firestore documents.
 */
/** Collection: Abilities */
type FsAbilityDocBase = {
  name: string;
  type: string; // AbilityTypes.id
  desc: string[];
};
export type FsAbilityAfs = {
  id: string;
} & FsAbilityDocBase;
export type FsAbilityDoc = {
  [id: string]: FsAbilityDocBase;
};

/** Collection: AbilityTypes */
type FsAbilityTypeBase = {
  name: string;
  order: number;
};
export type FsAbilityTypeAfs = {
  id: string;
} & FsAbilityTypeBase;
export type FsAbilityTypeDoc = {
  [id: string]: FsAbilityTypeBase;
};

/** Collection: CharacterParamTypes */
type TCharacterParamTypeBase = {
  name: {
    normal: string;
    short: string;
  };
  order: number;
};
export type TCharacterParamTypeDocAfs = {
  id: string;
} & TCharacterParamTypeBase;
export type TCharacterParamTypeDocFs = {
  [id: string]: TCharacterParamTypeBase;
};

/** Collection: CharacterTags */
type TCharacterTagBase = {
  name: string;
  characters: string[];
};
export type TCharacterTagDocAfs = {
  is: string;
} & TCharacterTagBase;
export type TCharacterTagDocFs = {
  [id: string]: TCharacterTagBase;
};

/** Collection: CharacterTypes */
type TCharacterTypeBase = {
  code: string;
  names: string[];
  num: number;
};
export type TCharacterTypeDocAfs = {
  id: string;
} & TCharacterTypeBase;
export type TCharacterTypeDocFs = {
  [id: string]: TCharacterTypeBase;
};

/** Collection: Characters */
type TCharacterBase = {
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
  imageWeapons?: {'id':string, 'name':string}[]; // {WeaponDoc.id, string}
  imageFacilities?: {'id':string, 'name':string, 'type':string}[]; // {FacilityDoc.id, string, FacilityTypeDoc.id}
  tags?: string[]; // CharacterTagDoc.id
};
export type TCharacterDocAfs = {
  id: string;
} & TCharacterBase;
export type TCharacterDocFs = {
  [id: string]: TCharacterBase;
};

/** Collection: Facilities */
type TFacilityBase = {
  name: string;
  type: string; // FacilityTypes.id
  rarerity: number;
  desc: string[];
};
export type TFacilityDocAfs = {
  id: string;
} & TFacilityBase;
export type TFacilityDocFs = {
  [id: string]: TFacilityBase;
};

/** Collection: FacilityTypes */
type TFacilityTypeBase = {
  name: string;
  order: string;
};
export type TFacilityTypeDocAfs = {
  id: string;
} & TFacilityTypeBase;
export type TFacilityTypeDocFs = {
  [id: string]: TFacilityTypeBase;
};

/** Collection: GeographTypes */
type TGeographTypeBase = {
  name: string;
  order: string;
};
export type TGeographTypeDocAfs = {
  id: string;
} & TGeographTypeBase;
export type TGeographTypeDocFs = {
  [id: string]: TGeographTypeBase;
};

/** Collection: Illustrators */
type TIllustratorBase = {
  name: string;
};
export type TIllustratorDocAfs = {
  id: string;
} & TIllustratorBase;
export type TIllustratorDocFs = {
  [id: string]: TIllustratorBase;
};

/** Collection: Regions */
type TRegionBase = {
  name: string;
  order: string;
};
export type TRegionDocAfs = {
  id: string;
} & TRegionBase;
export type TRegionDocFs = {
  [id: string]: TRegionBase;
};

/** Collection: UserCharacterLists */
type TUserCharacterListBase = {
  user: string; // UserDoc.id
  characters: string[]; // CharacterDoc.id
};
export type TUserCharacterListDocAfs = {
  id: string;
} & TUserCharacterListBase;
export type TUserCharacterListDocFs = {
  [id: string]: TUserCharacterListBase;
};

/** Collection: UserFacilityLists */
type TUserFacilityListBase = {
  user: string; // UserDoc.id
  characters: string[]; // CharacterDoc.id
};
export type TUserFacilityListDocAfs = {
  id: string;
} & TUserFacilityListBase;
export type TUserFacilityListDocFs = {
  [id: string]: TUserFacilityListBase;
};

/** Collection: UserWeaponLists */
type TUserWeaponListBase = {
  user: string; // UserDoc.id
  characters: string[]; // CharacterDoc.id
};
export type TUserWeaponListDocAfs = {
  id: string;
} & TUserWeaponListBase;
export type TUserWeaponListDocFs = {
  [id: string]: TUserWeaponListBase;
};

/** Collection: Users */
type TUserBase = {
  name: string;
};
export type TUserDocAfs = {
  id: string;
} & TUserBase;
export type TUserDocFs = {
  [id: string]: TUserBase;
};

/** Collection: VoiceActors */
type TVoiceActorBase = {
  name: string;
};
export type TVoiceActorDocAfs = {
  id: string;
} & TVoiceActorBase;
export type TVoiceActorDocFs = {
  [id: string]: TVoiceActorBase;
};

/** Collection: WeaponTypes */
type TWeaponTypeBase = {
  name: string;
  order: number;
  baseCost: number;
};
export type TWeaponTypeDocAfs = {
  id: string;
} & TWeaponTypeBase;
export type TWeaponTypeDocFs = {
  [id: string]: TWeaponTypeBase;
};

/** Collection: Weapons */
type TWeaponBase = {
  name: string;
  type: string; // WeaponTypes.id
  rarerity: number;
  desc: string[];
};
export type TWeaponDocAfs = {
  id: string;
} & TWeaponBase;
export type TWeaponDocFs = {
  [id: string]: TWeaponBase;
};

/**
 * Old version definitions.
 */
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
