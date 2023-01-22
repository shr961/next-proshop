import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
  Icon,
  ButtonGroup,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useDispatch } from "react-redux";

import {
  useLogoutUserMutation,
  useUpdateUserProfileMutation,
} from "../../store/api";
import { logoutUser } from "../../store/user-slice";
import ButtonLoader from "../shared/ButtonLoader";
import ErrorToast from "../shared/ErrorToast";
import SuccessToast from "../shared/SuccessToast";
import validate from "./passwordValidators";
import generatePassword from "../../utils/generatePassword";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const [
    mutateUpdateProfile,
    {
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      isLoading: isLoadingUpdate,
      error: errorUpdate,
      data: updatedProfile,
      reset: resetUpdate,
    },
  ] = useUpdateUserProfileMutation();

  const [
    mutateLogoutUser,
    {
      isSuccess: isSuccessLogout,
      isError: isErrorLogout,
      isLoading: isLoadingLogout,
      error: errorLogout,
      reset: resetLogoutMutation,
    },
  ] = useLogoutUserMutation();

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validate,
    validateOnChange: false,
    onSubmit: ({ password, confirmPassword }) => {
      mutateUpdateProfile({ password });
    },
  });

  const {
    dirty: formIsDirty,
    setFieldValue,
    touched,
    errors: formikErrors,
  } = formik;

  useEffect(() => {
    if (isErrorUpdate) {
      toast({
        position: "top",
        render: () => (
          <ErrorToast
            message={
              errorUpdate?.data?.message ||
              errorUpdate?.message ||
              errorUpdate?.error
            }
          />
        ),
      });

      resetUpdate();
    }

    if (isSuccessUpdate) {
      toast({
        position: "top",
        render: () => (
          <SuccessToast message="رمز عبور با موفقیت بروزرسانی شد. برای ادامه، لطفا با رمز عبور جدید خود وارد شوید." />
        ),
      });

      // logout user
      mutateLogoutUser();
      resetUpdate();
    }
  }, [
    toast,
    resetUpdate,
    mutateLogoutUser,
    isSuccessUpdate,
    isErrorUpdate,
    errorUpdate,
  ]);

  useEffect(() => {
    let logoutTimer;

    if (isErrorLogout) {
      toast({
        position: "top",
        render: () => (
          <ErrorToast
            message={
              errorLogout?.data?.message ||
              errorLogout?.message ||
              errorLogout?.error
            }
          />
        ),
      });

      resetLogoutMutation();
    }

    if (isSuccessLogout) {
      dispatch(logoutUser());
      resetLogoutMutation();

      logoutTimer = setTimeout(() => {
        router.push("/auth/login?redirect=/profile");
      }, 1000);
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [
    toast,
    resetLogoutMutation,
    dispatch,
    errorLogout,
    isSuccessLogout,
    isErrorLogout,
    router,
  ]);

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
      <VStack spacing={6} w="full" align="center">
        <Heading
          as="h2"
          bgGradient="linear(to-l, #00B5D8, #805AD5)"
          bgClip="text"
          fontSize="xl"
          textAlign="center"
        >
          تغییر رمز عبور
        </Heading>

        <FormControl
          maxW="md"
          isInvalid={touched.password && formikErrors.password}
        >
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              variant="filled"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isDisabled={isLoadingUpdate}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <Icon
                  boxSize={6}
                  color="neutral.400"
                  as={showPassword ? HiOutlineEye : HiOutlineEyeOff}
                />
              </IconButton>
            </InputRightElement>
          </InputGroup>

          {touched.password && formikErrors.password && (
            <FormErrorMessage fontSize="xs" color="rose.400" ms={2} mt={3}>
              {formikErrors.password}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          maxW="md"
          isInvalid={touched.confirmPassword && formikErrors.confirmPassword}
        >
          <InputGroup>
            <Input
              type="password"
              placeholder="تکرار رمز عبور"
              variant="filled"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isDisabled={isLoadingUpdate}
            />
            <InputRightElement>
              <Icon as={HiLockClosed} boxSize={6} color="neutral.400" />
            </InputRightElement>
          </InputGroup>

          {touched.confirmPassword && formikErrors.confirmPassword && (
            <FormErrorMessage fontSize="xs" color="rose.400" ms={2} mt={3}>
              {formikErrors.confirmPassword}
            </FormErrorMessage>
          )}
        </FormControl>

        <ButtonGroup>
          <Button
            type="button"
            colorScheme="amber"
            fontSize="sm"
            onClick={() => {
              const newPassword = generatePassword();

              setFieldValue("password", newPassword);
              setFieldValue("confirmPassword", newPassword);
            }}
          >
            ایجاد رمز عبور
          </Button>

          <Button
            type="submit"
            colorScheme="brand"
            fontSize="sm"
            isLoading={isLoadingUpdate}
            isDisabled={!formIsDirty || formikErrors.form}
            spinner={<ButtonLoader />}
          >
            اعمال ویرایش
          </Button>
        </ButtonGroup>
      </VStack>
    </chakra.form>
  );
}
