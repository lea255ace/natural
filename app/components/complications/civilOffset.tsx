import { Box } from '@chakra-ui/react';
import { useAstrolabeContext } from 'context/astrolabeProvider';

export const Title = 'Civil Time Offset';
export function Display() {
    const astrolabe = useAstrolabeContext();
    
    return (
        <Box>{astrolabe.civilTimeOffsetMinutes()}</Box>
    );
}