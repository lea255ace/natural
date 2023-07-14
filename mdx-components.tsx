import type { MDXComponents } from 'mdx/types';
import { Heading } from '@chakra-ui/react';

const customComponents = {
    h1: ({children}) => <Heading as="h1" size='2xl'>{children}</Heading>,
    h2: ({children}) => <Heading as="h2" size='xl'>{children}</Heading>
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        ...customComponents
    };
}