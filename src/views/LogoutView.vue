<template>
    <div class="full-width-container">
        <button @click="logoutFirebase" class="btn btn-primary logout-btn">
            Logout from Firebase
        </button>
        </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"
import { db, auth } from "../firebase";

export default {
    setup() {
        const logoutFirebase = async () => {
            signOut(auth);
            console.log("User signed out");
        }
        return {
            logoutFirebase,
        };
    },
};
</script>

<style scoped>
.full-width-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; /* Horizontally center */
    align-items: center; /* Vertically center */
  }
</style>