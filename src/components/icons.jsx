/**
 * Soft UI Kit icons — Phosphor with light strokes for glass UI.
 * Stable names match prior Lucide call sites; swap implementations here only.
 */
import {
  Airplane,
  ArrowDownLeft as PhArrowDownLeft,
  ArrowRight as PhArrowRight,
  ArrowUpRight as PhArrowUpRight,
  ArrowsClockwise,
  Bell as PhBell,
  BookOpen as PhBookOpen,
  Briefcase as PhBriefcase,
  CalendarBlank,
  CaretDown,
  ChartBar,
  Check as PhCheck,
  CheckCircle,
  Clock as PhClock,
  CopySimple as PhCopySimple,
  CreditCard as PhCreditCard,
  Cube,
  DotsSixVertical,
  Eye as PhEye,
  EyeSlash,
  Flag as PhFlag,
  Folder as PhFolder,
  Gear,
  HardDrives,
  House,
  Info as PhInfo,
  Layout,
  MagicWand,
  MagnifyingGlass,
  MapPin as PhMapPin,
  Palette as PhPalette,
  PiggyBank as PhPiggyBank,
  Plus as PhPlus,
  Pulse,
  Question,
  Sidebar,
  SidebarSimple,
  SlidersHorizontal as PhSlidersHorizontal,
  Sparkle,
  SquaresFour,
  Storefront,
  Timer as PhTimer,
  TrendUp,
  User as PhUser,
  Users as PhUsers,
  Wallet as PhWallet,
  X as PhX,
} from "@phosphor-icons/react";

function withKitDefaults(Icon, defaultWeight = "light") {
  function KitIcon({
    size = 18,
    weight,
    color = "currentColor",
    strokeWidth: _strokeWidth,
    ...props
  }) {
    return (
      <Icon
        size={size}
        weight={weight ?? defaultWeight}
        color={color}
        {...props}
      />
    );
  }
  KitIcon.displayName = Icon.displayName || Icon.name || "KitIcon";
  return KitIcon;
}

// Kit aliases (Lucide-compatible names)
export const Activity = withKitDefaults(Pulse);
export const ArrowDownLeft = withKitDefaults(PhArrowDownLeft);
export const ArrowRight = withKitDefaults(PhArrowRight);
export const ArrowUpRight = withKitDefaults(PhArrowUpRight);
export const BarChart3 = withKitDefaults(ChartBar);
export const Bell = withKitDefaults(PhBell);
export const BookOpen = withKitDefaults(PhBookOpen);
export const Boxes = withKitDefaults(Cube);
export const Briefcase = withKitDefaults(PhBriefcase);
export const CalendarDays = withKitDefaults(CalendarBlank);
export const Check = withKitDefaults(PhCheck);
export const CheckCircle2 = withKitDefaults(CheckCircle);
export const ChevronDown = withKitDefaults(CaretDown);
export const Clock3 = withKitDefaults(PhClock);
export const CopySimple = withKitDefaults(PhCopySimple);
export const CreditCard = withKitDefaults(PhCreditCard);
export const Eye = withKitDefaults(PhEye);
export const EyeOff = withKitDefaults(EyeSlash);
export const Flag = withKitDefaults(PhFlag);
export const Folder = withKitDefaults(PhFolder);
export const GripVertical = withKitDefaults(DotsSixVertical);
export const HelpCircle = withKitDefaults(Question);
export const Home = withKitDefaults(House);
export const Info = withKitDefaults(PhInfo);
export const LayoutDashboard = withKitDefaults(Layout);
export const LayoutGrid = withKitDefaults(SquaresFour);
export const MapPin = withKitDefaults(PhMapPin);
export const Palette = withKitDefaults(PhPalette);
export const PanelLeft = withKitDefaults(Sidebar);
export const PanelLeftClose = withKitDefaults(SidebarSimple);
export const PiggyBank = withKitDefaults(PhPiggyBank);
export const Plane = withKitDefaults(Airplane);
export const Plus = withKitDefaults(PhPlus);
export const RefreshCw = withKitDefaults(ArrowsClockwise);
export const Search = withKitDefaults(MagnifyingGlass);
export const Server = withKitDefaults(HardDrives);
export const Settings = withKitDefaults(Gear);
export const SlidersHorizontal = withKitDefaults(PhSlidersHorizontal);
/** Brand mark — duotone for glass rings / hero accents */
export const Sparkles = withKitDefaults(Sparkle, "duotone");
export const Store = withKitDefaults(Storefront);
export const Timer = withKitDefaults(PhTimer);
export const TrendingUp = withKitDefaults(TrendUp);
export const User = withKitDefaults(PhUser);
export const Users = withKitDefaults(PhUsers);
export const Wallet = withKitDefaults(PhWallet);
export const Wand2 = withKitDefaults(MagicWand);
export const X = withKitDefaults(PhX);
