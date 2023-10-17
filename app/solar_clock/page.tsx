'use client';

import {
    Box,
    Flex,
    Heading,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import Clock from 'components/clock';
import { AstrolabeProvider } from 'context/astrolabeProvider';
import { useState } from 'react';
import * as Complications from 'components/complications';

function ComplicationDisplay() {
    const complicationsList = [
        Complications.EqTime,
    ];

    return (
        <Wrap>
            {complicationsList.map((Complication, index) =>
                <WrapItem key={index}>
                    < Complication />
                </WrapItem>)
            }
        </Wrap>
    );
}

export default function SolarClock() {
    //TODO(MW): Push these down into client components
    const [currentDay, setCurrentDay] = useState(50);
    const [currentTimeMinutes, setCurrentTimeMinutes] = useState(720);

    const date = new Date();
    date.setMonth(0, 1);
    date.setDate(date.getDate() + currentDay);
    date.setHours(currentTimeMinutes / 60, currentTimeMinutes % 60);

    return (
        <AstrolabeProvider date={date}>
            <Box width='100%' px='5%' marginTop='2em'>
                <Slider
                    id="currentDay"
                    defaultValue={50}
                    min={0}
                    max={364}
                    onChange={(v) => setCurrentDay(v)}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <Text fontWeight='bold' marginBottom='1.5em'>Day of Year</Text>
                <Slider
                    id="currentTime"
                    defaultValue={720}
                    min={0}
                    max={1440 - 1}
                    onChange={(v) => setCurrentTimeMinutes(v)}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <Text fontWeight='bold'>Time of Day</Text>
            </Box>
            <Flex gap='2'>
                <Box minWidth='500px' flex='1'>
                    <Clock />
                </Box>
                <VStack align='start' flex='1'>
                    <Heading as='h2' size='lg'>Complications</Heading>
                    <ComplicationDisplay />
                </VStack>
            </Flex>
        </AstrolabeProvider>
    );
}