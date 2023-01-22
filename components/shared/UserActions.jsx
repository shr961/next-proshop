import {
  Button,
  IconButton,
  Popover,
  PopoverFooter,
  PopoverTrigger,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  Text,
  PopoverBody,
  List,
  ListItem,
  Link as ChLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HiUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";

export default function UserActions({
  show,
  mutateLogoutUser,
  isLoadingLogout,
}) {
  const userState = useSelector((state) => state.user);
  const { userData } = userState;

  const router = useRouter();

  return show ? (
    <Popover offset={[-64, 12]}>
      <PopoverTrigger>
        <IconButton variant="ghost" colorScheme="brand">
          <Icon as={HiUserCircle} boxSize={8} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent
        rounded="xl"
        px={2}
        w="250px"
        borderColor="neutral.300"
        boxShadow="md"
      >
        <PopoverArrow bg="neutral.400" />
        <PopoverHeader
          py={4}
          display="flex"
          alignItems="center"
          justifyContent="start"
          borderColor="neutral.200"
        >
          <Text fontSize="sm">سلام</Text>

          <Text color="brand.600" fontSize="sm" fontWeight="bold" ms={2}>
            {userData?.name}
          </Text>
        </PopoverHeader>
        <PopoverBody py={2} borderColor="neutral.200">
          <List spacing={2}>
            <ListItem>
              <ChLink as={Link} href="/profile" fontSize="sm">
                پروفایل
              </ChLink>
            </ListItem>

            <ListItem>
              <ChLink as={Link} href="/orders" fontSize="sm">
                سفارش ها
              </ChLink>
            </ListItem>
          </List>
        </PopoverBody>

        <PopoverFooter
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={4}
        >
          <Button
            variant="ghost"
            colorScheme="rose"
            onClick={() => {
              router.push({ query: { action: "user_logout" } }, undefined, {
                shallow: true,
              });
              mutateLogoutUser();
            }}
            rounded="xl"
            isLoading={isLoadingLogout}
            size="sm"
          >
            خروج
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ) : null;
}
