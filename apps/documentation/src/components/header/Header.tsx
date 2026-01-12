import { Home, Info } from "lucide-react";
import { FloatingNav } from "../ui/floating-navbar";
import { memo } from "react";

export const Header = memo(() => {
  return (
    <FloatingNav
      navItems={[
        {
          name: "Home",
          link: "/",
          icon: <Home />,
        },
        {
          name: "About",
          link: "/about",
          icon: <Info />,
        },
      ]}
    />
  );
});

Header.displayName = "Header";
