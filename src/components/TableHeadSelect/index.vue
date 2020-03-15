<template>
    <el-select v-model="value"
               @change="changeValue()"
    >
        <el-option
                v-for="item in headArray"
                :key="item.value"
                :label="item.value"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "tablehead",
        props: {
            table: Object,
            type: String,
            headArray: Array,
            firstDataRowNumber: Number,
            dataInfoList: Array
        },
        data() {
            return {
                selectDatePattern: "",
                isDialogVisible: false,
                value: "",
                sel2: "",
                sel3: "",
                selData3: [],
                head: []
            };
        },
        watch: {
            'table.type': (val, old) => {
                    console.log('table:', val, old)
            },

        },

        methods: {
            changeValue() {
                // watch sync bug
                console.log("change?");
                // this.$nextTick(() => {
                //     this.$emit("change", this.selArray);
                //     this.$emit("getKey");
                // }, 500);
            }
        },
    }
</script>

<style scoped>

</style>