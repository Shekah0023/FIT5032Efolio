<template>
    <div class="full-width-container">
      <div class="form-wrapper">
        <div class="form-container">
          <h1 class="text-center mb-4">Welcome!</h1>
          <h1 class="text-center mb-4">Login Form</h1>
          <div class="justify-content-center align-items-center">
          </div>         
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="email" class="form-label">Email: </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                name="email"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password: </label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="Password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Log in</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

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

  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Hardcoded credentials for authentication
  const hardcodedUsername = 'random@hotmail.com'
  const hardcodedPassword = 'Password123!'
  
  const formData = ref({
    email: '',
    password: '',
  })
  
  const errors = ref({
    email: null,
    password: null,
  })
  
  const router = useRouter()
  
  const submitForm = () => {
    validateEmail(true)
    validatePassword(true)
  
    if (!errors.value.email && !errors.value.password) {
      if (formData.value.email === hardcodedUsername && formData.value.password === hardcodedPassword) {
        console.log("Login successful")
        localStorage.setItem('isAuthenticated', 'true')
        router.push({ name: 'about' })
        clearForm()
      } else {
        errors.value.password = "The username or password you have entered is invalid"
      }
    }
  }
  
  const clearForm = () => {
    formData.value = {
      email: '',
      password: '',
    }
  }
  
  const validateEmail = (blur) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.value.email) {
      if (blur) errors.value.email = "Email is required"
    } else if (!emailPattern.test(formData.value.email)) {
      if (blur) errors.value.email = "Invalid email address"
    } else {
      errors.value.email = null
    }
  }
  
  const validatePassword = (blur) => {
    const password = formData.value.password
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
    if (password.length < minLength) {
      if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
    } else if (!hasUppercase) {
      if (blur) errors.value.password = `Password must contain at least one uppercase letter.`
    } else if (!hasLowercase) {
      if (blur) errors.value.password = `Password must contain at least one lowercase letter.`
    } else if (!hasNumber) {
      if (blur) errors.value.password = `Password must contain at least one number.`
    } else if (!hasSpecialChar) {
      if (blur) errors.value.password = `Password must contain at least one special character.`
    } else {
      errors.value.password = null
    }
  }
  </script>
  