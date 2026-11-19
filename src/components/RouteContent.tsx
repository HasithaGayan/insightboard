
import { useEffect, useRef } from "react";

import {
    Outlet,
    useLocation,
} from "react-router";

function RouteContent() {
    const { pathname } = useLocation();

    const contentRef =
        useRef<HTMLDivElement>(null);

    const previousPath =
        useRef(pathname);

    useEffect(() => {
        if (previousPath.current !== pathname) {
            previousPath.current = pathname;

            contentRef.current?.focus();
        }
    }, [pathname]);

    return (
        <div
            ref={contentRef}
            tabIndex={-1}
            role="region"
            aria-label="Page content"
        >
            <Outlet />
        </div>
    );
}

export default RouteContent;
