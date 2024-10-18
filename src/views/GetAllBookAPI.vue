<template>
    <!-- Display books in JSON format -->
    <pre>{{ books ? JSON.stringify(books, null, 2) : 'Loading...' }}</pre>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '../firebase/index.js';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

export default {
    setup() {
        const books = ref(null); // Initially null to indicate loading

        const fetchBooks = async () => {
            try {
                const q = query(
                    collection(db, 'books'),
                    orderBy('isbn')
                );
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                books.value = booksArray;
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };
        
        onMounted(() => {
            fetchBooks();
        });

        return {
            books
        };
    }
};
</script>
