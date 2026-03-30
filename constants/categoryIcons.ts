import type { LucideIcon } from 'lucide-react';
import {
  Baby,
  BookOpen,
  Briefcase,
  Building2,
  Cake,
  Car,
  Circle,
  CircleDot,
  Columns2,
  Crown,
  Feather,
  Flower2,
  Frame,
  Gauge,
  Gem,
  Ghost,
  GraduationCap,
  Grid3X3,
  Headphones,
  Heart,
  Laugh,
  MoreHorizontal,
  Music,
  Package,
  PartyPopper,
  Printer,
  Shapes,
  Smile,
  Sparkles,
  Star,
  Store,
  Sword,
  Tent,
  TreePine,
  Type,
  Wand2,
  Waves,
  Wine,
  Wrench,
  Zap,
} from 'lucide-react';

/**
 * 分類 ID → Lucide icon 對照表
 * 涵蓋所有頂層分類與子分類
 * 最後更新：2026-03-28（對齊新 10 頂層結構）
 */
export const CATEGORY_ICONS: Record<number, LucideIcon> = {
  // ── 頂層分類（SEO 排序）─────────────────────────────
  78: Sparkles, // 佈置類
  79: Package, // 佈置單品類
  55: Feather, // 空飄充氣 / 套組類
  62: Star, // 鋁箔 / 造型氣球素材
  7: Circle, // 乳膠氣球素材
  2: Wand2, // 造型氣球
  65: Wrench, // 工具 / 配件類
  68: Music, // 折氣球表演
  72: BookOpen, // 氣球教學
  75: Printer, // 客製 / 廣告印刷

  // ── 佈置類子分類（parent_id = 78）────────────────────
  9: Cake, // 生日佈置
  42: Gem, // 求婚佈置
  41: Heart, // 婚禮佈置
  35: Baby, // 彌月 / 抓周佈置
  81: Car, // 後車廂驚喜佈置
  82: Baby, // 性別揭曉派對
  8: GraduationCap, // 畢業佈置
  10: Store, // 開幕佈置
  83: Wine, // 尾牙 / 春酒佈置
  28: TreePine, // 聖誕節佈置
  29: Ghost, // 萬聖節佈置
  31: Heart, // 情人節佈置
  30: Sparkles, // 新年佈置
  32: Flower2, // 母親節佈置
  33: Briefcase, // 父親節佈置
  11: Music, // 展演佈置
  12: Frame, // 背板佈置
  13: TreePine, // 森林系佈置
  14: Waves, // 海洋系佈置
  15: Wand2, // 童話系佈置
  16: Flower2, // 甜美系佈置
  17: Sparkles, // 夢幻系佈置
  36: Cake, // 1 歲佈置
  37: Star, // 2~6 歲佈置
  38: BookOpen, // 7~12 歲佈置
  39: Headphones, // 13~18 歲佈置
  40: Wine, // 19+ 歲佈置
  43: Type, // 客製化文字球
  45: Zap, // 爆破氣球佈置
  18: MoreHorizontal, // 其他佈置

  // ── 佈置單品類子分類（parent_id = 79）───────────────
  60: Tent, // 氣球拱門
  46: Columns2, // 氣球柱（單支）
  47: Grid3X3, // 氣球牆 / 氣球背板
  80: Package, // 外送費

  // ── 空飄充氣 / 套組類子分類（parent_id = 55）────────
  56: Circle, // 乳膠氣球充氣（代客充氣）
  57: Star, // 鋁箔氣球充氣
  58: CircleDot, // 空飄氣球套組（一般組合）
  59: Shapes, // 求婚 / 生日主題套組

  // ── 鋁箔 / 造型氣球素材子分類（parent_id = 62）──────
  49: Star, // 一般造型鋁箔氣球
  63: Type, // 數字 / 字母鋁箔氣球
  64: CircleDot, // 水晶 / 泡泡氣球（Bobo Ball）

  // ── 乳膠氣球素材子分類（parent_id = 7）──────────────
  51: Circle, // 圓型
  84: Heart, // 心型
  85: Feather, // 長條160
  50: Circle, // 長條260
  86: Feather, // 長條350
  61: Shapes, // 特殊形狀

  // ── 造型氣球子分類（parent_id = 2）──────────────────
  19: Smile, // 動物造型
  54: Flower2, // 花朵系列
  20: Crown, // 公主系列
  21: Star, // 手拿棒系列
  22: Sword, // 武器系列
  23: Gem, // 配件系列
  24: Laugh, // 卡通造型
  25: Circle, // 四泡結手環系列
  26: Shapes, // 編織系列
  27: MoreHorizontal, // 其他系列

  // ── 工具 / 配件類子分類（parent_id = 65）────────────
  52: Gauge, // 手動打氣筒
  66: Zap, // 電動充氣機
  53: MoreHorizontal, // 氣球棒 / 底座 / 緞帶
  67: Feather, // 氦氣罐出租（小型罐）

  // ── 折氣球表演子分類（parent_id = 68）───────────────
  69: Smile, // 一般現場折氣球（小型）
  70: Crown, // 全職氣球達人（企業 / 婚禮）
  71: PartyPopper, // 氣球表演秀（含互動 / 舞台）

  // ── 氣球教學子分類（parent_id = 72）─────────────────
  73: BookOpen, // 折氣球入門課程
  74: GraduationCap, // 氣球佈置教學（工作坊）

  // ── 客製 / 廣告印刷子分類（parent_id = 75）──────────
  76: Type, // 乳膠氣球 Logo 印刷
  77: Building2, // 大型廣告氣球 / 吉祥造型
};
