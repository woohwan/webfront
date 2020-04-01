<template>
    <div class="container">
        <div class="larger-12 medium-12 cell">
            <label>Files
                <input type="file" id="files" ref="files" multiple v-on:change="handleFileUploads()" />
            </label>
            <button v-on:click="submitFiles()">Submit</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            files: '',
        }
    },
    methods: {
        handleFileUploads() {
            this.files =this.$refs.files.files;
        },
        submitFiles() {
            let formData = new FormData();
            for(var i = 0; i < this.files.length; i++) {
                let file = this.files[i];
                formData.append('files[' + i + ']', file);
            }

            axios.post('https://localhost:44366/api/uploads',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(res => {
                console.log(res.statusText);
                console.log("SUCCESS");
            })
            .catch ( err => {
                console.log(err.message);
                console.log("FAILURE");
            });
        }
    }
}
</script>