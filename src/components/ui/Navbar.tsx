import React from "react";
import Image from "next/image";
import '@/styles/global.css'

export default function Navbar() {

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-container'>
              <div className='kadaur-logo'>
                <Image
                  alt="Kadaur Logo"
                  height={64}
                  src="/api/media/file/logo-kadaur.png"
                  width={245}
                />
              </div>
              <div className='navbar-links'>
                <a>Link 1</a>
                <a>Link 2</a>
                <a>Link 3</a>
                <button className='navbar-button'>Contact Us</button>
              </div>
            </div>
            <div className='subnavbar-container hide'>
              <div className='navbar-links'>
                <a>Link 1</a>
                <a>Link 2</a>
                <a>Link 3</a>
              </div>
            </div>
          </div>
    )
}