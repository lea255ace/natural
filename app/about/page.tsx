'use client';

// The MDX pageExtensions feature doesn't support the 'use client' directive, so we have to import the content
// into a client component skeleton page in order to get Chakra to function properly.
import { Box } from '@chakra-ui/react';
import About from 'about/about.mdx';

export default function Page() {
    return <Box maxWidth='800px' mx='auto' px='8' py='2'>
        <About />
    </Box>;
}