import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...styles: ClassValue[]) => twMerge(clsx(styles));
