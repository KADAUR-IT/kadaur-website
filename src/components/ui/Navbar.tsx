
import React, { ReactNode, useState } from "react";
import '@/styles/global.css'
import { getPayload } from "payload";
import config from '@payload-config'
import NavbarLink, { Link } from "./Navbar/NavbarLink";
import NavbarClient from "./Navbar/NavbarClient";
import { headers } from "next/headers";

export default async function Navbar() {
  const payload = await getPayload( {config} );

  const res = await payload.find({
    collection : "navbarLinks", 
    limit : 1
  })

  const user = await payload.auth({ headers: await headers(), canSetHeaders: false });

  const links = res.docs[0].links;
  
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
            <NavbarClient mappedLinks={mappedLinks} isAuth={!!user.user} />
          </div>
    )
}