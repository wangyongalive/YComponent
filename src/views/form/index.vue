<template>
  <div>
    <y-form ref="form" label-width="100px" :options="options" @on-change="handleChange"
      @before-upload="handleBeforeUpload" @on-preview="handlePreview" @on-remove="handleRemove"
      @before-remove="beforeRemove" @on-success="handleSuccess" @on-exceed="handleExceed">
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color:#eee">
          jpg/png files with a size less than 501KB.
        </div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </template>
    </y-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions, FormInstance } from '../../components/form/src/types/types';
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue';


interface Scope {
  form: FormInstance,
  model: any
}

const form = ref<any>()

// input 校验是blur 其余大部分都是change
const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      showPassword: true,
      clearable: true
    }
  },
  {
    type: 'select',
    value: '1',
    label: '职位',
    prop: 'role',
    placeholder: '请选择职位',
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    attrs: {
      clearable: true,
      style: {
        width: '100%'
      }
    },
    children: [
      {
        type: 'option',
        value: '1',
        label: "经理"
      },
      {
        type: 'option',
        value: '2',
        label: "主管"
      },
      {
        type: 'option',
        value: '3',
        label: "员工"
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [{
      type: 'checkbox',
      label: '足球',
      value: '1'
    }, {
      type: 'checkbox',
      label: '篮球',
      value: '2'
    }, {
      type: 'checkbox',
      label: '排球',
      value: '3'
    }]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [{
      type: 'radio',
      label: '男',
      value: 'male'
    }, {
      type: 'radio',
      label: '女',
      value: 'female'
    }, {
      type: 'radio',
      label: '保密',
      value: 'not'
    }]
  },
  {
    type: "upload",
    label: "上传",
    prop: 'pic',
    rules: [
      {
        required: true,
        message: '图片不能为空',
        trigger: 'blur'
      }
    ],
    uploadAttrs: {
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      multiple: true,
      limit: 3
    }
  },
  {
    type: 'editor',
    value: "123",
    prop: 'desc',
    label: "描述",
    placeholder: '请输入内容',
    rules: [{
      required: true,
      message: '描述不能为空',
      trigger: 'blur'
    }]
  }
]


// 表单提交
const submitForm = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      console.log(scope.model)
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('表单填写有误，请重新填写!!!')
    }
  })
}

// 表单重置 
const resetForm = () => {
  form.value.resetFields()
}


let handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}
let handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
let beforeRemove = (val: any) => {
  console.log('beforeRemove')
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
let handleExceed = (val: any) => {
  console.log('handleExceed', val)
  ElMessage.warning(
    `The limit is 3, you selected ${val.files.length
    } files this time, add up to ${val.files.length + val.fileList.length} totally`
  )
}
let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
let handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}
</script>

<style scoped>

</style>