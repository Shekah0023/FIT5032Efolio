<template>
    <div class="full-width-container">
      <div class="form-wrapper">
        <div class="form-container">
          <h1 class="text-center mb-4">Create an account</h1>
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
            <div class="mb-3">
                <label for="role" class="form-label">Role:</label>
                <select
                  name="role"
                  id="role"
                  class="form-select"
                  v-model="role">
                  <option value="user">User</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>
  
            <div class="text-center">
                <button @click="register" class="btn btn-primary">Save to Firebase</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
<script setup>
import {ref} from 'vue'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth } from '../firebase/index.js';
import {useRouter} from "vue-router"
import { doc, setDoc } from "firebase/firestore"

const email = ref("")
const password = ref("")
const role = ref("")
const router = useRouter()

const register = async () => {
    const user = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const userId = user.user.uid
    await setDoc(doc(db, "users", userId), {
      email: email.value,
      role: role.value,
    })
    .then((data) => {
        console.log("Firebase Register Successful!")
        router.push("FireLogin")
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
