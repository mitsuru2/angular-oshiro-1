export const enum CharacterType {
  ShiroMusume = 0, // 城娘
  ShiroMusumeCollabo, // 城娘(コラボ)
  KabutoMusume, // 兜娘
  CollaboUnit, // コラボユニット
  Tono, // 殿
  JinMusume, // 神娘
  EventItem, // イベントアイテム
}

export const enum GeographType {
  Plain = 0, // 平
  Hill, // 平山
  Mountain, // 山
  Seaside, // 水
  Nothing, // 無
}

export const enum WeaponType {
  Sword = 0, // 刀
  Spear, // 槍
  Hammer, // 槌
  Shield, // 盾
  Fist, // 拳
  Scythe, // 鎌
  Club, // 戦棍
  DualSword, // 双剣
  Bow, // 弓
  CrossBow, // 石弓
  Gun, // 鉄砲
  Cannon, // 大砲
  Kabu, // 歌舞
  Amulet, // 札
  Bell, // 鈴
  Wand, // 杖
  Haraegushi, // 祓串
  Book, // 本
  ThrowKnife, //投剣
  Whip, //鞭
  TrumpetShell, // 陣貝
}

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

export interface IdAndLabel {
  id: string;
  label: string;
}

export interface Character {
  type: CharacterType;
  name: string;
  rarerity?: number;
  weaponType?: WeaponType;
  cost?: number;
  geographType?: GeographType;
  region?: Region;
  abilities: IdAndLabel[];
  abilities_kai: IdAndLabel[];
  imageWeapons: IdAndLabel[];
  imageFacilities: IdAndLabel[];
  voiceActor: string;
  illustrator: string;
  tags?: IdAndLabel[];
  isOwn: boolean;
}

export interface Tag {
  label: string;
  characterIds: string[];
}
