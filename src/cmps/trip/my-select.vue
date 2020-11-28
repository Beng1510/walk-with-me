<template>
	<el-select v-model="newValue" placeholder="Select" @change="emitChange">
		<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		>
		</el-option>
	</el-select>
</template>

<script>
export default {
	props: {
		options: Array,
		value: String,
	},
	data() {
		return {
			  newValue: null
		};
	},
	methods: {
		emitChange() {
            this.$emit("input", this.newValue);
		},
    },
    created(){
        this.newValue = this.value
    }
};
</script>