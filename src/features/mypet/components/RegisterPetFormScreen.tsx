import React from 'react';
import {Radio, Stack, Input, FormControl, Button} from 'native-base';

function RegisterPetForm() {
  return (
    <FormControl>
      <Stack space={5}>
        <Stack>
          <FormControl.Label>이름</FormControl.Label>
          <Input variant="underlined" p={2} placeholder="" />
        </Stack>

        <Stack>
          <FormControl.Label>성별</FormControl.Label>

          <Radio.Group
            name="exampleGroup"
            defaultValue="1"
            accessibilityLabel="pick a size">
            <Stack
              direction="row"
              mb="2.5"
              mt="1.5"
              alignItems="center"
              space={4}
              w="70%"
              maxW="300px">
              <Radio value="1" colorScheme="green" size="md" my={1}>
                남아
              </Radio>
              <Radio value="2" colorScheme="green" size="md" my={1}>
                여아
              </Radio>
            </Stack>
          </Radio.Group>
        </Stack>

        <Stack>
          <FormControl.Label>생일</FormControl.Label>
          <Input variant="underlined" p={2} placeholder="" />
        </Stack>

        <Stack>
          <FormControl.Label>분양일</FormControl.Label>
          <Input variant="underlined" p={2} placeholder="" />
        </Stack>

        <Stack>
          <FormControl.Label>중성화 여부</FormControl.Label>
          <Radio.Group
            name="exampleGroup"
            defaultValue="1"
            accessibilityLabel="pick a size">
            <Stack
              direction="row"
              mb="2.5"
              mt="1.5"
              alignItems="center"
              space={4}
              w="70%"
              maxW="300px">
              <Radio value="1" colorScheme="green" size="md" my={1}>
                예
              </Radio>
              <Radio value="2" colorScheme="green" size="md" my={1}>
                아니오
              </Radio>
            </Stack>
          </Radio.Group>
        </Stack>

        <Stack>
          <FormControl.Label>품종</FormControl.Label>
          <Button variant="outline">품종 검색</Button>
        </Stack>

        <Stack>
          <Button>등록하기</Button>
        </Stack>
      </Stack>
    </FormControl>
  );
}

export default RegisterPetForm;
