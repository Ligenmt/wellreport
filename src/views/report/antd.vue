<template>
    <div>
        <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
            <a-button> <a-icon type="upload" /> Select File </a-button>
        </a-upload>
        <a-button
                type="primary"
                @click="handleUpload"
                :disabled="fileList.length === 0"
                :loading="uploading"
                style="margin-top: 16px"
        >
            {{uploading ? 'Uploading' : 'Start Upload' }}
        </a-button>


    </div>
</template>

<script>
    import {uploadFile} from '../../api/api'
    export default {
        name: "report",
        data() {
            return {
                fileList: [],
                uploading: false,
                tableArray: [],
                firstTable: [],
            }
        },
        methods: {
            handleRemove(file) {
                const index = this.fileList.indexOf(file)
                const newFileList = this.fileList.slice()
                newFileList.splice(antd, 1)
                this.fileList = newFileList
            },
            beforeUpload(file) {
                this.fileList = [...this.fileList, file]
                return false
            },
            handleUpload() {
                const { fileList } = this
                const formData = new FormData()
                fileList.forEach(file => {
                    formData.append('file', file)
                });
                this.uploading = true

                // You can use any AJAX library you like
                uploadFile(formData).then(res=>{
                    console.log(res.data)
                    this.uploading = false
                    this.tableArray = res.data.result
                    this.firstTable = this.tableArray[0]
                }).catch(err=>{
                    console.log(err)
                    this.uploading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>