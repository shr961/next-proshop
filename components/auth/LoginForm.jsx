import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  chakra,
  Checkbox,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Icon,
  useToast,
  ButtonGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiOutlineEye, HiOutlineEyeOff, HiMail } from "react-icons/hi";
import { useDispatch } from "react-redux";

import validate from "./loginValidators";
import SuccessToast from "../shared/SuccessToast";
import ErrorToast from "../shared/ErrorToast";
import { loginUser } from "../../store/user-slice";
import { useAuthenticateUserMutation } from "../../store/api";
import ButtonLoader from "../shared/ButtonLoader";

export default function LoginForm({ redirectQuery, willRedirect }) {
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();

  const [
    mutateAuthUser,
    { isError, isSuccess, isLoading, error, data: loginData, reset },
  ] = useAuthenticateUserMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate,
    validateOnChange: false,
    onSubmit: ({ email, password, rememberMe }) => {
      mutateAuthUser({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        position: "top",
        render: () => <SuccessToast message="با موفقیت وارد شدید." />,
      });

      dispatch(
        loginUser({ userData: loginData, rememberMe: formik.values.rememberMe })
      );

      reset();
    }

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

    return () => {
      reset();
    };
  }, [
    isSuccess,
    isError,
    loginData,
    error,
    formik.values.rememberMe,
    toast,
    reset,
    dispatch,
  ]);

  const { touched, errors: formikErrors } = formik;

  return (
    <chakra.form
      w="full"
      id="login-form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      h="full"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading
        as="h2"
        bgGradient="linear(to-l, #00B5D8, #805AD5)"
        bgClip="text"
        fontSize="xl"
        textAlign="center"
      >
        ورود به حساب
      </Heading>

      <VStack spacing={6} w="full">
        <FormControl maxW="md" isInvalid={touched.email && formikErrors.email}>
          <InputGroup>
            <Input
              type="email"
              placeholder="پست الکترونیک"
              variant="filled"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isDisabled={isLoading}
            />
            <InputRightElement>
              <Icon as={HiMail} boxSize={6} color="neutral.400" />
            </InputRightElement>
          </InputGroup>

          {touched.email && formikErrors.email && (
            <FormErrorMessage fontSize="xs" color="rose.400" ms={2} mt={3}>
              {formikErrors.email}
            </FormErrorMessage>
          )}
        </FormControl>

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
              isDisabled={isLoading}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
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

        <FormControl maxW="md">
          <Checkbox
            colorScheme="green"
            name="rememberMe"
            isChecked={formik.values.rememberMe}
            onChange={formik.handleChange}
            isDisabled={isLoading}
            ms={1}
          >
            <Text fontSize={{ base: "xs", md: "sm" }}>مرا به خاطر بسپار</Text>
          </Checkbox>
        </FormControl>
      </VStack>

      <ButtonGroup>
        <Button
          type="submit"
          form="login-form"
          colorScheme="brand"
          variant="solid"
          isLoading={isLoading}
          boxShadow="md"
          isDisabled={formikErrors.form}
          spinner={<ButtonLoader />}
        >
          ورود
        </Button>

        <Button
          as={Link}
          href={
            willRedirect
              ? `/auth/register?redirect=${redirectQuery}`
              : "/auth/register"
          }
          type="button"
          colorScheme="indigo"
          variant="solid"
          boxShadow="md"
        >
          ثبت نام
        </Button>
      </ButtonGroup>
    </chakra.form>
  );
}
