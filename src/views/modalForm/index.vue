<template>
  <div>
    <el-button type="primary" size="default" @click="open">open</el-button>
    <y-modal-form isScroll v-model:visible="visible" :options="options" title="编辑用户" width="50%"
      :on-change="handleChange" :on-success="handleSuccess">
      <template #footer="{ form }">
        <el-button @click="cancel(form)">取消</el-button>
        <el-button type="primary" @click="confirm(form)">
          确定
        </el-button>
      </template>
      <!-- template相互嵌套 -->
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color:#eee">
          jpg/png files with a size less than 501KB.
        </div>
      </template>
    </y-modal-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions, FormInstance } from '@/components/form/src/types/types';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const visible = ref<boolean>(false)
const open = () => {
  visible.value = true
}
const cancel = (form: FormInstance) => {
  console.log(form)
}
const confirm = (form: any) => {
  console.log('form', form)
  const validate = form.validate();
  const model = form.getFormData();
  validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('验证成功')
      console.log(model)
    } else {
      ElMessage.error('表单填写有误,请检查')
    }
  })
}

const handleSuccess = (val: any) => {
  console.log('handleSuccess')
  console.log(val)
}
const handleChange = (val: any) => {
  console.log('handleChange')
  console.log(val)
}

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
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%'
      },
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
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
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
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
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '保密',
        value: 'not'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 3
    },
    rules: [
      {
        required: true,
        message: '图片不能为空',
        trigger: 'blur'
      }
    ],
  },
  {
    type: 'editor',
    value: '',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur'
      }
    ]
  }
]
</script>

<style scoped>

</style>