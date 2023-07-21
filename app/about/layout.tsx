'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

export default function SubPageLayout({ children }) {
    return (
        <>
            <Breadcrumb bg='gray.300' py='2' paddingLeft='4'>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>About</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>           
            {children}
        </>
    );
}