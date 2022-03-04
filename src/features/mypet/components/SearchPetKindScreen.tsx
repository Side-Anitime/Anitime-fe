import React from 'react';
import {VStack, Input, Box, Divider} from 'native-base';

function SearchPetKindScreen() {
  return (
    <VStack
      my="4"
      space={5}
      w="100%"
      maxW="300px"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          borderWidth="0"
        />
      </VStack>
    </VStack>
  );
}

export default SearchPetKindScreen;
