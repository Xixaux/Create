// src/@auth/authRoles.ts (FINAL, ROBUST VERSION)

/**
 * The authRoles object defines the authorization roles for the Create application.
 * Roles must be in lowercase.
 * Exported as a NAMED EXPORT for module stability.
 */
export const authRoles = {
    /**
     * The admin role grants access to users with the 'admin' role.
     */
    admin: ['admin'],

    /**
     * The staff role grants access to users with the 'admin' or 'staff' role.
     */
    staff: ['admin', 'staff'],

    /**
     * The user role grants access to users with the 'admin', 'staff', or 'user' role.
     * This array defines ALL roles that grant base authenticated access (i.e., NOT a guest).
     */
    user: ['admin', 'staff', 'user'],

    /**
     * The onlyGuest role grants access to unauthenticated users.
     */
    onlyGuest: []
};


/*
/**
 * The authRoles object defines the authorization roles for the Create application.
 
const authRoles = {
    /**
     * The admin role grants access to users with the 'admin' role.
     
    admin: ['admin'],

    /**
     * The staff role grants access to users with the 'admin' or 'staff' role.
     
    staff: ['admin', 'staff'],

    /**
     * The user role grants access to users with the 'admin', 'staff', or 'user' role.
     
    user: ['admin', 'staff', 'user'],

    /**
     * The onlyGuest role grants access to unauthenticated users.
     
    onlyGuest: []
};

export default authRoles;
*/