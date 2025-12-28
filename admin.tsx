/**
 * 管理員後台入口頁面
 * 訪問 /admin.html 即可進入
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './admin/AdminApp';

// 渲染管理員後台
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <AdminApp />
        </React.StrictMode>
    );
}
