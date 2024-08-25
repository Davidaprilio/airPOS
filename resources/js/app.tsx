import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { RecoilRoot } from 'recoil';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        if (import.meta.env.DEV) {
            createRoot(el).render(
                <RecoilRoot>
                    <App {...props} />
                </RecoilRoot>
            );
            return
        }

        hydrateRoot(el, (
            <RecoilRoot>
                <App {...props} />
            </RecoilRoot>
        ));
    },
    progress: {
        color: '#4B5563',
    },
});
