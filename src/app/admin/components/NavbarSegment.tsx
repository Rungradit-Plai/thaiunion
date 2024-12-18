"use client";
import { useState } from "react";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFileAnalytics,
  IconFingerprint,
  IconKey,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconReceipt2,
  IconReceiptRefund,
  IconSettings,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
} from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faImage,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import { SegmentedControl, Text, Box } from "@mantine/core";
import classes from "./sidebar.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const tabs = [
  {
    link: "/admin/dashboard",
    label: "Dashboard",
    icon: faGaugeHigh,
  },
  {
    link: "/admin/splashimages",
    label: "Splash Images",
    icon: faDesktop,
  },
  //   { link: "", label: "Security", icon: IconFingerprint },
  //   { link: "", label: "SSH Keys", icon: IconKey },
  //   { link: "", label: "Databases", icon: IconDatabaseImport },
  //   { link: "", label: "Authentication", icon: Icon2fa },
  //   { link: "", label: "Other Settings", icon: IconSettings },
];

export function NavbarSegmented() {
  //   const [section, setSection] = useState<"account" | "general">("account");

  const [active, setActive] = useState("Dashboard");

  const links = tabs.map((item, index) => (
    <Link key={index} href={item.link} style={{ textDecoration: `none` }}>
      <Box
        className={classes.link}
        data-active={item.label === active || undefined}
        // href={item.link}
        key={item.label}
        onClick={() => {
          //   event.preventDefault();
          setActive(item.label);
        }}
      >
        <FontAwesomeIcon className={classes.linkIcon} icon={item.icon} />
        {/* <item.icon className={classes.linkIcon} stroke={1.5} /> */}
        <span>{item.label}</span>
      </Box>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
          Backoffices
        </Text>
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
