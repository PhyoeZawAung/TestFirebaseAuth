import {
  Text, View, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const registerValidationSchema = Yup.object().shape({

  firstName: Yup
    .string()
    .max(20, 'Name is too long')
    .required("First name is required"),

  lastName: Yup
    .string()
    .max(20, 'Too long'),

  email: Yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),

  password: Yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),

  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Password does not match')
    .required('Confirm password is required'),
})

const SignUpScreen = ({ navigation }) => {

  /*
  const userInfo = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  */
  /*
  const SignUp = (email, password) => {

    userInfo.email = email;
    userInfo.password = password;
    if (userInfo.email != "" && userInfo.password != "") {
      auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then( cred => {
          firestore()
            .collection("user")
            .doc(cred.user.uid)
            .set({
              email: userInfo.email
            })
          navigation.navigate("Chat");
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('That email address is already in use! , try login');
            navigation.navigate("Login");
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
    
  };

  const SignUp = async (email, password) => {

    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then( (cred) => {
          firestore()
            .collection("user")
            .doc(cred.user.uid)
            .set({
              email: userInfo.email
            })
          navigation.navigate("Chat");
        })
    } catch (error) {

      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        alert('That email address is already in use! , try login');
        navigation.navigate("Login");
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  };
  */

const formikRef = useRef('');
const submitForm = () => {
  formikRef.current.handleSubmit( async (email, password) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then( () => {
          firestore()
            .collection("user")
            .doc(cred.user.uid)
            .set({
              email
            })
          navigation.navigate("Chat");
        })
    } catch (error) {

      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        alert('That email address is already in use! , try login');
        navigation.navigate("Login");
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  });
}

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={registerValidationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({
        values, errors, touched, handleChange, setFieldTouched,
        isValid, dirty, handleSubmit }) => (

        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.registerText}>Register</Text>
            <Text style={styles.text}>Sign Up your account</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.nameInput}>
              <View style={styles.nameWrapper}>
                <TextInput
                  style={styles.name}
                  placeholder="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errorTxt}>{errors.firstName}</Text>
                )}
              </View>
              <View style={styles.nameWrapper}>
                <TextInput
                  style={styles.name}
                  placeholder="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errorTxt}>{errors.lastName}</Text>
                )}
              </View>
            </View>
            <View style={styles.inputsWrapper}>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorTxt}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.inputsWrapper}>
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorTxt}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.inputsWrapper}>
              <TextInput
                style={styles.inputs}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => submitForm()}
              disabled={!isValid || !dirty}
              style={[
                styles.signUpBtn,
                { backgroundColor: isValid ? '#ed6fb5' : '#f5d7e8' },
              ]}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a373c7',
    paddingHorizontal: 25,
  },

  title: {
    width: '100%',
  },

  registerText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  text: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 60,
  },

  formContainer: {
    width: '100%',
  },

  nameInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    marginBottom: 10,
  },

  nameWrapper: {
    width: '49%',
    marginLeft: 4,
  },

  name: {
    width: '100%',

    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },

  inputsWrapper: {
    marginBottom: 10,
  },

  inputs: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },

  signUpBtn: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,

  },

  btnText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },

  errorTxt: {
    fontSize: 12,
    color: 'red',
  },

})
