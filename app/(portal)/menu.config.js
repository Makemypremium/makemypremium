import {
  Grid2X2,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users2,
} from "lucide-react";

export const menuItems = [
  {
    title: "Apps",
    path: "/apps",
    Icon: Grid2X2,
    accesss: ["ADMIN"],
  },
  {
    title: "Browse",
    path: "/browse",
    Icon: ShoppingCart,
    accesss: ["USER"],
  },
  {
    title: "Orders",
    path: "/orders",
    Icon: Package,
    accesss: ["USER", "ADMIN"],
  },
  {
    title: "Users",
    path: "/users",
    Icon: Users2,
    accesss: ["ADMIN"],
  },
];
