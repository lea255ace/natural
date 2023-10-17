import { Box } from '@chakra-ui/react';
import { useAstrolabeContext } from 'context/astrolabeProvider';

export default function CivilOffset() {
    const astrolabe = useAstrolabeContext();
    
    return (
        <Box>{astrolabe.civilTimeOffsetMinutes()}</Box>
    );
}