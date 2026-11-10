// src/@auth/AuthGuardRedirect.tsx (Cleaned: Ensured no side effects on every render)
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import CreateUtils from '@create/utils';
import {
    getSessionRedirectUrl,
    resetSessionRedirectUrl,
    setSessionRedirectUrl
} from '@create/core/CreateAuthorization/sessionRedirectUrl';
import { CreateRouteObjectType } from '@create/core/CreateLayout/CreateLayout';
import usePathname from '@create/hooks/usePathname';
import CreateLoading from '@create/core/CreateLoading';
import useNavigate from '@create/hooks/useNavigate';
import useUser from './useUser';

type AuthGuardProps = {
    auth: CreateRouteObjectType['auth'];
    children: React.ReactNode;
    loginRedirectUrl?: string;
};

function AuthGuardRedirect({ auth, children, loginRedirectUrl = '/' }: AuthGuardProps) {
    const { data: user, isGuest, isLoading } = useUser();
    const userRole = user?.role;
    const navigate = useNavigate();

    // The accessGranted state is crucial for holding the render until authorization is complete
    const [accessGranted, setAccessGranted] = useState<boolean>(false);
    const pathname = usePathname();

    // Function to handle redirection
    const handleRedirection = useCallback(() => {
        const redirectUrl = getSessionRedirectUrl() || loginRedirectUrl;

        // Redirect to sign-in if guest (unauthenticated)
        if (isGuest) {
            navigate('/sign-in');
        } else {
            // Redirect authenticated users to the saved URL
            navigate(redirectUrl);
            resetSessionRedirectUrl();
        }
    }, [isGuest, loginRedirectUrl, navigate]);

    // Check user's permissions and set access granted state
    useEffect(() => {
        // CRITICAL: If the session is loading, stop all logic and wait.
        if (isLoading) {
            setAccessGranted(false);
            return;
        }

        const isOnlyGuestAllowed = Array.isArray(auth) && auth.length === 0;
        const userHasPermission = CreateUtils.hasPermission(auth, userRole);
        const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404'];

        // SCENARIO 1: Access is granted (no auth required OR user has permission OR guest is allowed)
        if (!auth || (auth && userHasPermission) || (isOnlyGuestAllowed && isGuest)) {
            resetSessionRedirectUrl();
            setAccessGranted(true);
            return;
        }

        // SCENARIO 2: Access is denied
        if (!userHasPermission) {
            if (isGuest && !ignoredPaths.includes(pathname)) {
                // Unauthenticated guest on a protected path -> Redirect to login
                setSessionRedirectUrl(pathname);
                handleRedirection();
                return;
            } else if (!isGuest && !ignoredPaths.includes(pathname)) {
                // Authenticated member without permission -> Redirect to error page
                if (isOnlyGuestAllowed) {
                    setSessionRedirectUrl('/');
                } else {
                    setSessionRedirectUrl('/401');
                }
                handleRedirection();
                return;
            }
        }
        
        // Default Fallback: Assume access is not granted until explicitly confirmed by one of the success scenarios above
        // This ensures CreateLoading renders if something is missed or a redirect is pending.
        setAccessGranted(false);

    }, [auth, userRole, isGuest, pathname, isLoading, handleRedirection]);

    // Render the children only if access is granted, otherwise show loading state.
    // The useEffect above handles the redirection away from this component if access is denied.
    if (accessGranted) {
        return <>{children}</>;
    }
    
    // Show loading while waiting for session/auth checks to complete
    return <CreateLoading />;
}

export default AuthGuardRedirect;