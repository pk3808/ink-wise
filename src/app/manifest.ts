import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pensieri.',
        short_name: 'Pensieri.',
        description: 'A sanctuary for thoughtful writing and deep reading.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fcfbf7', // bg-primary
        theme_color: '#fcfbf7',
        icons: [
            {
                src: '/inkwise.png',
                sizes: '19x19',
                type: 'image/png',
            },
            {
                src: '/inkwise.png',
                sizes: '12x12',
                type: 'image/png',
            },
        ],
    }
}
