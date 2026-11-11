import Image from "next/image";

// Colourful 3D icons from Microsoft's Fluent Emoji set (MIT licence — see
// public/icons/LICENSE-fluentui-emoji.txt), self-hosted in /public/icons and
// resized/converted to WebP by next/image.
export type IconName =
  | "sparkles" | "scissors" | "robot" | "megaphone" | "desktop" | "laptop" | "search"
  | "movie-camera" | "money-bag" | "rocket" | "calendar" | "camera" | "shield" | "mobile"
  | "light-bulb" | "bar-chart" | "chart-up" | "speech" | "gear" | "gem" | "star" | "check"
  | "pound" | "lipstick" | "memo" | "handshake" | "pin" | "picture" | "hourglass" | "locked"
  | "wrench" | "tools" | "envelope" | "thinking" | "heart" | "bubbles" | "lotus" | "mirror"
  | "clipboard" | "spiral-calendar" | "link" | "paintbrush" | "puzzle" | "trophy";

/** Decorative by default (empty alt); the surrounding text names the item. */
export function ColorIcon({
  name,
  size = 44,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={`/icons/${name}.png`}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`select-none drop-shadow-sm ${className}`}
      draggable={false}
    />
  );
}

/** Icon on a soft tinted tile, used at the top of feature cards. */
export function IconTile({ name, tint = "#e0f2fe" }: { name: IconName; tint?: string }) {
  return (
    <span
      className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform sm:h-14 sm:w-14 sm:rounded-2xl duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100"
      style={{ background: `linear-gradient(135deg, ${tint}, #ffffff)` }}
    >
      <ColorIcon name={name} size={36} className="h-7 w-7 sm:h-9 sm:w-9" />
    </span>
  );
}
