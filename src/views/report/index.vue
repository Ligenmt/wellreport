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
            <el-button style="margin-left: 10px;" size="small" type="success"
                       @click="handleUpload"
                       v-loading.fullscreen.lock="fullscreenLoading"
            >上传到服务器</el-button>
        </el-upload>
        <!--<el-button @click="handleSubmit">提交</el-button>-->

        <div v-for="(table, index) in tableArray" :key="index" style="margin-top: 40px;">
            <span>表格{{index+1}}</span>
            <el-select v-model="table.type" clearable @change="changeType(table)">
                <el-option
                        v-for="item in allTypeOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-collapse v-model="activeTabs">
                <el-collapse-item :title="table.type" :name="index">
                    <el-table
                            border
                            empty-text="解析表格数据"
                            :data="table.data"
                            highlight-current-row
                            @current-change="handleCurrentChange">
                        <el-table-column
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column :prop="key" v-for="(item, key) in table.head" :key="key" >
                            <template style="height:20px" slot="header">
                                <table-head-select
                                        :allHeadArray="allHeadArray"
                                        :type2="table.type"
                                        :table="table"
                                        :dataIndex="index"
                                        :dataKey="key"
                                        @change="updateColumn"
                                ></table-head-select>
                            </template>
                            <el-table-column :prop="key" :label="table.head[key]" ></el-table-column>
                        </el-table-column>
                    </el-table>
                    <!--<el-table-->
                            <!--border-->
                            <!--highlight-current-row-->
                            <!--:data="table.data"-->
                    <!--&gt;-->
                        <!--<el-table-column-->
                                <!--type="index"-->
                                <!--width="50">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column :prop="key" v-for="(item, key) in table.head" :key="key" :label="table.head[key]">-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                </el-collapse-item>
            </el-collapse>

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
                fullscreenLoading: false,
                fileList: [],
                file: null,
                value: '',
                uploading: false,
                tableArray: [],
                updateTable: null,
                allHeadArray: [],
                allTypeOptions: [],
                targetTypeArray: [],
                activeTabs: [],
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
                this.fullscreenLoading = true

                // You can use any AJAX library you like
                uploadFile(formData).then(res=>{
                    // console.log(res.data)
                    this.allHeadArray = res.data.result.allHeadArray
                    this.allTypeOptions = res.data.result.allTypeArray
                    this.tableArray = res.data.result.parsedTableData
                    // console.log(targetTypeArray)
                    this.fullscreenLoading = false
                }).catch(err=>{
                    console.log(err)
                    this.fullscreenLoading = false
                })
            },

            updateColumn(data) {
                this.tableArray[data.index]['targetHead'][data.key] = data.value
                console.log(this.tableArray[data.index]['targetHead'])
            },

            handleCurrentChange(value) {
                console.log(value)
            },

            changeType(table) {
               console.log(table.type)
            },

            handleSubmit() {
                console.log("handleSubmit")
                console.log(this.tableArray)
            }
        },
    }
</script>

<style scoped>

</style>