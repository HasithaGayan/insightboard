"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function PageFocus({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const previousPath = useRef(pathname);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousPath.current !== pathname) {
            previousPath.current = pathname;
            contentRef.current?.focus();
        }
    }, [pathname]);

    return (
        <div ref={contentRef} tabIndex={-1} role="region" aria-label="Page content">
            {children}
        </div>
    );
}
