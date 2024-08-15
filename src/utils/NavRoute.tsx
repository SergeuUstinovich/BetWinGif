import { NavType } from "../types/NavType";

export const navItems: NavType[] = [
  { path: "/static-banners", label: "Static Banners" },
  {
    path: "/git-banners",
    label: "Gif Banners",
    child: [
      {
        path: "/test",
      },
    ],
  },
  { path: "/settings", label: "Settings" },
];
