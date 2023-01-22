import {
  Heading,
  useToast,
  chakra,
  VStack,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  IconButton,
  Checkbox,
  Text,
  Button,
  ButtonGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMail, HiOutlineEyeOff } from "react-icons/hi";
import { HiLockClosed, HiOutlineEye, HiUser } from "react-icons/hi2";
import { useDispatch } from "react-redux";

import { useRegisterUserMutation } from "../../store/api";
import { loginUser } from "../../store/user-slice";
import ButtonLoader from "../shared/ButtonLoader";
import ErrorToast from "../shared/ErrorToast";
import SuccessToast from "../shared/SuccessToast";
import validate from "./registerValidators";

export default function RegisterForm({ redirectQuery, willRedirect }) {
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();

  const [
    mutateRegisterUser,
    { isLoading, isError, error, data: registerData, isSuccess, reset },
  ] = useRegisterUserMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
    validate,
    validateOnChange: false,
    onSubmit: ({ email, password, rememberMe, confirmPassword, name }) => {
      console.log("register");
      mutateRegisterUser({ name, email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        position: "top",
        render: () => (
          <SuccessToast message="ثبت نام شما با موفقیت انجام شد." />
        ),
      });

      dispatch(
        loginUser({
          userData: registerData,
          rememberMe: formik.values.rememberMe,
        })
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
    error,
    toast,
    formik.values.rememberMe,
    registerData,
    reset,
    dispatch,
  ]);

  const { touched, errors: formikErrors } = formik;

  return (
    <chakra.form
      w="full"
      id="register-form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      mb={2}
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
        ثبت نام
      </Heading>

      <VStack spacing={6} my={4} w="full">
        <FormControl maxW="md" isInvalid={touched.name && formikErrors.name}>
          <InputGroup>
            <Input
              type="text"
              placeholder="نام"
              variant="filled"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isDisabled={isLoading}
            />
            <InputRightElement>
              <Icon as={HiUser} boxSize={6} color="neutral.400" />
            </InputRightElement>
          </InputGroup>

          {touched.name && formikErrors.name && (
            <FormErrorMessage fontSize="xs" color="rose.400" ms={2}>
              {formikErrors.name}
            </FormErrorMessage>
          )}
        </FormControl>

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
              isDisabled={isLoading}
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
          form="register-form"
          colorScheme="brand"
          variant="solid"
          isLoading={isLoading}
          boxShadow="md"
          isDisabled={formikErrors.form}
          spinner={<ButtonLoader />}
        >
          ثبت نام
        </Button>

        <Button
          as={Link}
          href={
            willRedirect
              ? `/auth/login?redirect=${redirectQuery}`
              : "/auth/login"
          }
          type="button"
          colorScheme="indigo"
          variant="solid"
          boxShadow="md"
        >
          ورود
        </Button>
      </ButtonGroup>
    </chakra.form>
  );
}
