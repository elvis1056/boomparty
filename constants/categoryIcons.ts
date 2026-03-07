import type { LucideIcon } from 'lucide-react';
import {
  Baby,
  BookOpen,
  Briefcase,
  Building2,
  Cake,
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
  Zap,
} from 'lucide-react';

/**
 * 分類 ID → Lucide icon 對照表
 * 涵蓋所有頂層分類與子分類
 */
export const CATEGORY_ICONS: Record<number, LucideIcon> = {
  // ── 頂層分類 ──────────────────────────────────────
  1: Sparkles, // 主題佈置
  2: Wand2, // 造型氣球
  3: PartyPopper, // 節慶佈置
  4: Cake, // 依年齡佈置
  5: Heart, // 婚禮求婚
  6: Building2, // 企業商用
  7: Package, // 基礎耗材
  55: Feather, // 空飄系列

  // ── 主題佈置子分類 ────────────────────────────────
  8: GraduationCap, // 畢業佈置
  9: Cake, // 生日佈置
  10: Store, // 開幕佈置
  11: Music, // 展演佈置
  12: Frame, // 背板佈置
  13: TreePine, // 森林系佈置
  14: Waves, // 海洋系佈置
  15: Wand2, // 童話系佈置
  16: Flower2, // 甜美系佈置
  17: Sparkles, // 夢幻系佈置
  18: MoreHorizontal, // 其他佈置

  // ── 造型氣球子分類 ────────────────────────────────
  19: Smile, // 動物造型
  20: Crown, // 公主系列
  21: Star, // 手拿棒系列
  22: Sword, // 武器系列
  23: Gem, // 配件系列
  24: Laugh, // 卡通造型
  25: Circle, // 四泡結手環系列
  26: Shapes, // 編織系列
  27: MoreHorizontal, // 其他系列
  54: Flower2, // 花朵系列

  // ── 節慶佈置子分類 ────────────────────────────────
  28: TreePine, // 聖誕節佈置
  29: Ghost, // 萬聖節佈置
  30: Sparkles, // 新年佈置
  31: Heart, // 情人節佈置
  32: Flower2, // 母親節佈置
  33: Briefcase, // 父親節佈置
  34: MoreHorizontal, // 其他節慶佈置

  // ── 依年齡佈置子分類 ──────────────────────────────
  35: Baby, // 0 歲佈置
  36: Cake, // 1 歲佈置
  37: Star, // 2~6 歲佈置
  38: BookOpen, // 7~12 歲佈置
  39: Headphones, // 13~18 歲佈置
  40: Wine, // 19+ 歲佈置

  // ── 婚禮求婚子分類 ────────────────────────────────
  41: Heart, // 婚禮佈置
  42: Gem, // 求婚佈置
  43: Type, // 客製化文字球
  44: MoreHorizontal, // 其他婚禮求婚佈置

  // ── 企業商用子分類 ────────────────────────────────
  45: Zap, // 爆破氣球佈置
  46: Columns2, // 氣球柱
  47: Grid3X3, // 氣球牆
  48: MoreHorizontal, // 其他企業商用佈置
  60: Tent, // 氣球拱門

  // ── 基礎耗材子分類 ────────────────────────────────
  49: Star, // 鋁箔氣球
  50: Circle, // 長條乳膠氣球
  51: Circle, // 圓型乳膠氣球
  52: Gauge, // 打氣筒
  53: MoreHorizontal, // 其他基礎耗材

  // ── 空飄系列子分類 ────────────────────────────────
  56: Circle, // 乳膠氣球
  57: Star, // 鋁箔氣球
  58: CircleDot, // 泡泡球
  59: Shapes, // 特殊造型鋁箔
};
