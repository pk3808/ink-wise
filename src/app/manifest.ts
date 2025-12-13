import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pensieri.',
        short_name: 'Pensieri.',
        description: 'A sanctuary for thoughtful writing and deep reading.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f1e8d9ff', // bg-primary
        theme_color: '#fcfbf7',
        icons: [
            {
                src: '/splashicon.png',
                sizes: '162x162',
                type: 'image/png',
            },
            {
                src: '/splashicon.png',
                sizes: '192x192',
                type: 'image/png',
            },
        ],
    }
}
