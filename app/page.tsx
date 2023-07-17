'use client';

import { Link } from '@chakra-ui/next-js';
import {
    Container,
    Text,
    Heading,
    UnorderedList,
    ListItem,
    VStack,
    Stack
} from '@chakra-ui/react';

export default function Home() {
    return (
        <VStack mx='4' my='4'>
            <Heading as='h1' size='2xl'>Natural Time</Heading>
            <Stack spacing='8' direction={['column', null, 'row']}>
                <Container variant='outline' maxWidth={['430px', null, '500px']}>
                    <Heading as='h3' size='md' marginTop='0'>About</Heading>
                    <Text>
                        Natural time is an ongoing attempt to re-frame the way I think about time,
                        and to better connect the passage of time with the motion of the Sun, Moon, and stars,
                        from which it was originally derived.
                    </Text>
                    <br />
                    <Text>You can find a more detailed overview on the <Link href='/about'>About page</Link>.</Text>
                </Container>
                <Container variant='outline' maxWidth={['275px']}>
                    <Heading as='h3' size='md' marginTop='0'>Links</Heading>
                    <Text>Check out the following links to explore the available tools!</Text>
                    <UnorderedList listStylePos='inside' marginTop='2'>
                        <ListItem><Link href='/dashboard' fontFamily='mono'>Dashboard</Link></ListItem>
                        <ListItem><Link href='/solar_clock' fontFamily='mono'>Solar Clock</Link></ListItem>
                    </UnorderedList>
                </Container>
            </Stack>
        </VStack>
    );
}