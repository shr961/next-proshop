import {
  Button,
  chakra,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useUpdateUserProfileMutation } from "../../store/api";
import ErrorToast from "../shared/ErrorToast";
import SuccessToast from "../shared/SuccessToast";
import EditableControls from "./EditableControls";
import ButtonLoader from "../shared/ButtonLoader";
import { updateUserData } from "../../store/user-slice";

export default function EditProfileForm({
  userProfileData,
  refetchUserProfile,
}) {
  const toast = useToast();
  const dispatch = useDispatch();

  const [
    mutateUpdateProfile,
    { isSuccess, isError, isLoading, error, data: updatedProfile, reset },
  ] = useUpdateUserProfileMutation();

  const formik = useFormik({
    initialValues: {
      name: userProfileData?.name || "",
      email: userProfileData?.email || "",
    },
    onSubmit: ({ name, email }) => {
      const updatedValues = {};

      if (email && email !== userProfileData.email) {
        updatedValues.email = email;
      }

      if (name && name !== userProfileData.name) {
        updatedValues.name = name;
      }

      mutateUpdateProfile(updatedValues);
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        position: "top",
        render: () => (
          <ErrorToast
            message={error?.data?.message || error?.message || error?.error}
          />
        ),
      });

      reset();
    }

    if (isSuccess) {
      toast({
        position: "top",
        render: () => (
          <SuccessToast message="پروفایل با موفقیت بروزرسانی شد." />
        ),
      });

      dispatch(updateUserData(updatedProfile));
      reset();

      refetchUserProfile();
    }
  }, [
    toast,
    refetchUserProfile,
    dispatch,
    reset,
    updatedProfile,
    isSuccess,
    isError,
    error,
  ]);

  const { dirty: formIsDirty } = formik;

  return (
    <chakra.form
      w="full"
      id="login-form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={6} w={{ base: "full", md: "90%" }} align="center">
        <Heading
          as="h2"
          bgGradient="linear(to-l, #00B5D8, #805AD5)"
          bgClip="text"
          fontSize="xl"
          textAlign="center"
        >
          اطلاعات حساب
        </Heading>
        x``
        <Editable
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          w={{ base: "full", sm: "90%" }}
          bg="white"
          boxShadow="md"
          rounded="xl"
          p={4}
          isPreviewFocusable={false}
          defaultValue={formik.initialValues.name}
          value={formik.values.name}
          onChange={(value) => {
            formik.setFieldValue("name", value);
          }}
          submitOnBlur={false}
        >
          <HStack w="full" spacing={1} mb={{ base: 2, sm: 0 }}>
            <Heading
              as="h4"
              fontSize={{ base: "xs", sm: "sm" }}
              color="brand.600"
              me={2}
            >
              نام:
            </Heading>

            <EditablePreview fontSize={{ base: "xs", sm: "sm" }} />
            <EditableInput
              type="text"
              fontSize={{ base: "xs", sm: "sm" }}
              name="name"
              rounded="xl"
              boxShadow="md"
            />
          </HStack>

          <EditableControls />
        </Editable>
        <Editable
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          w={{ base: "full", sm: "90%" }}
          bg="white"
          boxShadow="md"
          rounded="xl"
          py={4}
          px={2}
          isPreviewFocusable={false}
          defaultValue={formik.initialValues.email}
          value={formik.values.email}
          onChange={(value) => {
            formik.setFieldValue("email", value);
          }}
          submitOnBlur={false}
        >
          <HStack w="full" spacing={1} mb={{ base: 2, sm: 0 }}>
            <Heading
              as="h4"
              fontSize={{ base: "xs", sm: "sm" }}
              color="brand.600"
              me={2}
            >
              پست الکترونیک:{" "}
            </Heading>

            <EditablePreview fontSize={{ base: "xs", sm: "sm" }} />
            <EditableInput
              type="text"
              fontSize={{ base: "xs", sm: "sm" }}
              name="name"
              rounded="xl"
              boxShadow="md"
            />
          </HStack>

          <EditableControls />
        </Editable>
        <Button
          type="submit"
          colorScheme="brand"
          fontSize="sm"
          isLoading={isLoading}
          isDisabled={!formIsDirty}
          spinner={<ButtonLoader />}
        >
          اعمال ویرایش
        </Button>
      </VStack>
    </chakra.form>
  );
}
