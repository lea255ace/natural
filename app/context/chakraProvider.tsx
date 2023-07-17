'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme, theme as base } from '@chakra-ui/react';
import React from 'react';

const theme = extendTheme( {
    fonts: {
        heading: `Times New Roman, ${base.fonts?.heading}`,
        body: `Times New Roman, ${base.fonts?.body}`,
    },
    components: {
        Container: {
            variants: {
                outline: {
                    border: '2px',
                    borderRadius: '10px',
                    borderColor: 'gray.400',
                    p: '4'
                }
            }
        },
        Heading: {
            baseStyle: {
                marginTop: '8',
                marginBottom: '4'
            }
        },
        Button: {
            baseStyle: {
                fontWeight: 'normal',
                fontFamily: 'Arial',
            }
        },
        Link: {
            baseStyle: {
                textColor: 'purple.500',
                textDecoration: 'underline'
            }
        }
    }
});

export function UIProvider({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </CacheProvider>
    );
}