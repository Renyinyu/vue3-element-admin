import { reactive } from 'vue'
import { FormRules, FormInstance } from 'element-plus'

function useValidate() {
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 5, max: 18, message: '用户名长度在5-18之间', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 18, message: '密码长度在6-18之间', trigger: 'blur' }
    ]
  })

  const validate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    try {
      const result = await formEl.validate()
      return result
    } catch (error) {
      return Promise.reject(error)      
    }
  }

  return {
    rules,
    validate
  }
}

export default useValidate

