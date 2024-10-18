<template>
    <div class="full-width-container">
      <div class="form-wrapper">
        <div class="form-container">
          <h1 class="text-center mb-4">Delete Book</h1>
          <div class="justify-content-center align-items-center">
          </div>         
          <form @submit.prevent="deleteBook">
            <div class="mb-3">
              <label for="isbn" class="form-label">ISBN: </label>
              <input type="number" name="isbn" id="isbn" placeholder="ISBN" required v-model="isbn">
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Delete Book</button>
            </div>
          </form>
          <BookList />
        </div>
      </div>
    </div>
  </template>

<script>
import { ref } from 'vue';
import { db, auth } from '../firebase/index.js';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';
export default {
    setup() {
        const isbn = ref('');

        const deleteBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                // Find book by ISBN number
                const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docRef = querySnapshot.docs[0].ref;
                    await deleteDoc(docRef);
                    alert('Book deleted successfully!');
                } else {
                    alert('No book found with the provided ISBN');
                }
                isbn.value = ''
            } catch(error) {
                console.error('Error removing book: ', error);
            }
        };
        return {
            isbn,
            deleteBook
        };
    },
    components: {
        BookList
    }
};

</script>