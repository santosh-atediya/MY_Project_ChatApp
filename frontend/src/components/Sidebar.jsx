import {
  BellRing,
  Home,
  LogOutIcon,
  LucideMails,
  UserRound,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";

const Sidebar = () => {
  const { authenticatedUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <Home size={21} className="opacity-50" />,
    },
    {
      path: "/connections",
      label: "Connections",
      icon: <LucideMails size={21} className="opacity-50" />,
    },
    {
      path: "/notifications",
      label: "Notifications",
      icon: <BellRing size={21} className="opacity-50" />,
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <UserRound size={21} className="opacity-50" />,
    },
  ];

  return (
    <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64 pt-3">
      {/* Logo */}
      <Link to="/" className="flex gap-1 pl-3">
        <img src="/logo.png" alt="" height={34} width={34} />
        <span className="is-drawer-close:hidden text-3xl font-bold">
          <span>ingpong</span>
        </span>
      </Link>
      {/* Sidebar content here */}
      <ul className="menu w-full grow space-y-3 pt-10">
        {/* List item */}
        {navItems.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `${isActive ? "is-drawer-open:bg-base-200 text-info" : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3`
              }
              data-tip={link.label}
            >
              <span className="mb-1 mr-1 inline-block size-4">{link.icon}</span>
              <span className="is-drawer-close:hidden font-semibold">
                {link.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      {/* USER PROFILE */}
      <div className="dropdown dropdown-top dropdown-hover border border-base-300 bg-base-200 w-full">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-3 pl-1 m-1"
        >
          <img
            src={authenticatedUser?.image}
            alt="profileImg"
            height={43}
            width={43}
          />
          <h6 className="is-drawer-close:hidden capitalize">
            {authenticatedUser?.fullName}
          </h6>
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li className="disabled capitalize font-bold">
            <a>{authenticatedUser?.fullName}</a>
          </li>
          <li onClick={logoutMutation}>
            <a>
              Logout
              <LogOutIcon size={11} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
