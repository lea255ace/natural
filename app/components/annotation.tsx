
import {
    chakra,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Portal,
} from '@chakra-ui/react';

export default function Annotation ({ trigger, body }) {
    return (
        <Popover placement='right-end' offset={[0, 6]}
            modifiers={[{ name: 'flip', options: { fallbackPlacements: ['bottom-end'] } }]}>
            <PopoverTrigger>
                <chakra.span textColor='purple.500' cursor='pointer'><sup>[<u>{trigger}</u>]</sup></chakra.span>
            </PopoverTrigger>
            <Portal>
                <PopoverContent width='auto' maxWidth='350px' p='0'
                    bg='yellow.50' borderRadius='4' borderColor='gray.400'
                    boxShadow='md'>
                    <PopoverBody fontSize='sm'>
                        {body}
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}