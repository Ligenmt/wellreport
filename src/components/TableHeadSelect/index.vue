<template>
    <div>
        {{type2}}
        {{table.type}}
        <el-select v-model="value"
                   @change="changeValue"
        >
            <el-option
                    v-for="item in headArray"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>

</template>

<script>
    export default {
        name: "tablehead",
        props: {
            table: Object,
            type2: String,
            allHeadArray: Array,
            firstDataRowNumber: Number,
            dataInfoList: Array,
            dataIndex: Number,
            dataKey: String,
        },
        data() {
            return {
                selectDatePattern: "",
                isDialogVisible: false,
                type: "",
                value: "",
                sel2: "",
                sel3: "",
                headArray: [],
                head: []
            };
        },
        mounted() {
            console.log("type2", this.type2)
            this.type = this.table.type
            for (let i=0; i<this.allHeadArray.length; i++) {
                let ha = this.allHeadArray[i]
                if (ha.type === this.type) {
                    this.headArray = ha.array
                    this.value = ''
                    break
                }
            }
            this.value = this.table.targetHead[this.dataKey]
        },
        watch: {

            type2(val) {
                console.log("type2", val)
            },

            'table.type'(val)  {
                console.log("table", val, this.type2)
                for (let i=0; i<this.allHeadArray.length; i++) {
                    let ha = this.allHeadArray[i]
                    if (ha.type === val) {
                        this.headArray = ha.array
                        this.value = ''
                        break
                    }
                }
            },

        },

        methods: {
            changeValue(val) {
                // watch sync bug
                console.log("change", this.dataIndex,  this.dataKey, val);
                let changeData = {index: this.dataIndex,  key: this.dataKey, value: val}
                this.$nextTick(() => {
                    this.$emit("change", changeData);
                    // this.$emit("getKey");
                }, 500);
            }
        },
    }
</script>

<style scoped>

</style>