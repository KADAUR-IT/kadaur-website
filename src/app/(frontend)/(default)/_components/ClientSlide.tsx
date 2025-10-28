import React from "react";
import Image from "next/image";

export default function ClientSlide() {
    return(
        <div className='client-carousel'>
            <div className="client-slide">
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/airzoon.png"
                    width={245}
                />
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/logo-kadaur.png"
                    width={245}
                />
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/UNESCO.png"
                    width={245}
                />
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/la_palme_thiaisienne.png"
                    width={245}
                />
            </div>

            <div className="client-slide">
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/airzoon.png"
                    width={245}
                />
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/logo-kadaur.png"
                    width={245}
                />
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/UNESCO.png"
                    width={245}
                />
                <Image
                    alt="Client Logo"
                    height={64}
                    src="/api/media/file/la_palme_thiaisienne.png"
                    width={245}
                />
            </div>     
        </div>
    )
}