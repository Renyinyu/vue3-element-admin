<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { User, Lock, Loading } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'
  import useValidate from './useValidate'
  import { useUserStore } from '@/store/user'
  import { ExtendObject } from '@/types'

  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()

  const formRef = ref<FormInstance>()

  const form = reactive({
    username: '',
    password: ''
  })
  const loginLoading = ref(false)

  const { rules, validate } = useValidate()

  /**
   * 登录处理
   * @param {FormInstance} formEl 
   */
  const handleLogin = async (formEl: FormInstance | undefined) => {
    Loading.value = true
    try {
      const result = await validate(formEl)
      if (result) {
        await userStore.login(form)
        redirect()
      }
    } catch (error: any) {
      console.error(error)
    }
    Loading.value = false
  }

  /**
   * 已登录的话，重定向
   */
  const redirect = () => {
    console.log('redirect,', route)
    
    router.push({
      path: route.query.redirect as string ?? '/',
      query: getOtherQuery()
    })
  }

  const getOtherQuery = () => {
    return Object.keys(route.query).reduce((query, key) => {
      if (key !== 'redirect') {
        query[key] = route.query[key]
      }
      return query
    }, {} as ExtendObject)
  }
</script>

<template>
  <div class="login">
    <div class="login-form-wrapper">
      <h2>系统登录</h2>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            :prefix-icon="User"
            autocomplete="on"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            autocomplete="on"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" :loading="loginLoading" @click="handleLogin(formRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    height: 100vh;
    background: #e6e8eb;
  }

  .login-form-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    background: #fff;
    border: 1px solid #f2f6fc;
    border-radius: 8px;
    padding: 18px 32px;

    h2 {
      text-align: center;
      font-size: 24px;
      padding: 16px;
      color: #303133;
    }

    .login-btn {
      width: 100%;
    }
  }
</style>
