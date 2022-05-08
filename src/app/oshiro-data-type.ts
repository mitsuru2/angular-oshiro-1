export const enum CharacterType {
  ShiroMusume = '0', // 城娘
  ShiroMusumeCollabo = '1', // 城娘(コラボ)
  KabutoMusume = '2', // 兜娘
  CollaboUnit = '3', // コラボユニット
  Tono = '4', // 殿
  JinMusume = '5', // 神娘
  EventItem = '6', // イベントアイテム
}

export const enum GeographType {
  Plain = '0', // 平
  Hill = '1', // 平山
  Mountain = '2', // 山
  Seaside = '3', // 水
  Nothing = '4', // 無
}

export const enum WeaponType {
  Sword = '0', // 刀
  Spear = '1', // 槍
  Hammer = '2', // 槌
  Shield = '3', // 盾
  Fist = '4', // 拳
  Scythe = '5', // 鎌
  Club = '6', // 戦棍
  DualSword = '7', // 双剣
  Bow = '8', // 弓
  CrossBow = '9', // 石弓
  Gun = '10', // 鉄砲
  Cannon = '11', // 大砲
  Kabu = '12', // 歌舞
  Amulet = '13', // 札
  Bell = '14', // 鈴
  Wand = '15', // 杖
  Haraegushi = '16', // 祓串
  Book = '17', // 本
  ThrowKnife = '18', //投剣
  Whip = '19', //鞭
  TrumpetShell = '20', // 陣貝
}

export const WeaponTypeCosts = {
  '0': { cost: 9 },
  '1': { cost: 5 },
  '2': { cost: 12 },
  '3': { cost: 11 },
  '4': { cost: 8 },
  '5': { cost: 9 },
  '6': { cost: 12 },
  '7': { cost: 11 },
  '8': { cost: 7 },
  '9': { cost: 9 },
  '10': { cost: 12 },
  '11': { cost: 14 },
  '12': { cost: 10 },
  '13': { cost: 10 },
  '14': { cost: 10 },
  '15': { cost: 11 },
  '16': { cost: 9 },
  '17': { cost: 10 },
  '18': { cost: 9 },
  '19': { cost: 8 },
  '20': { cost: 14 },
};

export const enum FacilityType {
  Gate = '0', // 門
  Moat = '1', // 堀
  Wall = '2', // 石垣
  Loophole = '3', // 狭間
  WaterSource = '4', // 水源
  Shachihoko = '5', // 鯱
  Shrine = '6', // 祠
  Tower = '7', // 櫓, 塔
  Armor = '8', // 鎧兜
  TeaRoom = '9', // 茶室
  Garden = '10', // 庭園
  Others = '11', // その他
}

export const enum Region {
  Hokkaido = '0', // 北海道
  Tohoku = '1', // 東北
  Kanto = '2', // 関東
  Koshinetsu = '3', // 甲信越
  Hokuriku = '4', // 北陸
  Tokai = '5', // 東海
  Kinki = '6', // 近畿
  Chugoku = '7', // 中国
  Shikoku = '8', // 四国
  Kyushu = '9', // 九州
  Okinawa = '10', // 沖縄
  Oversea = '11', // 海外
  Others = '12', // その他
  AnotherWorld = '13', //異界
}

export const enum AbilityType {
  Ability = '0', // 特技
  GroupAbility = '1', // 編成特技
  OwnershipAbility = '2', // 所持特技
  CounterAbility = '3', // 大破特技
  SpecialAttack = '4', // 特殊攻撃
  StrategicSkill = '5', // 計略
}

export interface BaseDoc {
  [id: string]: any;
}

export interface NameWithOrder {
  name: string;
  order: number;
}
export interface NameWithOrderDoc extends BaseDoc {
  [id: string]: NameWithOrder;
}

export interface NameWithId {
  name: string;
  id: string;
}
export interface NameWithIds {
  name: string;
  ids: string[];
}
export interface NameWithIdsDoc extends BaseDoc {
  [id: string]: NameWithIds;
}

export interface Character {
  order: number;
  type: CharacterType;
  name: string;
  rarerity?: number;
  weaponType?: WeaponType;
  cost?: number;
  geographType?: GeographType[];
  region?: Region;
  abilityIds?: string[];
  abilityIds_kai?: string[];
  imageWeapons?: NameWithId[];
  imageFacilities?: NameWithId[];
  voiceActor?: string;
  illustrator?: string;
  tags?: NameWithId[];
}
export interface CharacterDoc extends BaseDoc {
  [id: string]: Character;
}

export interface OshiroPlaySt {
  characterIds?: string[];
  weaponIds?: string[];
  facilityIds?: string[];
}
export interface UserSetting {
  hideSideMenu: boolean;
}

export interface User {
  name: string;
  oshiro: OshiroPlaySt;
  setting: UserSetting;
}
export interface UserDoc extends BaseDoc {
  [id: string]: User;
}
