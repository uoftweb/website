import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export function useShare({ title, url, text }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value] = useState(url);
  const { onCopy, hasCopied } = useClipboard(value);

  function share() {
    if (navigator.share) {
      navigator
        .share({
          title,
          url,
          text,
        })
        .then(() => console.log(`Successfully shared ${title}`))
        .catch(console.error);
    } else {
      onOpen();
    }
  }

  function ShareModal() {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Share
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} mb={4}>
              <Text>
                Copy the link for this item to your clipboard and share it
                wherever you like:
              </Text>
              <Flex>
                <Input value={value} isReadOnly placeholder="Welcome" />
                <Button colorScheme="blue" onClick={onCopy} ml={2}>
                  {hasCopied ? "Copied" : "Copy"}
                </Button>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return {
    share,
    ShareModal,
  };
}
