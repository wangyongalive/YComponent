<template>
  <div>
    <y-form label-width="100px" :options="options"></y-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '../../components/form/src/types/types';


const options: FormOptions[] = [{
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
      trigger: 'blur'
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
}
]
</script>

<style scoped>

</style>