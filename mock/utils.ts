function deepClone(origin: { [key: string | symbol]: any }, hashMap = new WeakMap()) {
  // 判断是否为对象或数组
  if (origin == undefined || typeof origin !== 'object') {
    return origin
  }

  if (origin instanceof Date) return new Date(origin) // 处理日期
  if (origin instanceof RegExp) return new RegExp(origin) // 处理正则

  // 使用weakmap的键为弱引用特性，判断对象是否已被复制过
  const hashCache = hashMap.get(origin)
  if (hashCache) {
    // 若对象已被复制过，则直接返回（避免进入死循环）
    return hashCache
  }

  // 创建一个空对象或数组
  const target = new (origin as any).constructor()

  // 保存已复制过的对象引用
  hashMap.set(origin, target)

  // 开始对origin源对象进行拷贝
  // 此处使用Reflect.ownKeys是为了解决不能复制symbol问题
  Reflect.ownKeys(origin).forEach(key => {
    if (typeof origin == 'object' && origin != null) {
      target[key] = deepClone(origin[key], hashMap)
    } else {
      target[key] = origin[key]
    }
  })

  return target
}

export {
  deepClone
}
