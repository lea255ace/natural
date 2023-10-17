import { Switch } from '@chakra-ui/react';
import { useAstrolabeContext } from 'context/astrolabeProvider';

export const Title = 'DST';
export function Display() {
    const astrolabe = useAstrolabeContext();
    return <Switch isChecked={astrolabe.isDaylightSavings()}/>;
}