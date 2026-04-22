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
 * 分類名稱 → Lucide icon 對照表
 * key 為資料庫 category.name 的完整字串
 * 最後更新：2026-04-23（對齊 dev-seed.sql 分類名稱）
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  // ── 頂層分類 ──────────────────────────────────────────
  佈置類: Sparkles,
  佈置單品類: Package,
  空飄充氣: Feather,
  鋁箔素材: Star,
  乳膠氣球素材: Circle,
  造型氣球: Wand2,
  工具配件: Wrench,
  折氣球表演: Music,
  氣球教學: BookOpen,
  客製印刷: Printer,

  // ── 佈置類子分類（parent: 佈置類）────────────────────
  生日佈置: Cake,
  求婚佈置: Gem,
  婚禮佈置: Heart,
  彌月抓周: Baby,
  後車廂佈置: Car,
  性別揭曉派對: Baby,
  畢業佈置: GraduationCap,
  開幕佈置: Store,
  尾牙春酒: Wine,
  聖誕節佈置: TreePine,
  萬聖節佈置: Ghost,
  情人節佈置: Heart,
  新年佈置: Sparkles,
  母親節佈置: Flower2,
  父親節佈置: Briefcase,
  展演佈置: Music,
  背板佈置: Frame,
  森林系佈置: TreePine,
  海洋系佈置: Waves,
  童話系佈置: Wand2,
  甜美系佈置: Flower2,
  夢幻系佈置: Sparkles,
  '1 歲佈置': Cake,
  '2~6 歲佈置': Star,
  '7~12 歲佈置': BookOpen,
  青少年佈置: Headphones,
  成人佈置: Wine,
  客製化文字球: Type,
  爆破氣球佈置: Zap,
  其他佈置: MoreHorizontal,

  // ── 佈置單品類子分類 ──────────────────────────────────
  氣球拱門: Tent,
  氣球柱: Columns2,
  氣球牆: Grid3X3,
  外送費: Package,

  // ── 空飄充氣子分類 ────────────────────────────────────
  乳膠充氣: Circle,
  鋁箔氣球充氣: Star,
  空飄套組: CircleDot,
  主題套組: Shapes,

  // ── 鋁箔素材子分類 ────────────────────────────────────
  鋁箔氣球: Star,
  數字字母: Type,
  泡泡氣球: CircleDot,

  // ── 乳膠氣球素材子分類 ────────────────────────────────
  圓型: Circle,
  心型: Heart,
  長條160: Feather,
  長條260: Circle,
  長條350: Feather,
  特殊形狀: Shapes,

  // ── 造型氣球子分類 ────────────────────────────────────
  動物造型: Smile,
  花朵系列: Flower2,
  公主系列: Crown,
  手拿棒系列: Star,
  武器系列: Sword,
  配件系列: Gem,
  卡通造型: Laugh,
  手環系列: Circle,
  編織系列: Shapes,
  其他系列: MoreHorizontal,

  // ── 工具配件子分類 ────────────────────────────────────
  手動打氣筒: Gauge,
  電動充氣機: Zap,
  配件耗材: MoreHorizontal,
  氦氣罐出租: Feather,

  // ── 折氣球表演子分類 ──────────────────────────────────
  現場折氣球: Smile,
  氣球達人: Crown,
  氣球表演秀: PartyPopper,

  // ── 氣球教學子分類 ────────────────────────────────────
  折氣球入門: BookOpen,
  佈置工作坊: GraduationCap,

  // ── 客製印刷子分類 ────────────────────────────────────
  氣球印刷: Type,
  廣告氣球: Building2,
};
