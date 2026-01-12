import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Projeto Resistência VLE',
        short_name: 'Resistência',
        description: 'Ambiente Virtual de Aprendizagem Gamificado do Tocantins',
        start_url: '/',
        display: 'standalone',
        background_color: '#1b2d34',
        theme_color: '#6a3c31',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
