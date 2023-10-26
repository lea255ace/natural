import { useAstrolabeContext } from 'context/astrolabeProvider';
import {
    VStack,
    Switch,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    Grid,
    GridItem,
    RangeSliderThumb
} from '@chakra-ui/react';

export const Title = 'DST';
export function Display() {
    const astrolabe = useAstrolabeContext();
    const dayOfYear = astrolabe.dayOfYear();
    const dstStartDay = astrolabe.dayOfYear(astrolabe.daylightSavingsStartDate());
    const dstEndDay = astrolabe.dayOfYear(astrolabe.daylightSavingsEndDate());

    return (
        <VStack width='150px' px='5px'>
            <Grid templateRows='1' templateColumns='1' width='100%'>
                <GridItem rowStart={1} colStart={1}>
                    <RangeSlider value={[dstStartDay,dstEndDay]} min={0} max={364} step={1}>
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} visibility='hidden' />
                        <RangeSliderThumb index={1} visibility='hidden' />
                    </RangeSlider>
                </GridItem>
                <GridItem rowStart={1} colStart={1}>
                    <RangeSlider value={[0,dayOfYear]} min={0} max={364} step={1}>
                        <RangeSliderTrack visibility='hidden'>
                            <RangeSliderFilledTrack visibility='hidden' />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} visibility='hidden' />
                        <RangeSliderThumb index={1} boxSize={2.5}/>
                    </RangeSlider>
                </GridItem>
            </Grid>
            <Switch isChecked={astrolabe.isDaylightSavings()}/>
        </VStack>
    );
}