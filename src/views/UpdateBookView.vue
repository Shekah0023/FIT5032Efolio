<template>
    <div class="full-width-container">
        <div class="form-wrapper">
          <div class="form-container">
            <h1 class="text-center mb-4">Update Book</h1>
            <div class="justify-content-center align-items-center">
            </div>         
            <form @submit.prevent="updateBook">
              <div class="mb-3">
                <label for="isbn" class="form-label">ISBN: </label>
                <input type="number" name="isbn" id="isbn" placeholder="ISBN" required v-model="isbn">
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Name: </label>
                <input type="text" name="name" id="name" placeholder="Name" required v-model="name">
              </div>
    
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Update Book</button>
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
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';
export default {
    setup() {
        const isbn = ref('');
        const name = ref('');

        const updateBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty) {
                  const docRef = querySnapshot.docs[0].ref;
                  await updateDoc(docRef, { name: name.value });
                  alert('Book updated successfully')
                } else {
                  alert('No book found with the provided ISBN')
                }
                isbn.value = '';
                name.value = '';
            } catch (error) {
              console.log('Error updating book: ', error)
            }  
        };
        return {
            isbn,
            name,
            updateBook
        };
    },
    components: {
        BookList
    }
};

</script>
