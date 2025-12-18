
import React, { ReactNode } from "react";
import '@/styles/global.css'
import { getPayload } from "payload";
import config from '@payload-config'
import NavbarLink, { Link } from "./Navbar/NavbarLink";
import NavbarClient from "./Navbar/NavbarClient";
import { headers } from "next/headers";
import { adminAuthClient } from "@/utils/auth/auth";

export default async function Navbar() {
  const payload = await getPayload( {config} );

  const res = await payload.findGlobal({
    slug : "navbarLinks"
  })

  const session = await adminAuthClient.getSession({
      headers: await headers()
  })

  const isAuth = !session.isError

  const links = res.links;
  
  let mappedLinks : ReactNode[] = []

  if(links) {
    mappedLinks = links.map( (link) => {
        return (
          <NavbarLink key={link.id} link={link as Link} />
        )
      } )
  }
  


    return (
        <div className='navbar-wrapper'>
            <NavbarClient mappedLinks={mappedLinks} isAuth={isAuth} />
          </div>
    )
}