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
  Gate = 0, // 門
  Moat, // 堀
  Wall, // 石垣
  Loophole, // 狭間
  WaterSource, // 水源
  Shachihoko, // 鯱
  Shrine, // 祠
  Tower, // 櫓, 塔
  Armor, // 鎧兜
  TeaRoom, // 茶室
  Garden, // 庭園
  Others, // その他
}

export const enum Region {
  Hokkaido = 0, // 北海道
  Tohoku, // 東北
  Kanto, // 関東
  Koshinetsu, // 甲信越
  Hokuriku, // 北陸
  Tokai, // 東海
  Kinki, // 近畿
  Chugoku, // 中国
  Shikoku, // 四国
  Kyushu, // 九州
  Okinawa, // 沖縄
  Oversea, // 海外
  Others, // その他
  AnotherWorld, //異界
}

export const enum AbilityType {
  Ability = 0, // 特技
  GroupAbility, // 編成特技
  OwnershipAbility, // 所持特技
  CounterAbility, // 大破特技
  SpecialAttack, // 特殊攻撃
  StrategicSkill, // 計略
}

export interface NameAndDispOrder {
  name: string;
  order: number;
}

export interface NameAndDispOrderDoc {
  [id: string]: NameAndDispOrder;
}

export interface IdAndLabel {
  id: string;
  label: string;
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
  imageWeapons?: IdAndLabel[];
  imageFacilities?: IdAndLabel[];
  voiceActor?: string;
  illustrator?: string;
  tags?: IdAndLabel[];
}

export interface CharacterDoc {
  [id: string]: Character;
}

export interface TagDoc {
  [id: string]: {
    label: string;
    ids: string[];
  };
}