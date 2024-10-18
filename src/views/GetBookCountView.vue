<template>
    <div class="full-width-container">
        <div class="form-wrapper">
          <div class="form-container">
            <h1 class="text-center mb-4">Book Counter</h1>
            <div class="justify-content-center align-items-center">
                <button @click="getBookCount">Get Book Count</button>
                <h2 v-if="count !== null">Total Number of books: {{ count }}</h2>
                <h2 v-if="error">{{ error }}</h2>
            </div>         

            <BookList />
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null,
        };
    },
    methods: {
        async getBookCount() {
            try {
                const response = await axios.get('https://countbooks-ylydzhuz4q-uc.a.run.app');
                this.count = response.data.count;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error;
                this.count = null
            }
            },
        },
    };
</script>