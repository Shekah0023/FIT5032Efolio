<template>
    <div class="full-width-container">
      <div class="form-wrapper">
        <div class="form-container">
          <h1 class="text-center mb-4">Add Book</h1>
          <div class="justify-content-center align-items-center">
          </div>         
          <form @submit.prevent="addBook">
            <div class="mb-3">
              <label for="isbn" class="form-label">ISBN: </label>
              <input type="number" name="isbn" id="isbn" placeholder="ISBN" required v-model="isbn">
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Name: </label>
              <input type="text" name="name" id="name" placeholder="Name" required v-model="name">
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Add Book</button>
            </div>
          </form>
          <BookList />
        </div>
      </div>
    </div>
  </template>

<script>
import { ref } from 'vue';
import { db } from '../firebase/index.js';
import { collection, addDoc } from 'firebase/firestore';

import BookList from '../components/BookList.vue';

export default {
    setup() {
        const isbn = ref('');
        const name = ref('');

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                await addDoc(collection(db, 'books'), {
                    isbn: isbnNumber,
                    name: name.value
                });
                isbn.value = '';
                name.value = '';
                alert('Book added successfully!');
            } catch(error) {
                console.error('Error adding book: ', error);
            }
        };
        return {
            isbn,
            name,
            addBook
        };
    },
    components: {
        BookList
    }
};
</script>