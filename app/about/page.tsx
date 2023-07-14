'use client';

// The MDX pageExtensions feature doesn't support the 'use client' directive, so we have to import the content
// into a client component skeleton page in order to get Chakra to function properly.
import About from './about.mdx';

export default function Page() {
    return <About />;
}