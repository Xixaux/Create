'use client';

// Keep the core React function import
import React from 'react';

// Keep only the necessary RTK Query hook for the component to resolve the imports
import { useDeleteNotificationMutation, useGetAllNotificationsQuery } from './NotificationApi';

// Mock the return of the data fetching hook to immediately return data and stop loading
function useMockGetAllNotificationsQuery() {
    return { data: [], isLoading: false };
}

/**
 * The minimal, blank NotificationsApp component.
 */
function NotificationsApp() {
    // Keep the mutation call to ensure its import is satisfied, but it's unused
    const [deleteNotification] = useDeleteNotificationMutation();

    // Use the mock hook instead of the real one to bypass the loading state
    const { data: notifications, isLoading } = useMockGetAllNotificationsQuery();

    // We can remove the handleDismiss function as it's not used when returning null
    // We can remove the if (isLoading) check since our mock is always false

    // Return a blank component that renders nothing
    return null;
}

export default NotificationsApp;