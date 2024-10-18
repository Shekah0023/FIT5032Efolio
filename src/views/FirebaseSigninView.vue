<template>
    <div class="full-width-container">
      <div class="form-wrapper">
        <div class="form-container">
          <h1 class="text-center mb-4">Sign in</h1>
          <div class="justify-content-center align-items-center">
          </div>         
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="email" class="form-label">Email: </label>
              <input type="text" name="email" id="email" placeholder="Email" v-model="email">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password: </label>
              <input type="password" name="password" id="password" placeholder="Password" v-model="password">
            </div>
  
            <div class="text-center">
              <button @click="signin" class="btn btn-primary">Sign in via Firebase</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

<script setup>
import {ref} from 'vue'
import { signInWithEmailAndPassword } from "firebase/auth"
import {useRouter} from "vue-router"
import { auth } from '../firebase/index.js';

const email = ref("")
const password = ref("")
const router = useRouter()

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Firebase signin Successful!")
        router.push("/")
        console.log(auth.currentUser)  // To check the current user signed in
    }).catch((error) => {
        console.log(error.code);
    })
};
</script>

<style>
.full-width-container {
    width: 100%;
    height: 100vh; 
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .form-wrapper {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  }
  
  h1 {
    margin-bottom: 20px;
    font-weight: 600;
  }
  
</style>
