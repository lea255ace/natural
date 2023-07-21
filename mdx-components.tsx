import type { MDXComponents } from 'mdx/types';
import { Heading, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

const customComponents = {
    h1: ({children}) => <Heading as="h1" size='2xl'>{children}</Heading>,
    h2: ({children}) => <Heading as="h2" size='lg'>{children}</Heading>,
    p: ({children}) => <Text marginBottom='4'>{children}</Text>,
    a: ({href, children}) => <Link href={href} >{children}</Link>,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        ...customComponents
    };
}