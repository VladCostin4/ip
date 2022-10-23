import React, { useState } from 'react';

import * as yup from 'yup';

import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';

import {
  auth,
  db,
  doc,
  setDoc,
} from '../../config/firebase/firebase-key-config';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useKeyboard } from '../hooks/use-keyboard';
import UnderlinedInput from '../components/interface/UnderlinedInput';

const joinGameSchema = yup.object({
  name: yup.string().required('Name is required'),
});

export const RoomSettingsPage = ({ navigation, onClose }) => {
  const [isLoadingCreateRoom, setIsLoadingCreateRoom] = useState(false);
  const [name, setName] = useState('');
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const keyboardStatus = useKeyboard();

  const toast = useToast();
  const id = 'error-toasts';

  const resetFieldsErrors = () => {
    setIsInvalidName(true);

    setTimeout(() => {
      setIsInvalidName(false);
    }, 2500);
  };
  // generateRoomKey(4);

  const addPlayerName = async () => {
    const currenUserUID = auth.currentUser.uid;

    try {
      await setDoc(doc(db, `games/${keyCode}/players/${currenUserUID}`), {
        name: name,
        fake_id: name,
        no_of_votes: 0,
        score: 0,
        vote: -1,
        userNameColor: userNameColors[Math.floor(Math.random() * 7)],
      });

      return true;
    } catch (err) {
      console.log('Err: ', err);
      return false;
    }
  };

  const generateRoomKey = async (length) => {
    setIsLoadingCreateRoom(true);
    setIsDisabled(true);

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;

    const currentUser = auth.currentUser;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    try {
      await setDoc(doc(db, 'games', result), {
        game_admin_uid: currentUser.uid,

        round_number: 1,
      });

      await setDoc(doc(db, 'games', result, 'admin', 'gameState'), {
        is_game_ready: false,
        navToScore: false,
      });

      dispatch({
        type: 'ROOM_DATA',
        keyCode: result,
        game_admin_uid: currentUser.uid,
      });

      setIsLoadingCreateRoom(false);
      navigation.reset({
        routes: [{ name: 'Lobby' }],
      });
      setIsDisabled(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {
    joinGameSchema
      .isValid({
        name: name,
      })
      .then(async (isValid) => {
        if (isValid) {
          setIsLoading(true);

          const response = await addPlayerName();

          if (response) {
            onClose();
          } else {
            if (!toast.isActive(id)) {
              toast.show({
                id,
                duration: 2500,
                placement: 'top',
                render: () => {
                  return (
                    <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                      Something went wrong
                    </Box>
                  );
                },
              });
            }

            resetFieldsErrors();
          }

          setIsLoading(false);
        }
      });

    joinGameSchema.validate({ name: name }).catch((err) => {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          duration: 2500,
          placement: 'top',
          render: () => {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                {err.message}
              </Box>
            );
          },
        });
      }

      if (err.path === 'name') {
        setIsInvalidName(true);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center safeArea bg="primary1.500" h="100%" w="100%" position="relative">
        <Box px="4" w="full" justifyContent="center" alignItems="flex-start">
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
              navigation.navigate('Home');
            }}
          />
        </Box>

        <ScrollView w="full" h="full" px="10" pt="4">
          <Text
            fontSize="2xl"
            textAlign="center"
            fontFamily="RadioNewsman"
            color="black"
          >
            Create Game
          </Text>

          <VStack space={2} py="8">
            <Text
              fontFamily="RadioNewsman"
              color="white"
              fontWeight="semibold"
              fontSize="md"
            >
              Set your username:
            </Text>

            <UnderlinedInput
              placeholder="username"
              icon="person-outline"
              onChangeText={(value) => {
                setIsInvalidName(false);
                setName(value);
              }}
              isInvalid={isInvalidName}
            />
          </VStack>
        </ScrollView>

        <Box position="absolute" bottom={keyboardStatus ? '2' : '5'}>
          <Button
            w="full"
            bg="primary3.500"
            _pressed={{ bg: 'primary3.600' }}
            onPress={onSubmit}
            disabled={isLoading}
            isLoading={isLoading}
            _spinner={{ paddingY: '0.48' }}
          >
            <Text fontFamily="RadioNewsman" fontWeight="semibold" color="black">
              Create game
            </Text>
          </Button>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default RoomSettingsPage;

{
  /* <PresenceTransition
visible={isCreateGameSettings}
initial={{
  opacity: 0,
}}
animate={{
  opacity: 1,
  transition: {
    duration: 250,
  },
}}
>
<Actionsheet
  isOpen={isCreateGameSettings}
  onClose={() => {
    setIsCreateGameSettings(false);
  }}
>
  <Actionsheet.Content>
    <Actionsheet.Item>Option 1</Actionsheet.Item>
    <Actionsheet.Item>Option 2</Actionsheet.Item>
    <Actionsheet.Item>Option 3</Actionsheet.Item>
    <Actionsheet.Item color="red.500">Delete</Actionsheet.Item>
  </Actionsheet.Content>
</Actionsheet>
</PresenceTransition> */
}
