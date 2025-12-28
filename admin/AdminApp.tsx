/**
 * 管理員後台主入口
 */

import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RevenuePage from './pages/RevenuePage';
import CustomersPage from './pages/CustomersPage';
import MediaPage from './pages/MediaPage';
import CardsPage from './pages/CardsPage';
import EmailsPage from './pages/EmailsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import SettingsPage from './pages/SettingsPage';

const AdminApp: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <DashboardPage />;
            case 'analytics': return <AnalyticsPage />;
            case 'revenue': return <RevenuePage />;
            case 'customers': return <CustomersPage />;
            case 'media': return <MediaPage />;
            case 'cards': return <CardsPage />;
            case 'emails': return <EmailsPage />;
            case 'announcements': return <AnnouncementsPage />;
            case 'settings': return <SettingsPage />;
            default: return <DashboardPage />;
        }
    };

    return (
        <AdminLayout currentPage={currentPage} onNavigate={setCurrentPage}>
            {renderPage()}
        </AdminLayout>
    );
};

export default AdminApp;
