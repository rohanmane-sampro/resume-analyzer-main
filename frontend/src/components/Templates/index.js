// Templates Barrel Export
// This file provides a central point to import all resume templates

// Template Components
export { T1, T1Css } from './T1.jsx';
export { T2, T2Css } from './T2.jsx';
export { T3, T3Css } from './T3.jsx';
export { T4, T4Css } from './T4.jsx';
export { T5, T5Css } from './T5.jsx';
export { T6, T6Css } from './T6.jsx';
export { T7, T7Css } from './T7.jsx';

// Template Configuration
export const TEMPLATE_CONFIG = {
    1: { name: 'Classic Professional', component: 'T1', cssName: 'T1Css' },
    2: { name: 'Modern Minimal', component: 'T2', cssName: 'T2Css' },
    3: { name: 'Creative Designer', component: 'T3', cssName: 'T3Css' },
    4: { name: 'Executive Premium', component: 'T4', cssName: 'T4Css' },
    5: { name: 'Tech Starter', component: 'T5', cssName: 'T5Css' },
    6: { name: 'Simple Clean', component: 'T6', cssName: 'T6Css' },
    7: { name: 'Professional Developer', component: 'T7', cssName: 'T7Css' },
};

// Template Count
export const TOTAL_TEMPLATES = 7;
