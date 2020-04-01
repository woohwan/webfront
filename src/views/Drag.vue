<style>
  div.file-drop {
    display: block;
    height: 200px;
    width: 100%;
    border: 1px solid grey;
    background: white;
    margin: auto;
    text-align: center;
    border-radius: 4px;
  }

  div.file-listing{
    width: 400px;
    margin: auto;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  div.file-listing img{
    height: 100px;
  }

  div.remove-container{
    text-align: center;
  }

  div.remove-container a{
    color: red;
    cursor: pointer;
  }

  a.submit-button{
    display: block;
    margin: auto;
    text-align: center;
    width: 200px;
    padding: 10px;
    text-transform: uppercase;
    background-color: #CCC;
    color: white;
    font-weight: bold;
    margin-top: 20px;
  }

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
  
</style>

<template>
    <v-container ml-0>
        <v-row justify="start" no-gutters>
            <v-col cols="auto" class="pr-1">
                <input type="file" multiple ref="uploadFileReference" style="display: none"  v-on:change="uploadFileReference">
                <v-btn color="white" @click="$refs.uploadFileReference.click()">파일추가</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="white" @click="deleteItem">파일삭제</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col >
                <div id="dropzone" class="file-drop" ref="fileform">
                    <span v-show="!showOk" >Drop the files here!</span>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        v-model="selected"
                        item-key="name"
                        show-select
                        hide-default-footer
                        no-data-text=""
                        fixed-header
                        height="190px" 
                        v-if="showOk"
                    >
                    </v-data-table>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

  export default {
    /*
      Variables used by the drag and drop component
    */
    data(){
      return {
        dragAndDropCapable: false,
        selected: [],
        files: [],
        headers: [
            { text: '파일명', value: 'name', align: 'center', class:"background-color:green;"},
            { text: '크  기', value: 'size', align: 'center'},
            { text: '종  류', value: 'ext', align: 'center'},
        ],
        items: [],
        showOk: false,
      }
    },

    mounted(){
        /*
            Determine if drag and drop functionality is capable in the browser
        */
        this.dragAndDropCapable = this.determineDragAndDropCapable();

        /*
            If drag and drop capable, then we continue to bind events to our elements.
        */
        if( this.dragAndDropCapable ){
            /*
            Listen to all of the drag events and bind an event listener to each
            for the fileform.
            */
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
                /*
                    For each event add an event listener that prevents the default action
                    (opening the file in the browser) and stop the propagation of the event (so
                    no other elements open the file in the browser)
                */
                this.$refs.fileform.addEventListener(evt, function(e){
                    e.preventDefault();
                    e.stopPropagation();
                }.bind(this), false);
            }.bind(this));

            /*
            Add an event listener for drop to the form
            */
            this.$refs.fileform.addEventListener('drop', function(e) {
            /*
                Capture the files from the drop event and add them to our local files
                array.
            */
                var files = e.dataTransfer.files;
                
                // console.log("length: " + files.length + ", file name: ", e.dataTransfer.files[0].name )

                files.forEach(file => {
                    var file_info = this.fileInfo(file);
                    console.log("in event listener: file name: " + file_info.name + ", size: "+ file_info.size);
                    
                    this.files.push( file );
                    this.items.push({
                        name: file_info.name,
                        size: file_info.size,
                        ext: file_info.ext
                    })
                });
                
                if(this.files.length > 0) 
                    this.showOk = true;
                else
                    this.showOk = false;

            }.bind(this));
        }
    },

    methods: {
        /*
            Determines if the drag and drop functionality is in the
            window
        */
        determineDragAndDropCapable(){
            /*
            Create a test element to see if certain events
            are present that let us do drag and drop.
            */
            var div = document.createElement('div');

            /*
            Check to see if the `draggable` event is in the element
            or the `ondragstart` and `ondrop` events are in the element. If
            they are, then we have what we need for dragging and dropping files.

            We also check to see if the window has `FormData` and `FileReader` objects
            present so we can do our AJAX uploading
            */
            return ( ( 'draggable' in div )
                    || ( 'ondragstart' in div && 'ondrop' in div ) )
                    && 'FormData' in window
                    && 'FileReader' in window;
        },

        fileInfo(file) {
            // 파일 이름
            var fileName = file.name;
            var fileNameArr = fileName.split(".");
            // 확장자
            var ext = fileNameArr[fileNameArr.length - 1];
            
            var fileSize = file.size; // 파일 사이즈(단위 :byte)
            
            if (fileSize <= 0) {
                console.log("0kb file return");
                return;
            }
        

            var fileSizeKb = parseInt(fileSize / 1024); // 파일 사이즈(단위 :kb)
            var fileSizeMb = fileSizeKb / 1024;	// 파일 사이즈(단위 :Mb)
                        
            var fileSizeStr = "";
            if ((1024*1024) <= fileSize) {	// 파일 용량이 1메가 이상인 경우 
                // console.log("fileSizeMb="+fileSizeMb.toFixed(2));
                fileSizeStr = fileSizeMb.toFixed(2) + " Mb";
            } else if ((1024) <= fileSize) {
                // console.log("fileSizeKb="+parseInt(fileSizeKb));
                fileSizeStr = parseInt(fileSizeKb) + " kb";
            } else {
                // console.log("fileSize="+parseInt(fileSize));
                fileSizeStr = parseInt(fileSize) + " byte";
            }
    
            return ( {
                name: fileName,
                size: fileSizeStr,
                ext: ext

            });
        },

        deleteItem () {
            console.log("selected count: " + this.selected.length );
            for(var i = 0; i <this.selected.length; i++){
                const index = this.items.indexOf(this.selected[i]);
                // console.log("index: " + index + ", file name: " + this.items[index].name);
                this.items.splice(index, 1);
                this.files.splice(index, 1);
                
            }
            console.log(this.items)
            // selected 변수 초기화
            this.selected = [];
                
            if(this.items.length > 0) 
                this.showOk = true;
            else
                this.showOk = false;
        },
        uploadFileReference(e) {
            let files = e.target.files
            
            // var files = this.$refs.file.files;
            this.files.push(files);
            
            
            files.forEach(file => {
                var file_info = this.fileInfo(file);
                this.items.push({
                    name: file_info.name,
                    size: file_info.size,
                    ext: file_info.ext
                })
            });
            if(this.items.length >0) this.showOk = true;
        },
    }
  }
</script>