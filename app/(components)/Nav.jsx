"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

const Nav = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isUser = !!session?.user;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleLogin = () => {
    signIn(null, { callbackUrl: `${window.location.origin}/` });
  };


  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit" href="/">Lets Bummel</p>
      </NavbarBrand>

      {isUser && (
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/Kalender">
            Kalender
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Member" aria-current="page" color="secondary">
            Member
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      )}
   

      {isUser ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                src={session?.user.image}
                isBordered
                as="button"
                alt="profile"
                color="secondary"
                name={session?.user.name || 'User'}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session?.user.name}</p>
              </DropdownItem>
              <DropdownItem href="/">Home</DropdownItem>
              <DropdownItem href="/Kalender">Kalender</DropdownItem>
              <DropdownItem href="/Verbindung">Verbindungen</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem color="danger" onClick={handleLogout}>Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <Button color="primary" auto flat onClick={handleLogin}>Login</Button>
      )}
    </Navbar>
  );
}

export default Nav;
