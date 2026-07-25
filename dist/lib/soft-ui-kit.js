import clsx from "clsx";
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Airplane, ArrowDownLeft, ArrowRight, ArrowUpRight, ArrowsClockwise, Bell, BookOpen, Briefcase, CalendarBlank, CaretDown, ChartBar, Check, CheckCircle, Clock, CopySimple, CreditCard, Cube, DotsSixVertical, Eye, EyeSlash, Flag, Folder, Gear, HardDrives, House, Info, Layout, MagicWand, MagnifyingGlass, MapPin, Palette, PiggyBank, Plus, Pulse, Question, Sidebar, SidebarSimple, SlidersHorizontal, Sparkle, SquaresFour, Storefront, Timer, TrendUp, User, Users, Wallet, X } from "@phosphor-icons/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/lib/cn.js
/** Merge class names — drop-in companion to Soft UI Kit components. */
function cn(...inputs) {
	return clsx(inputs);
}
//#endregion
//#region src/components/icons.jsx
/**
* Soft UI Kit icons — Phosphor with light strokes for glass UI.
* Stable names match prior Lucide call sites; swap implementations here only.
*/
var icons_exports = /* @__PURE__ */ __exportAll({
	Activity: () => Activity,
	ArrowDownLeft: () => ArrowDownLeft$1,
	ArrowRight: () => ArrowRight$1,
	ArrowUpRight: () => ArrowUpRight$1,
	BarChart3: () => BarChart3,
	Bell: () => Bell$1,
	BookOpen: () => BookOpen$1,
	Boxes: () => Boxes,
	Briefcase: () => Briefcase$1,
	CalendarDays: () => CalendarDays,
	Check: () => Check$1,
	CheckCircle2: () => CheckCircle2,
	ChevronDown: () => ChevronDown,
	Clock3: () => Clock3,
	CopySimple: () => CopySimple$1,
	CreditCard: () => CreditCard$1,
	Eye: () => Eye$1,
	EyeOff: () => EyeOff,
	Flag: () => Flag$1,
	Folder: () => Folder$1,
	GripVertical: () => GripVertical,
	HelpCircle: () => HelpCircle,
	Home: () => Home,
	Info: () => Info$1,
	LayoutDashboard: () => LayoutDashboard,
	LayoutGrid: () => LayoutGrid,
	MapPin: () => MapPin$1,
	Palette: () => Palette$1,
	PanelLeft: () => PanelLeft,
	PanelLeftClose: () => PanelLeftClose,
	PiggyBank: () => PiggyBank$1,
	Plane: () => Plane,
	Plus: () => Plus$1,
	RefreshCw: () => RefreshCw,
	Search: () => Search,
	Server: () => Server,
	Settings: () => Settings,
	SlidersHorizontal: () => SlidersHorizontal$1,
	Sparkles: () => Sparkles,
	Store: () => Store,
	Timer: () => Timer$1,
	TrendingUp: () => TrendingUp,
	User: () => User$1,
	Users: () => Users$1,
	Wallet: () => Wallet$1,
	Wand2: () => Wand2,
	X: () => X$1
});
function withKitDefaults(Icon, defaultWeight = "light") {
	function KitIcon({ size = 18, weight, color = "currentColor", strokeWidth: _strokeWidth, ...props }) {
		return /* @__PURE__ */ jsx(Icon, {
			size,
			weight: weight ?? defaultWeight,
			color,
			...props
		});
	}
	KitIcon.displayName = Icon.displayName || Icon.name || "KitIcon";
	return KitIcon;
}
var Activity = withKitDefaults(Pulse);
var ArrowDownLeft$1 = withKitDefaults(ArrowDownLeft);
var ArrowRight$1 = withKitDefaults(ArrowRight);
var ArrowUpRight$1 = withKitDefaults(ArrowUpRight);
var BarChart3 = withKitDefaults(ChartBar);
var Bell$1 = withKitDefaults(Bell);
var BookOpen$1 = withKitDefaults(BookOpen);
var Boxes = withKitDefaults(Cube);
var Briefcase$1 = withKitDefaults(Briefcase);
var CalendarDays = withKitDefaults(CalendarBlank);
var Check$1 = withKitDefaults(Check);
var CheckCircle2 = withKitDefaults(CheckCircle);
var ChevronDown = withKitDefaults(CaretDown);
var Clock3 = withKitDefaults(Clock);
var CopySimple$1 = withKitDefaults(CopySimple);
var CreditCard$1 = withKitDefaults(CreditCard);
var Eye$1 = withKitDefaults(Eye);
var EyeOff = withKitDefaults(EyeSlash);
var Flag$1 = withKitDefaults(Flag);
var Folder$1 = withKitDefaults(Folder);
var GripVertical = withKitDefaults(DotsSixVertical);
var HelpCircle = withKitDefaults(Question);
var Home = withKitDefaults(House);
var Info$1 = withKitDefaults(Info);
var LayoutDashboard = withKitDefaults(Layout);
var LayoutGrid = withKitDefaults(SquaresFour);
var MapPin$1 = withKitDefaults(MapPin);
var Palette$1 = withKitDefaults(Palette);
var PanelLeft = withKitDefaults(Sidebar);
var PanelLeftClose = withKitDefaults(SidebarSimple);
var PiggyBank$1 = withKitDefaults(PiggyBank);
var Plane = withKitDefaults(Airplane);
var Plus$1 = withKitDefaults(Plus);
var RefreshCw = withKitDefaults(ArrowsClockwise);
var Search = withKitDefaults(MagnifyingGlass);
var Server = withKitDefaults(HardDrives);
var Settings = withKitDefaults(Gear);
var SlidersHorizontal$1 = withKitDefaults(SlidersHorizontal);
/** Brand mark — duotone for glass rings / hero accents */
var Sparkles = withKitDefaults(Sparkle, "duotone");
var Store = withKitDefaults(Storefront);
var Timer$1 = withKitDefaults(Timer);
var TrendingUp = withKitDefaults(TrendUp);
var User$1 = withKitDefaults(User);
var Users$1 = withKitDefaults(Users);
var Wallet$1 = withKitDefaults(Wallet);
var Wand2 = withKitDefaults(MagicWand);
var X$1 = withKitDefaults(X);
//#endregion
//#region src/components/ui/index.jsx
function useEscapeClose(open, onClose) {
	useEffect(() => {
		if (!open) return void 0;
		const onKey = (e) => {
			if (e.key === "Escape") onClose?.();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
}
function useBodyScrollLock(locked) {
	useEffect(() => {
		if (!locked) return void 0;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [locked]);
}
function useAnchorCoords(open, anchorRef) {
	const [coords, setCoords] = useState(null);
	useEffect(() => {
		if (!open || !anchorRef.current) {
			setCoords(null);
			return;
		}
		function measure() {
			const r = anchorRef.current.getBoundingClientRect();
			const left = Math.min(r.left, window.innerWidth - 200 - 12);
			const top = Math.min(r.bottom + 8, window.innerHeight - 12);
			setCoords({
				top,
				left,
				width: Math.max(r.width, 180)
			});
		}
		measure();
		window.addEventListener("resize", measure);
		window.addEventListener("scroll", measure, true);
		return () => {
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", measure, true);
		};
	}, [open, anchorRef]);
	return coords;
}
function Button({ children, className, variant = "primary", size = "md", leftIcon, rightIcon, ...props }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: clsx("ui-btn", `ui-btn--${variant}`, `ui-btn--${size}`, className),
		...props,
		children: [
			leftIcon ? /* @__PURE__ */ jsx("span", {
				className: "ui-btn__icon",
				children: leftIcon
			}) : null,
			/* @__PURE__ */ jsx("span", { children }),
			rightIcon ? /* @__PURE__ */ jsx("span", {
				className: "ui-btn__icon",
				children: rightIcon
			}) : null
		]
	});
}
function IconButton({ children, className, label, variant = "ghost", ...props }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		"aria-label": label,
		className: clsx("ui-icon-btn", `ui-icon-btn--${variant}`, className),
		...props,
		children
	});
}
function Input({ className, label, hint, error, id, ...props }) {
	const inputId = id || props.name;
	return /* @__PURE__ */ jsxs("label", {
		className: clsx("ui-field", error && "has-error", className),
		htmlFor: inputId,
		children: [
			label ? /* @__PURE__ */ jsx("span", {
				className: "ui-label",
				children: label
			}) : null,
			/* @__PURE__ */ jsx("input", {
				id: inputId,
				className: "ui-input",
				...props
			}),
			error ? /* @__PURE__ */ jsx("span", {
				className: "ui-hint ui-hint--error",
				children: error
			}) : null,
			!error && hint ? /* @__PURE__ */ jsx("span", {
				className: "ui-hint",
				children: hint
			}) : null
		]
	});
}
function FormField({ label, hint, error, htmlFor, children, className, id }) {
	return /* @__PURE__ */ jsxs("div", {
		id,
		className: clsx("ui-field", error && "has-error", className),
		children: [
			label ? /* @__PURE__ */ jsx("label", {
				className: "ui-label",
				htmlFor,
				children: label
			}) : null,
			children,
			error ? /* @__PURE__ */ jsx("span", {
				className: "ui-hint ui-hint--error",
				children: error
			}) : null,
			!error && hint ? /* @__PURE__ */ jsx("span", {
				className: "ui-hint",
				children: hint
			}) : null
		]
	});
}
function InputGroup({ children, className, prepend, append }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-input-group", className),
		children: [
			prepend ? /* @__PURE__ */ jsx("span", {
				className: "ui-input-group__affix",
				children: prepend
			}) : null,
			children,
			append ? /* @__PURE__ */ jsx("span", {
				className: "ui-input-group__affix",
				children: append
			}) : null
		]
	});
}
function PasswordInput({ label, hint, error, id, className, ...props }) {
	const [visible, setVisible] = useState(false);
	const inputId = id || props.name || "password";
	return /* @__PURE__ */ jsx(FormField, {
		label,
		hint,
		error,
		htmlFor: inputId,
		className,
		children: /* @__PURE__ */ jsx(InputGroup, {
			append: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "ui-input-group__btn",
				"aria-label": visible ? "Hide password" : "Show password",
				onClick: () => setVisible((v) => !v),
				children: visible ? /* @__PURE__ */ jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsx(Eye$1, { size: 16 })
			}),
			children: /* @__PURE__ */ jsx("input", {
				id: inputId,
				className: "ui-input ui-input--bare",
				type: visible ? "text" : "password",
				...props
			})
		})
	});
}
function Textarea({ className, label, hint, id, ...props }) {
	const inputId = id || props.name;
	return /* @__PURE__ */ jsxs("label", {
		className: clsx("ui-field", className),
		htmlFor: inputId,
		children: [
			label ? /* @__PURE__ */ jsx("span", {
				className: "ui-label",
				children: label
			}) : null,
			/* @__PURE__ */ jsx("textarea", {
				id: inputId,
				className: "ui-input ui-textarea",
				...props
			}),
			hint ? /* @__PURE__ */ jsx("span", {
				className: "ui-hint",
				children: hint
			}) : null
		]
	});
}
function Select({ className, label, options = [], id, ...props }) {
	const inputId = id || props.name;
	return /* @__PURE__ */ jsxs("label", {
		className: clsx("ui-field", className),
		htmlFor: inputId,
		children: [label ? /* @__PURE__ */ jsx("span", {
			className: "ui-label",
			children: label
		}) : null, /* @__PURE__ */ jsx("select", {
			id: inputId,
			className: "ui-input ui-select",
			...props,
			children: options.map((opt) => /* @__PURE__ */ jsx("option", {
				value: opt.value,
				children: opt.label
			}, opt.value))
		})]
	});
}
function Checkbox({ label, className, ...props }) {
	return /* @__PURE__ */ jsxs("label", {
		className: clsx("ui-check", className),
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				...props
			}),
			/* @__PURE__ */ jsx("span", {
				className: "ui-check__box",
				"aria-hidden": "true"
			}),
			label ? /* @__PURE__ */ jsx("span", { children: label }) : null
		]
	});
}
function Radio({ label, className, ...props }) {
	return /* @__PURE__ */ jsxs("label", {
		className: clsx("ui-radio", className),
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "radio",
				...props
			}),
			/* @__PURE__ */ jsx("span", {
				className: "ui-radio__dot",
				"aria-hidden": "true"
			}),
			label ? /* @__PURE__ */ jsx("span", { children: label }) : null
		]
	});
}
function Switch({ checked, onCheckedChange, label, className, ...props }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		className: clsx("ui-switch", checked && "is-on", className),
		onClick: () => onCheckedChange?.(!checked),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "ui-switch__track",
			children: /* @__PURE__ */ jsx("span", { className: "ui-switch__thumb" })
		}), label ? /* @__PURE__ */ jsx("span", {
			className: "ui-switch__label",
			children: label
		}) : null]
	});
}
function Slider({ value, onChange, min = 0, max = 100, step, label, hint, className, ...props }) {
	return /* @__PURE__ */ jsxs("label", {
		className: clsx("ui-slider", className),
		children: [label ? /* @__PURE__ */ jsxs("span", {
			className: "ui-slider__head",
			children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
				className: "ui-label",
				children: label
			}), hint ? /* @__PURE__ */ jsx("span", {
				className: "ui-slider__hint",
				children: hint
			}) : null] }), /* @__PURE__ */ jsx("span", {
				className: "ui-slider__value",
				children: value
			})]
		}) : null, /* @__PURE__ */ jsx("input", {
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange?.(Number(e.target.value)),
			...props
		})]
	});
}
function Card({ children, className, title, description, action, padded = true, variant = "glass" }) {
	return /* @__PURE__ */ jsxs("section", {
		className: clsx("ui-card", variant === "glass" && "glass sheen", variant === "flat" && "ui-card--flat", variant === "soft" && "ui-card--soft", variant === "outline" && "ui-card--outline", padded && "ui-card--padded", className),
		children: [(title || action) && /* @__PURE__ */ jsxs("header", {
			className: "ui-card__head",
			children: [/* @__PURE__ */ jsxs("div", { children: [title ? /* @__PURE__ */ jsx("h3", {
				className: "ui-card__title",
				children: title
			}) : null, description ? /* @__PURE__ */ jsx("p", {
				className: "ui-card__desc",
				children: description
			}) : null] }), action]
		}), children]
	});
}
function Badge({ children, tone = "neutral", className }) {
	return /* @__PURE__ */ jsx("span", {
		className: clsx("ui-badge", `ui-badge--${tone}`, className),
		children
	});
}
function Avatar({ name, src, size = "md", className }) {
	const initials = name?.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
	return /* @__PURE__ */ jsx("span", {
		className: clsx("ui-avatar", `ui-avatar--${size}`, className),
		title: name,
		children: src ? /* @__PURE__ */ jsx("img", {
			src,
			alt: name
		}) : initials
	});
}
function Alert({ title, children, tone = "info", className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-alert", `ui-alert--${tone}`, className),
		role: "status",
		children: [title ? /* @__PURE__ */ jsx("strong", { children: title }) : null, children ? /* @__PURE__ */ jsx("p", { children }) : null]
	});
}
function Progress({ value = 0, className, label }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-progress", className),
		children: [label ? /* @__PURE__ */ jsxs("div", {
			className: "ui-progress__head",
			children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsxs("span", { children: [value, "%"] })]
		}) : null, /* @__PURE__ */ jsx("div", {
			className: "ui-progress__track",
			children: /* @__PURE__ */ jsx("div", {
				className: "ui-progress__bar",
				style: { width: `${Math.min(100, Math.max(0, value))}%` }
			})
		})]
	});
}
function Skeleton({ className, style }) {
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-skeleton", className),
		style,
		"aria-hidden": "true"
	});
}
function Separator({ className, label }) {
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-sep", className),
		role: "separator",
		children: label ? /* @__PURE__ */ jsx("span", { children: label }) : null
	});
}
function Tabs({ tabs, value, onChange, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-tabs", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "ui-tabs__list",
			role: "tablist",
			children: tabs.map((tab) => /* @__PURE__ */ jsx("button", {
				type: "button",
				role: "tab",
				"aria-selected": value === tab.id,
				className: clsx("ui-tabs__tab", value === tab.id && "is-active"),
				onClick: () => onChange?.(tab.id),
				children: tab.label
			}, tab.id))
		}), /* @__PURE__ */ jsx("div", {
			className: "ui-tabs__panel",
			children: tabs.find((t) => t.id === value)?.content
		})]
	});
}
function Accordion({ items, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-accordion", className),
		children: items.map((item) => /* @__PURE__ */ jsxs("details", {
			className: "ui-accordion__item",
			children: [/* @__PURE__ */ jsx("summary", { children: item.title }), /* @__PURE__ */ jsx("div", {
				className: "ui-accordion__body",
				children: item.content
			})]
		}, item.id))
	});
}
function Table({ columns, rows, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-table-wrap", className),
		children: /* @__PURE__ */ jsxs("table", {
			className: "ui-table",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((col) => /* @__PURE__ */ jsx("th", { children: col.label }, col.key)) }) }), /* @__PURE__ */ jsx("tbody", { children: rows.map((row) => /* @__PURE__ */ jsx("tr", { children: columns.map((col) => /* @__PURE__ */ jsx("td", { children: col.render ? col.render(row) : row[col.key] }, col.key)) }, row.id)) })]
		})
	});
}
function Breadcrumb({ items, className }) {
	return /* @__PURE__ */ jsx("nav", {
		className: clsx("ui-breadcrumb", className),
		"aria-label": "Breadcrumb",
		children: items.map((item, i) => /* @__PURE__ */ jsxs("span", {
			className: "ui-breadcrumb__item",
			children: [i > 0 ? /* @__PURE__ */ jsx("span", {
				className: "ui-breadcrumb__sep",
				children: "/"
			}) : null, item.href ? /* @__PURE__ */ jsx("a", {
				href: item.href,
				children: item.label
			}) : /* @__PURE__ */ jsx("span", { children: item.label })]
		}, item.label))
	});
}
function Pagination({ page, pages, onChange, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-pagination", className),
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				disabled: page <= 1,
				onClick: () => onChange?.(page - 1),
				children: "Prev"
			}),
			Array.from({ length: pages }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx("button", {
				type: "button",
				className: clsx(n === page && "is-active"),
				onClick: () => onChange?.(n),
				children: n
			}, n)),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				disabled: page >= pages,
				onClick: () => onChange?.(page + 1),
				children: "Next"
			})
		]
	});
}
function Dialog({ open, onClose, title, children, footer, description }) {
	useEscapeClose(open, onClose);
	useBodyScrollLock(open);
	if (!open) return null;
	return createPortal(/* @__PURE__ */ jsxs("div", {
		className: "ui-dialog-root",
		role: "presentation",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "ui-dialog__backdrop",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ jsxs("div", {
			className: "ui-dialog glass sheen",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "ui-dialog__head",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", { children: title }), description ? /* @__PURE__ */ jsx("p", {
						className: "ui-dialog__desc",
						children: description
					}) : null] }), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "ui-icon-btn ui-icon-btn--ghost",
						onClick: onClose,
						"aria-label": "Close",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "ui-dialog__body",
					children
				}),
				footer ? /* @__PURE__ */ jsx("footer", {
					className: "ui-dialog__foot",
					children: footer
				}) : null
			]
		})]
	}), document.body);
}
function AlertDialog({ open, onClose, title, description, confirmLabel = "Continue", cancelLabel = "Cancel", tone = "danger", onConfirm }) {
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onClose,
		title,
		description,
		footer: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button, {
			variant: "outline",
			onClick: onClose,
			children: cancelLabel
		}), /* @__PURE__ */ jsx(Button, {
			variant: tone === "danger" ? "danger" : "primary",
			onClick: () => {
				onConfirm?.();
				onClose?.();
			},
			children: confirmLabel
		})] })
	});
}
function Label({ children, className, htmlFor }) {
	return /* @__PURE__ */ jsx("label", {
		className: clsx("ui-label", className),
		htmlFor,
		children
	});
}
function Collapsible({ title, children, defaultOpen = false, className }) {
	return /* @__PURE__ */ jsxs("details", {
		className: clsx("ui-collapsible", className),
		open: defaultOpen || void 0,
		children: [/* @__PURE__ */ jsx("summary", { children: title }), /* @__PURE__ */ jsx("div", {
			className: "ui-collapsible__body",
			children
		})]
	});
}
function Command({ items = [], placeholder = "Type a command…", onSelect, className }) {
	const [q, setQ] = useState("");
	const filtered = items.filter((item) => item.label.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-command glass sheen", className),
		children: [/* @__PURE__ */ jsx("input", {
			className: "ui-command__input",
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder
		}), /* @__PURE__ */ jsx("div", {
			className: "ui-command__list",
			role: "listbox",
			children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "ui-command__empty",
				children: "No results"
			}) : filtered.map((item) => /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "ui-command__item",
				onClick: () => onSelect?.(item),
				children: [
					item.icon ? /* @__PURE__ */ jsx("span", { children: item.icon }) : null,
					/* @__PURE__ */ jsx("span", { children: item.label }),
					item.shortcut ? /* @__PURE__ */ jsx("kbd", {
						className: "ui-kbd",
						children: item.shortcut
					}) : null
				]
			}, item.id || item.label))
		})]
	});
}
function Kbd({ children, className }) {
	return /* @__PURE__ */ jsx("kbd", {
		className: clsx("ui-kbd", className),
		children
	});
}
function ScrollArea({ children, className, style }) {
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-scroll", className),
		style,
		children
	});
}
function AspectRatio({ ratio = 16 / 9, children, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-aspect", className),
		style: { paddingBottom: `${100 / ratio}%` },
		children: /* @__PURE__ */ jsx("div", {
			className: "ui-aspect__inner",
			children
		})
	});
}
function Tooltip({ content, children }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "ui-tooltip",
		children: [children, /* @__PURE__ */ jsx("span", {
			className: "ui-tooltip__bubble",
			role: "tooltip",
			children: content
		})]
	});
}
function EmptyState({ title, description, action, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-empty", className),
		children: [
			/* @__PURE__ */ jsx("h3", { children: title }),
			description ? /* @__PURE__ */ jsx("p", { children: description }) : null,
			action
		]
	});
}
function Toggle({ pressed, onPressedChange, children, className, ...props }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		"aria-pressed": pressed,
		className: clsx("ui-toggle", pressed && "is-on", className),
		onClick: () => onPressedChange?.(!pressed),
		...props,
		children
	});
}
function ToggleGroup({ value, onChange, options = [], className }) {
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-toggle-group", className),
		role: "group",
		children: options.map((opt) => /* @__PURE__ */ jsx("button", {
			type: "button",
			className: clsx("ui-toggle", value === opt.value && "is-on"),
			"aria-pressed": value === opt.value,
			onClick: () => onChange?.(opt.value),
			children: opt.label
		}, opt.value))
	});
}
function DropdownMenu({ trigger, items, className }) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const coords = useAnchorCoords(open, anchorRef);
	useEscapeClose(open, () => setOpen(false));
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-dropdown", className),
		ref: anchorRef,
		children: [/* @__PURE__ */ jsx("div", {
			onClick: () => setOpen((v) => !v),
			children: trigger
		}), open && coords ? createPortal(/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "ui-dropdown__scrim",
			"aria-label": "Close",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ jsx("div", {
			className: "ui-dropdown__menu glass sheen is-portaled",
			role: "menu",
			style: {
				top: coords.top,
				left: coords.left,
				minWidth: coords.width
			},
			children: items.map((item) => /* @__PURE__ */ jsx("button", {
				type: "button",
				role: "menuitem",
				className: "ui-dropdown__item",
				disabled: item.disabled,
				onClick: () => {
					item.onSelect?.();
					setOpen(false);
				},
				children: item.label
			}, item.id || item.label))
		})] }), document.body) : null]
	});
}
function Popover({ trigger, children, className }) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const coords = useAnchorCoords(open, anchorRef);
	useEscapeClose(open, () => setOpen(false));
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-popover", className),
		ref: anchorRef,
		children: [/* @__PURE__ */ jsx("div", {
			onClick: () => setOpen((v) => !v),
			children: trigger
		}), open && coords ? createPortal(/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "ui-dropdown__scrim",
			"aria-label": "Close",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ jsx("div", {
			className: "ui-popover__panel glass sheen is-portaled",
			style: {
				top: coords.top,
				left: coords.left,
				minWidth: Math.max(coords.width, 220)
			},
			children
		})] }), document.body) : null]
	});
}
function Sheet({ open, onClose, title, children, side = "right" }) {
	useEscapeClose(open, onClose);
	useBodyScrollLock(open);
	if (!open) return null;
	return createPortal(/* @__PURE__ */ jsxs("div", {
		className: "ui-sheet-root",
		role: "presentation",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "ui-sheet__backdrop",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ jsxs("aside", {
			className: clsx("ui-sheet glass sheen", `ui-sheet--${side}`),
			role: "dialog",
			"aria-modal": "true",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "ui-sheet__head",
				children: [/* @__PURE__ */ jsx("h3", { children: title }), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "ui-icon-btn ui-icon-btn--ghost",
					onClick: onClose,
					"aria-label": "Close",
					children: "✕"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "ui-sheet__body",
				children
			})]
		})]
	}), document.body);
}
function DateField({ label, className, ...props }) {
	return /* @__PURE__ */ jsx(Input, {
		className,
		label,
		type: "date",
		...props
	});
}
function OtpInput({ length = 6, value = "", onChange, className }) {
	const chars = Array.from({ length }, (_, i) => value[i] || "");
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-otp", className),
		children: chars.map((ch, i) => /* @__PURE__ */ jsx("input", {
			className: "ui-otp__cell",
			inputMode: "numeric",
			maxLength: 1,
			value: ch,
			"aria-label": `Digit ${i + 1}`,
			onChange: (e) => {
				const next = value.split("");
				next[i] = e.target.value.replace(/\D/g, "").slice(-1);
				onChange?.(next.join("").slice(0, length));
			}
		}, i))
	});
}
function Combobox({ label, options = [], value, onChange, placeholder = "Search…", className }) {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const coords = useAnchorCoords(open, anchorRef);
	const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
	const selected = options.find((o) => o.value === value);
	useEscapeClose(open, () => setOpen(false));
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-combobox ui-field", className),
		ref: anchorRef,
		children: [
			label ? /* @__PURE__ */ jsx("span", {
				className: "ui-label",
				children: label
			}) : null,
			/* @__PURE__ */ jsx("input", {
				className: "ui-input",
				value: open ? query : selected?.label || "",
				placeholder,
				onFocus: () => {
					setOpen(true);
					setQuery("");
				},
				onChange: (e) => {
					setQuery(e.target.value);
					setOpen(true);
				}
			}),
			open && coords ? createPortal(/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "ui-dropdown__scrim",
				"aria-label": "Close",
				onClick: () => setOpen(false)
			}), /* @__PURE__ */ jsx("div", {
				className: "ui-combobox__list glass sheen is-portaled",
				role: "listbox",
				style: {
					top: coords.top,
					left: coords.left,
					width: coords.width
				},
				children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", {
					className: "ui-combobox__empty",
					children: "No matches"
				}) : filtered.map((opt) => /* @__PURE__ */ jsx("button", {
					type: "button",
					role: "option",
					className: clsx("ui-combobox__option", value === opt.value && "is-active"),
					onClick: () => {
						onChange?.(opt.value);
						setOpen(false);
					},
					children: opt.label
				}, opt.value))
			})] }), document.body) : null
		]
	});
}
function Toast({ open, message, onClose }) {
	useEffect(() => {
		if (!open) return void 0;
		const t = window.setTimeout(() => onClose?.(), 2200);
		return () => window.clearTimeout(t);
	}, [open, onClose]);
	if (!open) return null;
	return createPortal(/* @__PURE__ */ jsx("div", {
		className: "ui-toast glass sheen",
		role: "status",
		children: message
	}), document.body);
}
function Calendar({ value, onChange, className }) {
	const base = value ? new Date(value) : /* @__PURE__ */ new Date();
	const year = base.getFullYear();
	const month = base.getMonth();
	const first = new Date(year, month, 1).getDay();
	const days = new Date(year, month + 1, 0).getDate();
	const cells = Array.from({ length: first + days }, (_, i) => {
		if (i < first) return null;
		return i - first + 1;
	});
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-calendar glass sheen", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "ui-calendar__head",
			children: base.toLocaleString("default", {
				month: "long",
				year: "numeric"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "ui-calendar__grid",
			children: [[
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			].map((d) => /* @__PURE__ */ jsx("span", {
				className: "ui-calendar__dow",
				children: d
			}, d)), cells.map((day, i) => day == null ? /* @__PURE__ */ jsx("span", {}, `e-${i}`) : /* @__PURE__ */ jsx("button", {
				type: "button",
				className: clsx("ui-calendar__day", value === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` && "is-active"),
				onClick: () => onChange?.(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`),
				children: day
			}, day))]
		})]
	});
}
function Carousel({ items = [], className }) {
	const [index, setIndex] = useState(0);
	const item = items[index];
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-carousel glass sheen", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "ui-carousel__frame",
			children: item
		}), /* @__PURE__ */ jsxs("div", {
			className: "ui-carousel__nav",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setIndex((i) => (i - 1 + items.length) % items.length),
					children: "Prev"
				}),
				/* @__PURE__ */ jsxs("span", { children: [
					index + 1,
					"/",
					items.length
				] }),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setIndex((i) => (i + 1) % items.length),
					children: "Next"
				})
			]
		})]
	});
}
function HoverCard({ trigger, children, className }) {
	return /* @__PURE__ */ jsxs("span", {
		className: clsx("ui-hovercard", className),
		children: [trigger, /* @__PURE__ */ jsx("span", {
			className: "ui-hovercard__panel glass sheen",
			children
		})]
	});
}
function ContextMenu({ children, items = [], className }) {
	const [pos, setPos] = useState(null);
	useEscapeClose(Boolean(pos), () => setPos(null));
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-context", className),
		onContextMenu: (e) => {
			e.preventDefault();
			const menuW = 200;
			const menuH = Math.min(280, (items.length || 1) * 42 + 16);
			const x = Math.min(e.clientX, window.innerWidth - menuW - 8);
			const y = Math.min(e.clientY, window.innerHeight - menuH - 8);
			setPos({
				x,
				y
			});
		},
		children: [children, pos ? createPortal(/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "ui-dropdown__scrim",
			"aria-label": "Close",
			onClick: () => setPos(null)
		}), /* @__PURE__ */ jsx("div", {
			className: "ui-context__menu glass sheen is-portaled",
			style: {
				left: pos.x,
				top: pos.y
			},
			role: "menu",
			children: items.map((item) => /* @__PURE__ */ jsx("button", {
				type: "button",
				role: "menuitem",
				className: "ui-dropdown__item",
				disabled: item.disabled,
				onClick: () => {
					item.onSelect?.();
					setPos(null);
				},
				children: item.label
			}, item.id || item.label))
		})] }), document.body) : null]
	});
}
function Menubar({ menus = [], className }) {
	const [open, setOpen] = useState(null);
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-menubar glass sheen", className),
		role: "menubar",
		children: menus.map((menu) => /* @__PURE__ */ jsxs("div", {
			className: "ui-menubar__item",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: clsx("ui-menubar__trigger", open === menu.label && "is-open"),
				onClick: () => setOpen((v) => v === menu.label ? null : menu.label),
				children: menu.label
			}), open === menu.label ? /* @__PURE__ */ jsx("div", {
				className: "ui-menubar__panel glass sheen",
				role: "menu",
				children: (menu.items || []).map((item) => /* @__PURE__ */ jsx("button", {
					type: "button",
					role: "menuitem",
					className: "ui-dropdown__item",
					onClick: () => {
						item.onSelect?.();
						setOpen(null);
					},
					children: item.label
				}, item.label))
			}) : null]
		}, menu.id || menu.label))
	});
}
function DataTable({ columns, rows, className, selectable = false, onSelectionChange }) {
	const [sort, setSort] = useState({
		key: null,
		dir: "asc"
	});
	const [selected, setSelected] = useState(() => /* @__PURE__ */ new Set());
	const sorted = useMemo(() => {
		if (!sort.key) return rows;
		const copy = [...rows];
		copy.sort((a, b) => {
			const av = a[sort.key];
			const bv = b[sort.key];
			if (av === bv) return 0;
			const cmp = av > bv ? 1 : -1;
			return sort.dir === "asc" ? cmp : -cmp;
		});
		return copy;
	}, [rows, sort]);
	function toggleSort(key) {
		setSort((prev) => prev.key === key ? {
			key,
			dir: prev.dir === "asc" ? "desc" : "asc"
		} : {
			key,
			dir: "asc"
		});
	}
	function toggleRow(id) {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			onSelectionChange?.([...next]);
			return next;
		});
	}
	function toggleAll() {
		setSelected((prev) => {
			const next = prev.size === rows.length ? /* @__PURE__ */ new Set() : new Set(rows.map((r) => r.id));
			onSelectionChange?.([...next]);
			return next;
		});
	}
	return /* @__PURE__ */ jsx("div", {
		className: clsx("ui-table-wrap", className),
		children: /* @__PURE__ */ jsxs("table", {
			className: "ui-table ui-data-table",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [selectable ? /* @__PURE__ */ jsx("th", {
				className: "ui-data-table__check",
				children: /* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: selected.size === rows.length && rows.length > 0,
					onChange: toggleAll,
					"aria-label": "Select all"
				})
			}) : null, columns.map((col) => /* @__PURE__ */ jsx("th", { children: col.sortable ? /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "ui-data-table__sort",
				onClick: () => toggleSort(col.key),
				children: [col.label, /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: sort.key === col.key ? sort.dir === "asc" ? " ↑" : " ↓" : " ↕"
				})]
			}) : col.label }, col.key))] }) }), /* @__PURE__ */ jsx("tbody", { children: sorted.map((row) => /* @__PURE__ */ jsxs("tr", {
				className: clsx(selected.has(row.id) && "is-selected"),
				children: [selectable ? /* @__PURE__ */ jsx("td", {
					className: "ui-data-table__check",
					children: /* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: selected.has(row.id),
						onChange: () => toggleRow(row.id),
						"aria-label": `Select ${row.id}`
					})
				}) : null, columns.map((col) => /* @__PURE__ */ jsx("td", { children: col.render ? col.render(row) : row[col.key] }, col.key))]
			}, row.id)) })]
		})
	});
}
function Resizable({ left, right, initial = 42, min = 22, max = 78, className }) {
	const [pct, setPct] = useState(initial);
	const dragging = useRef(false);
	const rootRef = useRef(null);
	useEffect(() => {
		function onMove(e) {
			if (!dragging.current || !rootRef.current) return;
			const rect = rootRef.current.getBoundingClientRect();
			const next = (e.clientX - rect.left) / rect.width * 100;
			setPct(Math.min(max, Math.max(min, next)));
		}
		function onUp() {
			dragging.current = false;
		}
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
	}, [min, max]);
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("ui-resizable", className),
		ref: rootRef,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "ui-resizable__pane",
				style: { width: `${pct}%` },
				children: left
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "ui-resizable__handle",
				"aria-label": "Resize panes",
				onPointerDown: () => {
					dragging.current = true;
				}
			}),
			/* @__PURE__ */ jsx("div", {
				className: "ui-resizable__pane",
				style: { width: `${100 - pct}%` },
				children: right
			})
		]
	});
}
var ToastCtx = createContext(null);
function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);
	const api = useMemo(() => ({ push: (message, tone = "default") => {
		const id = `${Date.now()}-${Math.random()}`;
		setToasts((prev) => [...prev, {
			id,
			message,
			tone
		}]);
		window.setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 2600);
	} }), []);
	return /* @__PURE__ */ jsxs(ToastCtx.Provider, {
		value: api,
		children: [children, createPortal(/* @__PURE__ */ jsx("div", {
			className: "ui-toast-stack",
			"aria-live": "polite",
			children: toasts.map((t) => /* @__PURE__ */ jsx("div", {
				className: clsx("ui-toast glass sheen", `ui-toast--${t.tone}`),
				children: t.message
			}, t.id))
		}), document.body)]
	});
}
function useToast() {
	const ctx = useContext(ToastCtx);
	if (!ctx) return { push: (message) => {
		console.warn("useToast requires ToastProvider", message);
	} };
	return ctx;
}
//#endregion
//#region src/components/ui/registry.js
/**
* Soft UI Kit — UI Kit catalog registry.
* Charts live on /charts · Effects live on /effects.
*/
var COMPONENT_CATEGORIES = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "layout",
		label: "Layout"
	},
	{
		id: "forms",
		label: "Forms"
	},
	{
		id: "data",
		label: "Data display"
	},
	{
		id: "feedback",
		label: "Feedback"
	},
	{
		id: "overlay",
		label: "Overlay"
	},
	{
		id: "navigation",
		label: "Navigation"
	}
];
var COMPONENT_REGISTRY = [
	{
		id: "button",
		name: "Button",
		category: "forms",
		span: "wide",
		description: "Primary actions with outline, soft, ghost, link, and danger variants.",
		tags: ["cta", "action"],
		variants: [
			"primary",
			"secondary",
			"outline",
			"soft",
			"ghost",
			"link",
			"danger"
		],
		sizes: [
			"sm",
			"md",
			"lg"
		],
		animated: true
	},
	{
		id: "icon-button",
		name: "Icon Button",
		category: "forms",
		span: "wide",
		description: "Compact icon-only control for toolbars.",
		tags: ["toolbar"],
		variants: [
			"ghost",
			"glass",
			"outline"
		],
		animated: true
	},
	{
		id: "input",
		name: "Input",
		category: "forms",
		description: "Text field with label, hint, and error states.",
		tags: ["form", "text"],
		animated: false
	},
	{
		id: "form-field",
		name: "Form Field",
		category: "forms",
		description: "Composable label + control + hint/error wrapper.",
		tags: [
			"form",
			"compose",
			"label"
		],
		animated: false
	},
	{
		id: "input-group",
		name: "Input Group",
		category: "forms",
		description: "Prefixed/suffixed inputs for currency, domains, search.",
		tags: ["form", "crm"],
		animated: false
	},
	{
		id: "password-input",
		name: "Password Input",
		category: "forms",
		description: "Password field with show/hide toggle.",
		tags: ["form", "auth"],
		animated: true
	},
	{
		id: "textarea",
		name: "Textarea",
		category: "forms",
		description: "Multi-line text entry.",
		tags: ["form"],
		animated: false
	},
	{
		id: "select",
		name: "Select",
		category: "forms",
		description: "Native select styled to the glass system.",
		tags: ["form"],
		animated: false
	},
	{
		id: "checkbox",
		name: "Checkbox",
		category: "forms",
		description: "Boolean selection with soft inset track.",
		tags: ["form"],
		animated: true
	},
	{
		id: "radio",
		name: "Radio",
		category: "forms",
		description: "Single choice within a group.",
		tags: ["form"],
		animated: true
	},
	{
		id: "switch",
		name: "Switch",
		category: "forms",
		description: "Animated on/off control for settings and forms.",
		tags: ["form", "toggle"],
		animated: true
	},
	{
		id: "slider",
		name: "Slider",
		category: "forms",
		description: "Range input with neumorphic thumb.",
		tags: ["form", "range"],
		animated: true
	},
	{
		id: "toggle-group",
		name: "Toggle Group",
		category: "forms",
		description: "Segmented control for exclusive options.",
		tags: ["form", "filter"],
		animated: true
	},
	{
		id: "combobox",
		name: "Combobox",
		category: "forms",
		description: "Searchable select with filtered options.",
		tags: ["form", "search"],
		animated: true
	},
	{
		id: "otp",
		name: "OTP Input",
		category: "forms",
		description: "One-time passcode digit cells.",
		tags: ["auth"],
		animated: false
	},
	{
		id: "date-field",
		name: "Date Field",
		category: "forms",
		description: "Native date input in glass field chrome.",
		tags: ["form", "date"],
		animated: false
	},
	{
		id: "calendar",
		name: "Calendar",
		category: "forms",
		span: "wide",
		description: "Month grid date picker.",
		tags: ["date"],
		animated: true
	},
	{
		id: "card",
		name: "Card",
		category: "layout",
		span: "wide",
		description: "Glass, flat, soft, and outline surface containers.",
		tags: ["surface"],
		variants: [
			"glass",
			"flat",
			"soft",
			"outline"
		],
		animated: true
	},
	{
		id: "separator",
		name: "Separator",
		category: "layout",
		description: "Visual divider with optional label.",
		tags: ["layout"],
		animated: false
	},
	{
		id: "scroll-area",
		name: "Scroll Area",
		category: "layout",
		span: "wide",
		description: "Contained scroll region.",
		tags: ["layout"],
		animated: false
	},
	{
		id: "aspect-ratio",
		name: "Aspect Ratio",
		category: "layout",
		description: "Ratio-locked media frame.",
		tags: ["layout", "media"],
		animated: false
	},
	{
		id: "resizable",
		name: "Resizable",
		category: "layout",
		span: "wide",
		description: "Split panes with draggable handle.",
		tags: ["layout", "dashboard"],
		animated: true
	},
	{
		id: "accordion",
		name: "Accordion",
		category: "layout",
		span: "wide",
		description: "Stacked disclosure sections (covers single collapsible too).",
		tags: [
			"layout",
			"faq",
			"collapsible"
		],
		animated: true
	},
	{
		id: "skeleton",
		name: "Skeleton",
		category: "feedback",
		description: "Loading placeholder shimmer.",
		tags: ["loading"],
		animated: true
	},
	{
		id: "badge",
		name: "Badge",
		category: "data",
		description: "Status chips and counts.",
		tags: ["status"],
		variants: [
			"neutral",
			"accent",
			"success",
			"warning",
			"danger"
		],
		animated: true
	},
	{
		id: "avatar",
		name: "Avatar",
		category: "data",
		description: "User initials or image.",
		tags: ["user"],
		sizes: [
			"sm",
			"md",
			"lg"
		],
		animated: false
	},
	{
		id: "data-table",
		name: "Data Table",
		category: "data",
		span: "full",
		description: "Sortable table with selection for CRM/dashboard grids.",
		tags: [
			"crm",
			"sort",
			"select",
			"table"
		],
		animated: true
	},
	{
		id: "progress",
		name: "Progress",
		category: "feedback",
		description: "Linear progress indicator.",
		tags: ["status"],
		animated: true
	},
	{
		id: "alert",
		name: "Alert",
		category: "feedback",
		span: "wide",
		description: "Inline status banners.",
		tags: ["status"],
		variants: [
			"info",
			"success",
			"warning",
			"danger"
		],
		animated: false
	},
	{
		id: "toast",
		name: "Toast",
		category: "feedback",
		description: "Transient notifications (stack supported).",
		tags: ["notify"],
		animated: true
	},
	{
		id: "empty-state",
		name: "Empty State",
		category: "feedback",
		span: "wide",
		description: "Zero-data placeholder with CTA.",
		tags: ["empty"],
		animated: false
	},
	{
		id: "dialog",
		name: "Dialog",
		category: "overlay",
		span: "wide",
		description: "Modal dialog — includes confirm / destructive patterns.",
		tags: [
			"modal",
			"confirm",
			"alert"
		],
		animated: true
	},
	{
		id: "sheet",
		name: "Sheet",
		category: "overlay",
		span: "wide",
		description: "Side drawer panel.",
		tags: ["drawer"],
		animated: true
	},
	{
		id: "dropdown",
		name: "Dropdown Menu",
		category: "overlay",
		description: "Action menu — also covers right-click / context patterns.",
		tags: ["menu", "context"],
		animated: true
	},
	{
		id: "popover",
		name: "Popover",
		category: "overlay",
		description: "Lightweight floating content (click or hover rich previews).",
		tags: ["overlay", "hover"],
		animated: true
	},
	{
		id: "tooltip",
		name: "Tooltip",
		category: "overlay",
		description: "Hover hint bubble.",
		tags: ["hint"],
		animated: true
	},
	{
		id: "command",
		name: "Command",
		category: "navigation",
		span: "wide",
		description: "Command palette / quick jump.",
		tags: ["search", "keyboard"],
		animated: true
	},
	{
		id: "tabs",
		name: "Tabs",
		category: "navigation",
		span: "wide",
		description: "Section switcher.",
		tags: ["nav"],
		animated: true
	},
	{
		id: "breadcrumb",
		name: "Breadcrumb",
		category: "navigation",
		description: "Hierarchy path.",
		tags: ["nav"],
		animated: false
	},
	{
		id: "pagination",
		name: "Pagination",
		category: "navigation",
		description: "Page controls for tables.",
		tags: ["nav", "table"],
		animated: true
	},
	{
		id: "menubar",
		name: "Menubar",
		category: "navigation",
		span: "wide",
		description: "Horizontal app menu.",
		tags: ["nav", "desktop"],
		animated: true
	},
	{
		id: "kbd",
		name: "Kbd",
		category: "navigation",
		description: "Keyboard shortcut chip.",
		tags: ["docs"],
		animated: false
	},
	{
		id: "carousel",
		name: "Carousel",
		category: "data",
		span: "wide",
		description: "Slide carousel for marketing and galleries.",
		tags: ["media"],
		animated: true
	}
];
function searchComponents(query, category = "all") {
	const q = query.trim().toLowerCase();
	return COMPONENT_REGISTRY.filter((item) => {
		if (!(category === "all" || item.category === category)) return false;
		if (!q) return true;
		return [
			item.name,
			item.description,
			item.id,
			...item.tags || []
		].join(" ").toLowerCase().includes(q);
	});
}
//#endregion
//#region src/components/playground/tweakControls.js
/**
* Taste dials — Core UI (kit chrome) then Effects (glass rings + border-beam).
* Keep in sync with /ui, /charts, and /effects demos.
*/
var TWEAK_GROUPS = [
	{
		id: "layout",
		tier: "core",
		title: "Layout",
		hint: "Corner radius across cards, buttons, inputs, and panels",
		controls: [{
			key: "radiusScale",
			label: "Border radius",
			min: 0,
			max: 1.4,
			step: .05,
			tip: "0 = sharp · 1 = default · higher = softer"
		}]
	},
	{
		id: "glass",
		tier: "core",
		title: "Glass",
		hint: "Frost on cards, sheets, sidebar, and glass panels",
		controls: [
			{
				key: "glassBlur",
				label: "Blur",
				min: 4,
				max: 40,
				step: 1,
				tip: "How frosted glass surfaces look"
			},
			{
				key: "glassOpacity",
				label: "Opacity",
				min: .15,
				max: .9,
				step: .01,
				tip: "Transparency of glass fills"
			},
			{
				key: "glassSaturation",
				label: "Saturation",
				min: .8,
				max: 2,
				step: .05,
				tip: "Color punch through the frost"
			},
			{
				key: "rimStrength",
				label: "Rim highlight",
				min: .2,
				max: 1,
				step: .01,
				tip: "Bright edge on glass borders"
			}
		]
	},
	{
		id: "color",
		tier: "core",
		title: "Color",
		hint: "Accent used for buttons, focus rings, and highlights",
		controls: [{
			key: "accentHue",
			label: "Accent hue",
			min: 0,
			max: 360,
			step: 1,
			tip: "Primary brand tint for the kit"
		}]
	},
	{
		id: "depth",
		tier: "core",
		title: "Depth & motion",
		hint: "Shadows, elevation, and how lively the UI feels",
		controls: [
			{
				key: "shadowIntensity",
				label: "Shadow",
				min: .2,
				max: 1.8,
				step: .05,
				tip: "Depth of cards and floating panels"
			},
			{
				key: "surfaceLift",
				label: "Surface lift",
				min: .4,
				max: 1.6,
				step: .05,
				tip: "Baseline elevation of surfaces"
			},
			{
				key: "hoverLift",
				label: "Hover lift",
				min: 0,
				max: 1.2,
				step: .05,
				tip: "How much cards rise on hover"
			},
			{
				key: "motionStrength",
				label: "Motion",
				min: 0,
				max: 1.5,
				step: .05,
				tip: "Chart draw-in and UI animation strength"
			}
		]
	},
	{
		id: "rings",
		tier: "effects",
		title: "Glass ring badges",
		hint: "Shown on the Effects page — brand marks & KPI icons",
		controls: [
			{
				key: "ringShine",
				label: "Shine",
				min: 0,
				max: 1.5,
				step: .01,
				tip: "Spinning highlight on the ring"
			},
			{
				key: "ringThickness",
				label: "Thickness",
				min: 1,
				max: 6,
				step: .1,
				tip: "Ring stroke width"
			},
			{
				key: "ringSpread",
				label: "Spread",
				min: 2,
				max: 14,
				step: .5,
				tip: "Gap to the outer glow"
			},
			{
				key: "ringGlow",
				label: "Glow",
				min: 0,
				max: 1.2,
				step: .01,
				tip: "Soft halo around the ring"
			}
		]
	}
];
var DEFAULT_EFFECTS = {
	borderBeam: "off",
	borderBeamColor: "ocean"
};
TWEAK_GROUPS.flatMap((g) => g.controls);
//#endregion
//#region src/theme/ThemeProvider.jsx
var THEMES = [
	{
		id: "soft-glass",
		name: "Soft Glass",
		description: "Frosted pills, pastel badges, soft depth"
	},
	{
		id: "crystal",
		name: "Crystal",
		description: "Cooler glass, sharper rims, airy translucency"
	},
	{
		id: "aurora",
		name: "Aurora",
		description: "Colorful glow, vibrant rings, playful energy"
	},
	{
		id: "dusk",
		name: "Dusk",
		description: "Dark blue glass with luminous accents"
	},
	{
		id: "midnight",
		name: "Midnight",
		description: "Warm charcoal panels with amber highlights"
	}
];
/** Default accent hue per theme — keeps focus/hover rings on-brand. */
var THEME_ACCENT_HUE = {
	"soft-glass": 199,
	crystal: 198,
	aurora: 280,
	dusk: 205,
	midnight: 32
};
var LEGACY_THEMES = {
	"neo-clay": "soft-glass",
	ink: "soft-glass"
};
var DEFAULT_TWEAKS = {
	glassBlur: 22,
	glassOpacity: .55,
	glassSaturation: 1.35,
	rimStrength: .92,
	ringShine: .85,
	ringThickness: 2.5,
	ringSpread: 6,
	ringGlow: .55,
	shadowIntensity: 1,
	radiusScale: 1,
	accentHue: 199,
	surfaceLift: 1,
	hoverLift: .2,
	motionStrength: 1
};
var ThemeContext = createContext(null);
function applyDocumentTheme(themeId, tweaks) {
	const root = document.documentElement;
	root.dataset.theme = themeId;
	const hue = tweaks.accentHue ?? THEME_ACCENT_HUE[themeId] ?? 199;
	root.style.setProperty("--t-glass-blur", `${tweaks.glassBlur}px`);
	root.style.setProperty("--t-glass-opacity", String(tweaks.glassOpacity));
	root.style.setProperty("--t-glass-sat", String(tweaks.glassSaturation));
	root.style.setProperty("--t-rim", String(tweaks.rimStrength));
	root.style.setProperty("--t-ring-shine", String(tweaks.ringShine));
	root.style.setProperty("--t-ring-thickness", `${tweaks.ringThickness}px`);
	root.style.setProperty("--t-ring-spread", `${tweaks.ringSpread}px`);
	root.style.setProperty("--t-ring-glow", String(tweaks.ringGlow));
	root.style.setProperty("--t-shadow", String(tweaks.shadowIntensity));
	root.style.setProperty("--t-radius", String(tweaks.radiusScale));
	root.style.setProperty("--t-accent-h", String(hue));
	root.style.setProperty("--t-lift", String(tweaks.surfaceLift));
	root.style.setProperty("--t-hover-lift", String(tweaks.hoverLift));
	root.style.setProperty("--t-motion", String(tweaks.motionStrength));
	const isDark = themeId === "dusk" || themeId === "midnight";
	const accent = `hsl(${hue} 85% ${isDark ? 58 : 48}%)`;
	root.style.setProperty("--accent", accent);
	root.style.setProperty("--accent-soft", isDark ? `hsl(${hue} 42% 20%)` : `hsl(${hue} 90% 92%)`);
	root.style.setProperty("--accent-ink", isDark ? `hsl(${hue} 90% 78%)` : `hsl(${hue} 70% 28%)`);
	root.style.setProperty("--focus-ring", `hsl(${hue} 85% ${isDark ? 62 : 52}%)`);
	root.style.setProperty("--focus-glow", `hsl(${hue} 90% 60% / 0.28)`);
	root.style.setProperty("--chart-1", accent);
	root.style.setProperty("--chart-2", `hsl(${(hue + 48) % 360} 75% ${isDark ? 68 : 58}%)`);
	root.style.setProperty("--chart-3", `hsl(${(hue + 130) % 360} 70% ${isDark ? 58 : 46}%)`);
	root.style.setProperty("--chart-4", `hsl(${(hue + 210) % 360} 80% ${isDark ? 62 : 52}%)`);
}
function ThemeProvider({ children }) {
	const [themeId, setThemeIdState] = useState(() => {
		const saved = localStorage.getItem("suk-theme") || "soft-glass";
		return LEGACY_THEMES[saved] || saved;
	});
	const [tweaks, setTweaks] = useState(() => {
		try {
			const raw = localStorage.getItem("suk-tweaks");
			return raw ? {
				...DEFAULT_TWEAKS,
				...JSON.parse(raw)
			} : DEFAULT_TWEAKS;
		} catch {
			return DEFAULT_TWEAKS;
		}
	});
	const [effects, setEffects] = useState(() => {
		try {
			const raw = localStorage.getItem("suk-effects");
			if (!raw) return DEFAULT_EFFECTS;
			const { metalFx: _legacyMetal, ...rest } = JSON.parse(raw);
			return {
				...DEFAULT_EFFECTS,
				...rest
			};
		} catch {
			return DEFAULT_EFFECTS;
		}
	});
	function selectTheme(nextId) {
		const id = LEGACY_THEMES[nextId] || nextId;
		setThemeIdState(id);
		setTweaks((prev) => ({
			...prev,
			accentHue: THEME_ACCENT_HUE[id] ?? prev.accentHue
		}));
	}
	const effectTheme = themeId === "dusk" || themeId === "midnight" ? "dark" : "light";
	useEffect(() => {
		applyDocumentTheme(themeId, tweaks);
		localStorage.setItem("suk-theme", themeId);
	}, [themeId, tweaks]);
	useEffect(() => {
		localStorage.setItem("suk-tweaks", JSON.stringify(tweaks));
	}, [tweaks]);
	useEffect(() => {
		localStorage.setItem("suk-effects", JSON.stringify(effects));
		document.documentElement.dataset.beam = effects.borderBeam;
		delete document.documentElement.dataset.metal;
	}, [effects]);
	useEffect(() => {
		function onKeyDown(e) {
			if (!e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
			const target = e.target;
			if (target instanceof HTMLElement && (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) return;
			const digit = e.code.match(/^Digit([1-9])$/)?.[1];
			if (!digit) return;
			const index = Number(digit) - 1;
			if (index < 0 || index >= THEMES.length) return;
			e.preventDefault();
			selectTheme(THEMES[index].id);
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);
	const value = useMemo(() => ({
		themeId,
		setThemeId: selectTheme,
		selectTheme,
		themes: THEMES,
		tweaks,
		setTweaks,
		updateTweak: (key, value) => {
			setTweaks((prev) => ({
				...prev,
				[key]: value
			}));
		},
		resetTweaks: () => setTweaks({
			...DEFAULT_TWEAKS,
			accentHue: THEME_ACCENT_HUE[themeId] ?? DEFAULT_TWEAKS.accentHue
		}),
		applyTaste: ({ theme, tweaks: nextTweaks }) => {
			if (theme) {
				const id = LEGACY_THEMES[theme] || theme;
				setThemeIdState(id);
			}
			if (nextTweaks) setTweaks({
				...DEFAULT_TWEAKS,
				...nextTweaks
			});
		},
		effects,
		effectTheme,
		setEffects,
		updateEffect: (key, value) => {
			setEffects((prev) => ({
				...prev,
				[key]: value
			}));
		},
		resetEffects: () => setEffects(DEFAULT_EFFECTS)
	}), [
		themeId,
		tweaks,
		effects,
		effectTheme
	]);
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
//#endregion
//#region src/components/charts/Charts.jsx
function BarChart({ values, labels, className = "", formatValue = (v) => String(v) }) {
	const [active, setActive] = useState(null);
	const max = Math.max(...values, 1);
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("chart chart--bar", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "chart__meta",
			"aria-live": "polite",
			children: active != null ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("strong", { children: labels?.[active] ?? `Point ${active + 1}` }), /* @__PURE__ */ jsx("span", { children: formatValue(values[active]) })] }) : /* @__PURE__ */ jsx("span", {
				className: "chart__hint",
				children: "Hover a bar"
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "chart-bars chart-bars--interactive",
			children: values.map((value, i) => {
				const height = Math.max(8, Math.round(value / max * 100));
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: clsx("chart-bar", active === i && "is-active"),
					style: {
						"--bar-h": `${height}%`,
						animationDelay: `${i * 40 * 1}ms`
					},
					onMouseEnter: () => setActive(i),
					onFocus: () => setActive(i),
					onMouseLeave: () => setActive(null),
					onBlur: () => setActive(null),
					"aria-label": `${labels?.[i] ?? i}: ${formatValue(value)}`,
					children: [/* @__PURE__ */ jsx("span", { className: "chart-bar__fill chart-bar__fill--anim" }), /* @__PURE__ */ jsx("span", {
						className: "chart-bar__tip",
						children: formatValue(value)
					})]
				}, i);
			})
		})]
	});
}
function LineChart({ values, labels, className = "", formatValue = (v) => String(v), fill = false }) {
	const [active, setActive] = useState(null);
	const gradId = useId().replace(/:/g, "");
	const max = Math.max(...values, 1);
	const min = Math.min(...values, 0);
	const span = Math.max(max - min, 1);
	const w = 320;
	const h = 180;
	const pad = 10;
	const points = useMemo(() => values.map((v, i) => {
		return {
			x: pad + i / Math.max(values.length - 1, 1) * (w - pad * 2),
			y: h - pad - (v - min) / span * (h - pad * 2),
			v,
			i
		};
	}), [
		values,
		min,
		span
	]);
	const line = points.map((p) => `${p.x},${p.y}`).join(" ");
	const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;
	function nearestIndex(clientX, svg) {
		const rect = svg.getBoundingClientRect();
		const x = (clientX - rect.left) / rect.width * w;
		let best = 0;
		let bestDist = Infinity;
		for (const p of points) {
			const d = Math.abs(p.x - x);
			if (d < bestDist) {
				bestDist = d;
				best = p.i;
			}
		}
		return best;
	}
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("chart chart--line", fill && "chart--area", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "chart__meta",
			children: active != null ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("strong", { children: labels?.[active] ?? `P${active + 1}` }), /* @__PURE__ */ jsx("span", { children: formatValue(values[active]) })] }) : /* @__PURE__ */ jsx("span", {
				className: "chart__hint",
				children: "Hover the path"
			})
		}), /* @__PURE__ */ jsxs("svg", {
			viewBox: `0 0 ${w} ${h}`,
			className: "chart-svg",
			role: "img",
			onMouseMove: (e) => setActive(nearestIndex(e.clientX, e.currentTarget)),
			onMouseLeave: () => setActive(null),
			children: [
				/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
					id: gradId,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "var(--accent)",
						stopOpacity: "0.35"
					}), /* @__PURE__ */ jsx("stop", {
						offset: "100%",
						stopColor: "var(--accent)",
						stopOpacity: "0"
					})]
				}) }),
				fill ? /* @__PURE__ */ jsx("polygon", {
					className: "chart-area",
					points: area,
					fill: `url(#${gradId})`
				}) : null,
				/* @__PURE__ */ jsx("polyline", {
					className: "chart-line-hit",
					points: line,
					fill: "none",
					pointerEvents: "stroke"
				}),
				/* @__PURE__ */ jsx("polyline", {
					className: "chart-line",
					points: line,
					fill: "none",
					pointerEvents: "none"
				}),
				active != null ? /* @__PURE__ */ jsx("line", {
					className: "chart-crosshair",
					x1: points[active].x,
					x2: points[active].x,
					y1: pad,
					y2: h - pad,
					pointerEvents: "none"
				}) : null,
				points.map((p) => /* @__PURE__ */ jsx("circle", {
					className: clsx("chart-dot", active === p.i && "is-active"),
					cx: p.x,
					cy: p.y,
					r: active === p.i ? 6 : 4,
					pointerEvents: "none"
				}, p.i))
			]
		})]
	});
}
function DonutChart({ segments, className = "", centerLabel = "Total", centerValue }) {
	const [active, setActive] = useState(null);
	const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
	const r = 42;
	const c = 2 * Math.PI * r;
	let offset = 0;
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("chart chart--donut", className),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "donut-wrap",
			children: [/* @__PURE__ */ jsxs("svg", {
				viewBox: "0 0 120 120",
				className: "donut-svg",
				children: [/* @__PURE__ */ jsx("circle", {
					className: "donut-track",
					cx: "60",
					cy: "60",
					r
				}), segments.map((seg, i) => {
					const len = seg.value / total * c;
					const dash = `${len} ${c - len}`;
					const el = /* @__PURE__ */ jsx("circle", {
						className: clsx("donut-seg", active === i && "is-active"),
						cx: "60",
						cy: "60",
						r,
						stroke: seg.color || `hsl(${(i * 57 + 190) % 360} 75% 55%)`,
						strokeDasharray: dash,
						strokeDashoffset: -offset,
						onMouseEnter: () => setActive(i),
						onMouseLeave: () => setActive(null),
						style: { animationDelay: `${i * 80}ms` }
					}, seg.id || seg.label);
					offset += len;
					return el;
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "donut-center",
				children: [/* @__PURE__ */ jsx("strong", { children: active != null ? segments[active].label : centerLabel }), /* @__PURE__ */ jsx("span", { children: active != null ? segments[active].value : centerValue ?? total })]
			})]
		}), /* @__PURE__ */ jsx("ul", {
			className: "donut-legend",
			children: segments.map((seg, i) => /* @__PURE__ */ jsxs("li", {
				className: clsx(active === i && "is-active"),
				onMouseEnter: () => setActive(i),
				onMouseLeave: () => setActive(null),
				children: [
					/* @__PURE__ */ jsx("i", { style: { background: seg.color || `hsl(${(i * 57 + 190) % 360} 75% 55%)` } }),
					/* @__PURE__ */ jsx("span", { children: seg.label }),
					/* @__PURE__ */ jsxs("em", { children: [Math.round(seg.value / total * 100), "%"] })
				]
			}, seg.id || seg.label))
		})]
	});
}
function Sparkline({ values, className = "" }) {
	const max = Math.max(...values, 1);
	const min = Math.min(...values, 0);
	const span = Math.max(max - min, 1);
	const w = 80;
	const h = 28;
	const points = values.map((v, i) => {
		return `${i / Math.max(values.length - 1, 1) * w},${h - (v - min) / span * h}`;
	}).join(" ");
	return /* @__PURE__ */ jsx("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: clsx("sparkline", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("polyline", {
			points,
			fill: "none"
		})
	});
}
//#endregion
//#region src/components/charts/AdvancedCharts.jsx
/** Calendar-style intensity grid for ops / product heatmaps. */
function HeatmapChart({ rows = 7, cols = 14, values, labels = [], className = "", formatCell = (v) => String(v) }) {
	const [active, setActive] = useState(null);
	const data = useMemo(() => {
		if (values?.length) return values;
		return Array.from({ length: rows * cols }, (_, i) => Math.round(20 + i * 37 % 80));
	}, [
		values,
		rows,
		cols
	]);
	const max = Math.max(...data, 1);
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("chart chart--heatmap", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "chart__meta",
			"aria-live": "polite",
			children: active != null ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("strong", { children: labels[active] ?? `Cell ${active + 1}` }), /* @__PURE__ */ jsx("span", { children: formatCell(data[active]) })] }) : /* @__PURE__ */ jsx("span", {
				className: "chart__hint",
				children: "Hover a cell"
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "heatmap-grid",
			style: { "--hm-cols": cols },
			role: "img",
			"aria-label": "Heatmap",
			children: data.map((v, i) => {
				const intensity = v / max;
				return /* @__PURE__ */ jsx("button", {
					type: "button",
					className: clsx("heatmap-cell", active === i && "is-active"),
					style: { "--hm-i": intensity },
					onMouseEnter: () => setActive(i),
					onFocus: () => setActive(i),
					onMouseLeave: () => setActive(null),
					onBlur: () => setActive(null),
					"aria-label": `${labels[i] ?? i}: ${formatCell(v)}`
				}, i);
			})
		})]
	});
}
/** Radial progress / KPI ring. */
function RadialProgress({ value = 72, max = 100, size = 160, label = "Progress", className = "" }) {
	const pct = Math.min(100, Math.max(0, value / max * 100));
	const r = 42;
	const c = 2 * Math.PI * r;
	const dash = pct / 100 * c;
	return /* @__PURE__ */ jsx("div", {
		className: clsx("chart chart--radial", className),
		children: /* @__PURE__ */ jsxs("svg", {
			width: size,
			height: size,
			viewBox: "0 0 100 100",
			className: "radial-svg",
			children: [
				/* @__PURE__ */ jsx("circle", {
					className: "radial-track",
					cx: "50",
					cy: "50",
					r
				}),
				/* @__PURE__ */ jsx("circle", {
					className: "radial-fill",
					cx: "50",
					cy: "50",
					r,
					strokeDasharray: `${dash} ${c}`,
					transform: "rotate(-90 50 50)"
				}),
				/* @__PURE__ */ jsxs("text", {
					x: "50",
					y: "48",
					textAnchor: "middle",
					className: "radial-value",
					children: [Math.round(pct), "%"]
				}),
				/* @__PURE__ */ jsx("text", {
					x: "50",
					y: "60",
					textAnchor: "middle",
					className: "radial-label",
					children: label
				})
			]
		})
	});
}
/** Multi-metric radial bars (activity rings style). */
function RadialBars({ series = [], className = "", size = 200 }) {
	const cx = size / 2;
	const cy = size / 2;
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("chart chart--radial-bars", className),
		children: [/* @__PURE__ */ jsx("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			children: series.map((s, i) => {
				const r = size * .38 - i * (size * .1);
				const c = 2 * Math.PI * r;
				const dash = Math.min(100, Math.max(0, s.value)) / 100 * c;
				return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("circle", {
					className: "radial-track",
					cx,
					cy,
					r,
					strokeWidth: size * .07
				}), /* @__PURE__ */ jsx("circle", {
					className: "radial-fill",
					cx,
					cy,
					r,
					strokeWidth: size * .07,
					stroke: s.color || `var(--chart-${i % 4 + 1})`,
					strokeDasharray: `${dash} ${c}`,
					transform: `rotate(-90 ${cx} ${cy})`
				})] }, s.label);
			})
		}), /* @__PURE__ */ jsx("ul", {
			className: "radial-bars__legend",
			children: series.map((s, i) => /* @__PURE__ */ jsxs("li", { children: [
				/* @__PURE__ */ jsx("i", { style: { background: s.color || `var(--chart-${i % 4 + 1})` } }),
				/* @__PURE__ */ jsx("span", { children: s.label }),
				/* @__PURE__ */ jsxs("strong", { children: [s.value, "%"] })
			] }, s.label))
		})]
	});
}
/** Spider / radar chart for multi-axis scores. */
function RadarChart({ axes = [], values = [], className = "", size = 260 }) {
	const n = axes.length || 1;
	const cx = size / 2;
	const cy = size / 2;
	const R = size * .36;
	const poly = useMemo(() => {
		return values.map((v, i) => {
			const a = -Math.PI / 2 + i / n * Math.PI * 2;
			const r = Math.min(100, Math.max(0, v)) / 100 * R;
			return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
		}).join(" ");
	}, [
		values,
		n,
		cx,
		cy,
		R
	]);
	return /* @__PURE__ */ jsx("div", {
		className: clsx("chart chart--radar", className),
		children: /* @__PURE__ */ jsxs("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			children: [
				[
					.33,
					.66,
					1
				].map((t) => /* @__PURE__ */ jsx("polygon", {
					className: "radar-ring",
					points: Array.from({ length: n }, (_, i) => {
						const a = -Math.PI / 2 + i / n * Math.PI * 2;
						return `${cx + Math.cos(a) * R * t},${cy + Math.sin(a) * R * t}`;
					}).join(" ")
				}, t)),
				axes.map((label, i) => {
					const a = -Math.PI / 2 + i / n * Math.PI * 2;
					const x = cx + Math.cos(a) * (R + 14);
					const y = cy + Math.sin(a) * (R + 14);
					return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("line", {
						className: "radar-spoke",
						x1: cx,
						y1: cy,
						x2: cx + Math.cos(a) * R,
						y2: cy + Math.sin(a) * R
					}), /* @__PURE__ */ jsx("text", {
						x,
						y,
						textAnchor: "middle",
						className: "radar-axis",
						children: label
					})] }, label);
				}),
				/* @__PURE__ */ jsx("polygon", {
					className: "radar-area",
					points: poly
				})
			]
		})
	});
}
/** Conversion funnel stages. */
function FunnelChart({ stages = [], className = "" }) {
	const max = Math.max(...stages.map((s) => s.value), 1);
	return /* @__PURE__ */ jsx("div", {
		className: clsx("chart chart--funnel", className),
		children: stages.map((s, i) => {
			return /* @__PURE__ */ jsx("div", {
				className: "funnel-row",
				children: /* @__PURE__ */ jsxs("div", {
					className: "funnel-bar",
					style: {
						width: `${Math.max(28, Math.round(s.value / max * 100))}%`,
						background: s.color || `var(--chart-${i % 4 + 1})`
					},
					children: [/* @__PURE__ */ jsx("span", { children: s.label }), /* @__PURE__ */ jsx("strong", { children: s.value })]
				})
			}, s.label);
		})
	});
}
/** Simple scatter plot with line hover (nearest point by X). */
function ScatterChart({ points = [], className = "", formatPoint = (p) => `${p.x}, ${p.y}` }) {
	const [active, setActive] = useState(null);
	const w = 360;
	const h = 220;
	const pad = 16;
	const xs = points.map((p) => p.x);
	const ys = points.map((p) => p.y);
	const minX = Math.min(...xs, 0);
	const maxX = Math.max(...xs, 1);
	const minY = Math.min(...ys, 0);
	const maxY = Math.max(...ys, 1);
	const mapped = useMemo(() => points.map((p, i) => ({
		...p,
		i,
		px: pad + (p.x - minX) / (maxX - minX || 1) * (w - pad * 2),
		py: h - pad - (p.y - minY) / (maxY - minY || 1) * (h - pad * 2)
	})), [
		points,
		minX,
		maxX,
		minY,
		maxY
	]);
	const line = mapped.map((p) => `${p.px},${p.py}`).join(" ");
	function nearestIndex(clientX, svg) {
		const rect = svg.getBoundingClientRect();
		const x = (clientX - rect.left) / rect.width * w;
		let best = 0;
		let bestDist = Infinity;
		for (const p of mapped) {
			const d = Math.abs(p.px - x);
			if (d < bestDist) {
				bestDist = d;
				best = p.i;
			}
		}
		return best;
	}
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("chart chart--scatter", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "chart__meta",
			"aria-live": "polite",
			children: active != null ? /* @__PURE__ */ jsx("span", { children: formatPoint(points[active]) }) : /* @__PURE__ */ jsx("span", {
				className: "chart__hint",
				children: "Hover the line"
			})
		}), /* @__PURE__ */ jsxs("svg", {
			viewBox: `0 0 ${w} ${h}`,
			className: "scatter-svg",
			role: "img",
			onMouseMove: (e) => setActive(nearestIndex(e.clientX, e.currentTarget)),
			onMouseLeave: () => setActive(null),
			children: [
				/* @__PURE__ */ jsx("polyline", {
					className: "scatter-line",
					points: line,
					fill: "none",
					pointerEvents: "none"
				}),
				/* @__PURE__ */ jsx("polyline", {
					className: "chart-line-hit",
					points: line,
					fill: "none",
					pointerEvents: "stroke"
				}),
				active != null ? /* @__PURE__ */ jsx("line", {
					className: "chart-crosshair",
					x1: mapped[active].px,
					x2: mapped[active].px,
					y1: pad,
					y2: h - pad,
					pointerEvents: "none"
				}) : null,
				mapped.map((p) => /* @__PURE__ */ jsx("circle", {
					className: clsx("scatter-dot", active === p.i && "is-active"),
					cx: p.px,
					cy: p.py,
					r: active === p.i ? 7 : 5,
					pointerEvents: "none"
				}, p.i))
			]
		})]
	});
}
//#endregion
//#region src/components/charts/DotMatrixChart.jsx
/**
* Autumn-style pixel / dot-matrix column chart.
* Filled cells = value; empty cells = light grid texture.
*/
function DotMatrixChart({ series, labels, max = 400, rows = 20, accent, formatTooltip, className }) {
	const [active, setActive] = useState(null);
	const cols = series.length;
	const step = max / rows;
	const grid = useMemo(() => series.map((value) => {
		return {
			value,
			filled: Math.max(0, Math.min(rows, Math.round(value / step)))
		};
	}), [
		series,
		rows,
		step
	]);
	const yTicks = [
		max,
		Math.round(max * .75),
		Math.round(max * .5),
		Math.round(max * .25)
	];
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("dot-chart", className),
		style: {
			"--dot-cols": cols,
			"--dot-rows": rows,
			...accent ? { "--dot-accent": accent } : null
		},
		children: [/* @__PURE__ */ jsxs("div", {
			className: "dot-chart__body",
			children: [/* @__PURE__ */ jsx("div", {
				className: "dot-chart__y",
				"aria-hidden": "true",
				children: yTicks.map((t) => /* @__PURE__ */ jsx("span", { children: t }, t))
			}), /* @__PURE__ */ jsxs("div", {
				className: "dot-chart__plot",
				onMouseLeave: () => setActive(null),
				children: [grid.map((col, ci) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: clsx("dot-chart__col", active === ci && "is-active"),
					onMouseEnter: () => setActive(ci),
					onFocus: () => setActive(ci),
					"aria-label": `${labels[ci]}: ${col.value}`,
					children: Array.from({ length: rows }, (_, ri) => {
						return /* @__PURE__ */ jsx("span", {
							className: clsx("dot-chart__cell", ri >= rows - col.filled && "is-filled"),
							style: { animationDelay: `${(ci * 18 + (rows - ri) * 6) * .4}ms` }
						}, ri);
					})
				}, labels[ci] || ci)), active != null ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
					className: "dot-chart__guide",
					style: { left: `calc(${(active + .5) / cols} * 100%)` }
				}), /* @__PURE__ */ jsx("div", {
					className: "dot-chart__tooltip",
					style: { left: `calc(${(active + .5) / cols} * 100%)` },
					children: formatTooltip ? formatTooltip(labels[active], series[active], active) : `${labels[active]} · ${series[active]}`
				})] }) : null]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "dot-chart__x",
			children: [/* @__PURE__ */ jsx("span", {
				className: "dot-chart__y-spacer",
				"aria-hidden": "true"
			}), /* @__PURE__ */ jsx("div", {
				className: "dot-chart__x-labels",
				children: labels.map((label, i) => /* @__PURE__ */ jsx("span", {
					className: clsx(active === i && "is-active"),
					children: active === i ? /* @__PURE__ */ jsx("em", { children: label }) : label
				}, label))
			})]
		})]
	});
}
function SegmentedBar({ segments, className }) {
	const total = segments.reduce((s, x) => s + x.value, 0) || 1;
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("seg-bar", className),
		children: [/* @__PURE__ */ jsx("div", {
			className: "seg-bar__track",
			children: segments.map((seg) => /* @__PURE__ */ jsx("div", {
				className: "seg-bar__chunk",
				style: {
					width: `${seg.value / total * 100}%`,
					background: seg.color
				},
				title: `${seg.label}: ${seg.value}%`
			}, seg.id || seg.label))
		}), /* @__PURE__ */ jsx("ul", {
			className: "seg-bar__legend",
			children: segments.map((seg) => /* @__PURE__ */ jsxs("li", { children: [
				/* @__PURE__ */ jsx("i", { style: { background: seg.color } }),
				/* @__PURE__ */ jsx("span", { children: seg.label }),
				/* @__PURE__ */ jsxs("strong", { children: [seg.value, "%"] })
			] }, seg.id || seg.label))
		})]
	});
}
function TimelineBar({ markers, className, stripedTail = true }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("timeline-bar", className),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "timeline-bar__track",
			children: [markers.map((m, i) => /* @__PURE__ */ jsx("div", {
				className: "timeline-bar__seg",
				style: {
					flex: m.weight || 1,
					background: m.color || "var(--chart-1)",
					opacity: .55 + i * .12
				}
			}, m.id || m.label)), stripedTail ? /* @__PURE__ */ jsx("div", { className: "timeline-bar__tail" }) : null]
		}), /* @__PURE__ */ jsx("div", {
			className: "timeline-bar__marks",
			children: markers.map((m) => /* @__PURE__ */ jsx("div", {
				className: "timeline-bar__mark",
				style: { left: m.at },
				children: /* @__PURE__ */ jsx("span", { children: m.label })
			}, m.id || m.label))
		})]
	});
}
//#endregion
//#region src/components/effects/GlassRing.jsx
/**
* Shiny glass ring — decorative / accent ring with tweakable shine.
* `soft` reduces elevation for KPI / dense dashboard use.
*/
function GlassRing({ children, className, size = 56, tone = "accent", active = true, soft = false, as: Comp = "div", ...props }) {
	return /* @__PURE__ */ jsxs(Comp, {
		className: clsx("glass-ring", `glass-ring--${tone}`, soft && "glass-ring--soft", active && "is-active", className),
		style: { "--ring-size": `${size}px` },
		...props,
		children: [
			!soft ? /* @__PURE__ */ jsx("span", {
				className: "glass-ring__shine",
				"aria-hidden": "true"
			}) : null,
			!soft ? /* @__PURE__ */ jsx("span", {
				className: "glass-ring__glow",
				"aria-hidden": "true"
			}) : null,
			/* @__PURE__ */ jsx("span", {
				className: "glass-ring__core",
				children
			})
		]
	});
}
function GlassOrbField({ denser = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("orb-field", denser && "orb-field--dense"),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("span", { className: "orb orb--a" }),
			/* @__PURE__ */ jsx("span", { className: "orb orb--b" }),
			/* @__PURE__ */ jsx("span", { className: "orb orb--c" }),
			/* @__PURE__ */ jsx("span", { className: "orb orb--d" }),
			denser ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { className: "orb orb--e" }), /* @__PURE__ */ jsx("span", { className: "orb orb--f" })] }) : null
		]
	});
}
//#endregion
//#region src/components/layout/DashboardShell.jsx
var COLLAPSE_KEY = "suk-sidebar-collapsed";
function useSidebarCollapsed(defaultCollapsed = false) {
	const [collapsed, setCollapsed] = useState(() => {
		try {
			const raw = localStorage.getItem(COLLAPSE_KEY);
			if (raw == null) return defaultCollapsed;
			return raw === "1";
		} catch {
			return defaultCollapsed;
		}
	});
	useEffect(() => {
		try {
			localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
		} catch {}
	}, [collapsed]);
	return [collapsed, setCollapsed];
}
/**
* Dashboard layout with a collapsible sidebar (icon rail when collapsed).
* Collapse is a layout control — not part of Taste.
*/
function DashboardShell({ children, brand, items = [], footer, collapsed: collapsedProp, onCollapsedChange, defaultCollapsed = false, mobileOpen = false, onMobileOpenChange, className, collapsible = true }) {
	const labelId = useId();
	const [uncontrolled, setUncontrolled] = useState(defaultCollapsed);
	const collapsed = collapsedProp ?? uncontrolled;
	const setCollapsed = onCollapsedChange ?? setUncontrolled;
	function toggleCollapsed() {
		setCollapsed(!collapsed);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("app-shell", "dashboard-shell", collapsed && "is-collapsed", className),
		children: [/* @__PURE__ */ jsxs("aside", {
			className: clsx("app-sidebar", "glass", mobileOpen && "is-open", collapsed && "is-collapsed"),
			"aria-labelledby": labelId,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "dashboard-shell__brand-row",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "brand",
						id: labelId,
						children: [brand?.icon, /* @__PURE__ */ jsxs("div", {
							className: "brand__text",
							children: [/* @__PURE__ */ jsx("span", {
								className: "brand__name",
								children: brand?.name ?? "Dashboard"
							}), brand?.tag ? /* @__PURE__ */ jsx("span", {
								className: "brand__tag",
								children: brand.tag
							}) : null]
						})]
					}), collapsible ? /* @__PURE__ */ jsx(IconButton, {
						className: "sidebar-collapse-btn desktop-only",
						variant: "ghost",
						label: collapsed ? "Expand sidebar" : "Collapse sidebar",
						"aria-pressed": collapsed,
						onClick: toggleCollapsed,
						children: collapsed ? /* @__PURE__ */ jsx(PanelLeft, { size: 18 }) : /* @__PURE__ */ jsx(PanelLeftClose, { size: 18 })
					}) : null]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "side-nav",
					"aria-label": "Primary",
					children: items.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ jsxs(NavLink, {
							to: item.to,
							end: item.end,
							"aria-label": item.label,
							onClick: () => onMobileOpenChange?.(false),
							children: [Icon ? /* @__PURE__ */ jsx(Icon, {
								size: 18,
								strokeWidth: 1.7,
								"aria-hidden": true
							}) : null, /* @__PURE__ */ jsx("span", {
								className: "side-nav__label",
								children: item.label
							})]
						}, item.to || item.id);
					})
				}),
				footer ? /* @__PURE__ */ jsx("div", {
					className: "side-meta glass",
					children: footer
				}) : null
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "app-main",
			children
		})]
	});
}
/** Compact interactive preview for the component catalog. */
function DashboardShellPreview() {
	const [collapsed, setCollapsed] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: `dash-preview${collapsed ? " is-collapsed" : ""}`,
		children: [/* @__PURE__ */ jsxs("aside", {
			className: "dash-preview__side glass",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "dash-preview__brand",
					children: [/* @__PURE__ */ jsx("strong", { children: collapsed ? "S" : "Studio" }), /* @__PURE__ */ jsx(IconButton, {
						variant: "outline",
						label: collapsed ? "Expand" : "Collapse",
						onClick: () => setCollapsed((v) => !v),
						children: collapsed ? /* @__PURE__ */ jsx(PanelLeft, { size: 14 }) : /* @__PURE__ */ jsx(PanelLeftClose, { size: 14 })
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "dash-preview__nav",
					children: [
						{
							id: "overview",
							label: "Overview",
							icon: Home
						},
						{
							id: "team",
							label: "Team",
							icon: Users$1
						},
						{
							id: "search",
							label: "Search",
							icon: Home
						}
					].map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ jsxs("span", {
							className: "dash-preview__link",
							children: [/* @__PURE__ */ jsx(Icon, { size: 14 }), !collapsed ? /* @__PURE__ */ jsx("span", { children: item.label }) : null]
						}, item.id);
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "dash-preview__hint",
					children: collapsed ? "Rail" : "Click collapse for icon rail"
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "dash-preview__main",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "dash-preview__kpi",
					children: [/* @__PURE__ */ jsx("span", { children: "Users" }), /* @__PURE__ */ jsx("strong", { children: "12.4k" })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "dash-preview__kpi",
					children: [/* @__PURE__ */ jsx("span", { children: "Latency" }), /* @__PURE__ */ jsx("strong", { children: "142ms" })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "dash-preview__chart",
					children: [/* @__PURE__ */ jsx("span", { children: "Traffic" }), /* @__PURE__ */ jsx("div", {
						className: "dash-preview__bars",
						"aria-hidden": true,
						children: [
							40,
							55,
							48,
							70,
							62,
							80,
							74
						].map((h, i) => /* @__PURE__ */ jsx("i", { style: { height: `${h}%` } }, i))
					})]
				})
			]
		})]
	});
}
//#endregion
export { Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, BarChart, BarChart as HoverChart, Breadcrumb, Button, COMPONENT_CATEGORIES, COMPONENT_REGISTRY, Calendar, Card, Carousel, Checkbox, Collapsible, Combobox, Command, ContextMenu, DEFAULT_EFFECTS, DEFAULT_TWEAKS, DashboardShell, DashboardShellPreview, DataTable, DateField, Dialog, DonutChart, DotMatrixChart, DropdownMenu, EmptyState, FormField, FunnelChart, GlassOrbField, GlassRing, HeatmapChart, HoverCard, IconButton, Input, InputGroup, Kbd, Label, LineChart, Menubar, OtpInput, Pagination, PasswordInput, Popover, Progress, RadarChart, RadialBars, RadialProgress, Radio, Resizable, ScatterChart, ScrollArea, SegmentedBar, Select, Separator, Sheet, Skeleton, Slider, Sparkline, Switch, THEMES, THEME_ACCENT_HUE, Table, Tabs, Textarea, ThemeProvider, TimelineBar, Toast, ToastProvider, Toggle, ToggleGroup, Tooltip, cn, icons_exports as icons, searchComponents, useSidebarCollapsed, useTheme, useToast };

//# sourceMappingURL=soft-ui-kit.js.map