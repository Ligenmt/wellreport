<template>
    <div>
        <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :on-change="handleChange"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="handleUpload">上传到服务器</el-button>
        </el-upload>

        <div v-for="(table, index) in tableArray" :key="index">
            <el-select v-model="table.type" @change="changeType" v-if="index <= 2">
                <el-option
                        v-for="item in allTypeOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-table
                    border
                    highlight-current-row
                    @current-change="handleCurrentChange" v-if="index <= 2">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column :prop="key" v-for="(item, key) in table.head" :key="key" >
                    <template style="height:20px" slot="header">
                        <table-head-select
                            :headArray="table.targetHeadOptions"
                            :type="table.type"
                            :table="table"
                        ></table-head-select>
                        <!--<el-select v-model="value"-->
                                   <!--@change="updateFrist($event, index, key)"-->
                        <!--&gt;-->
                            <!--<el-option-->
                                    <!--v-for="item in options"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.value"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    </template>
                    <!--<el-table-column :prop="key" :label="firstTable.head[key]" ></el-table-column>-->
                </el-table-column>
            </el-table>
            <el-table
                    border
                    highlight-current-row
                    :data="table.data"
                    v-if="index <= 2"
            >
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column :prop="key" v-for="(item, key) in table.head" :key="key" :label="table.head[key]">
                    <!--<el-table-column :prop="key" :label="firstTable.head[key]" ></el-table-column>-->
                </el-table-column>
            </el-table>
        </div>


    </div>
</template>

<script>
    import {uploadFile} from '../../api/api'
    import TableHeadSelect from '../../components/TableHeadSelect'
    export default {
        name: "report",
        components: {TableHeadSelect},
        data() {
            return {
                fileList: [],
                file: null,
                value: '',
                uploading: false,
                tableArray: [],
                updateTable: null,
                allHeadArray: [],
                targetHead: [{
                    0: '',
                    1: '',
                    2: '',
                    3: '',
                    4: '',
                }],
                options: [{
                    value: '开钻次序',
                    label: '开钻次序'
                }, {
                    value: '井深',
                    label: '井深'
                }, {
                    value: '钻头尺寸',
                    label: '钻头尺寸'
                }, {
                    value: '套管尺寸',
                    label: '套管尺寸'
                }, {
                    value: '下入层位',
                    label: '下入层位'
                }, {
                    value: '套管下深',
                    label: '套管下深'
                }, {
                    value: '水泥返高',
                    label: '水泥返高'
                }],
                allTypeOptions: [],
            }
        },
        methods: {

            handleChange(file, fileList) {
                console.log(file, fileList);
                this.file = file
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            beforeUpload(file) {
                this.fileList = [...this.fileList, file]
                return false
            },
            handleUpload() {
                const formData = new FormData()
                formData.append('file', this.file.raw)
                this.uploading = true

                // You can use any AJAX library you like
                uploadFile(formData).then(res=>{
                    // console.log(res.data)
                    this.uploading = false
                    this.tableArray = res.data.result.parsedTableData
                    this.allHeadArray = res.data.result.allHeadArray
                    this.allTypeOptions = res.data.result.allTypeArray
                }).catch(err=>{
                    console.log(err)
                    this.uploading = false
                })
            },

            updateFrist(event, index, key) {
                console.log(event, index, key)
                // console.log(this.targetHead)
                // this.$set(this.tableArray[index]['targetHead'], key, event)
                // console.log(this.tableArray[index]['targetHead'])
                // this.updateTable = this.tableArray[index]['targetHead']
                // console.log(this.updateTable)
                // let tmp = this.targetHead
                // this.targetHead = null
                // this.$nextTick(()=>{
                //     this.targetHead = tmp
                // })
            },

            handleCurrentChange(value) {
                console.log(value)
            },

            changeType(val) {
               console.log(val)
            }
        },
    }
</script>

<style scoped>

</style>