import { Text, Icon, IconButton, Flex, HStack, VStack, Box } from 'native-base';

import React, { useState, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';

export const Rules = ({ navigation }) => {
  const [page, setPage] = useState(1);

  return (
    <Flex safeArea bg="primary1.500" h="100%" w="100%" alignItems="center">
      <HStack
        px="4"
        w="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <IconButton
          icon={<Icon as={<Ionicons name="arrow-back-outline" />} />}
          borderRadius="full"
          _icon={{
            color: 'white',
            size: '8',
          }}
          _pressed={{
            bg: 'primary3.600',
          }}
          onPress={() => {
            navigation.reset({
              routes: [{ name: 'Home' }],
            });
          }}
        />
      </HStack>

      <VStack p="5" justifyContent="center" alignItems="center" m="auto">
        {page == 1 ? (
          <Text color="white" fontSize="20" textAlign="center">
            You are going to play a three round game, in which you will chat
            with your fellow players, but there's a catch. There are two types
            of players, rats and cats.
          </Text>
        ) : null}

        {page == 2 ? (
          <Text color="white" fontSize="20" textAlign="center">
            Each round, half of the players will have to impersonate someone
            from the lobby. They will have assigned the rat role, and appear
            with a different name while chatting with the others. A text will
            appear in the top right of your screen saying 'Playing as ..',
            insert name of another rat player.
          </Text>
        ) : null}

        {page == 3 ? (
          <Text color="white" fontSize="20" textAlign="center">
            If you are not part of the chosen few, fear not, because you have
            the cat role. Your mission as cats is to try and catch the impostors
            among you. You can do that by carefully reading the messages that
            players write, if you think that someone said something that they
            wouldn't normally say.
          </Text>
        ) : null}

        {page == 4 ? (
          <Text color="white" fontSize="20" textAlign="center">
            The rats get points by fooling the others and having as little
            players as possible vote for the, whereas the cats get points by
            correctly voting out the rats.
          </Text>
        ) : null}

        {page == 5 ? (
          <Text color="white" fontSize="20" textAlign="center">
            Good luck!
          </Text>
        ) : null}
      </VStack>

      <HStack
        px="4"
        py="4"
        w="full"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        {page > 1 ? (
          <IconButton
            icon={<Icon as={<Ionicons name="arrow-undo" />} />}
            borderRadius="full"
            _icon={{
              color: 'white',
              size: '8',
            }}
            _pressed={{
              bg: 'primary3.600',
            }}
            onPress={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        ) : (
          <Box w="12"></Box>
        )}

        <Text color="white" fontSize="20" alignItems="center" pb="2">
          {page} / 5
        </Text>

        {page < 5 ? (
          <IconButton
            icon={<Icon as={<Ionicons name="arrow-redo" />} />}
            borderRadius="full"
            _icon={{
              color: 'white',
              size: '8',
            }}
            _pressed={{
              bg: 'primary3.600',
            }}
            onPress={() => {
              if (page < 5) {
                setPage(page + 1);
              }
            }}
          />
        ) : (
          <Box w="12"></Box>
        )}
      </HStack>
    </Flex>
  );
};

export default Rules;
