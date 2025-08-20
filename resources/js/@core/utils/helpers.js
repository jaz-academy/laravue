// Fungsi mengambil gambar
import avatar from '@images/avatars/no-profile.png'
import { computed } from 'vue'

export const takePic = src => {
  return src ? `/storage/${src}` : avatar
}

// useUserAccess
export function useUserAccess() {
  const currentUser = useCookie('userData') // reactive cookie

  // cek role minimum
  const hasRole = minRole => computed(() =>
    Number(currentUser.value?.role ?? 0) >= Number(minRole ?? 0),
  )

  // cek user tertentu berdasarkan id
  const isThisUser = userId => computed(() =>
    Number(currentUser.value?.id ?? 0) === Number(userId ?? 0),
  )

  // cek user student atau role tertentu
  const hasRoleOrStudent = (minRole, userId) => computed(() =>
    Number(currentUser.value?.admin_student_id ?? 0) === Number(userId ?? 0) ||
    Number(currentUser.value?.role ?? 0) >= Number(minRole ?? 0),
  )

  // cek user teacher atau role tertentu
  const hasRoleOrTeacher = (minRole, userId) => computed(() =>
    Number(currentUser.value?.admin_teacher_id ?? 0) === Number(userId ?? 0) ||
    Number(currentUser.value?.role ?? 0) >= Number(minRole ?? 0),
  )

  // cek akses custom (array string misal ['Courses','Payment'])
  const hasAccess = accessName => computed(() => {
    const accessList = (currentUser.value?.access ?? '').split(',')
    
    return accessList.includes(accessName)
  })


  // cek user role dan access menu
  const hasRoleAndAccess = (minRole, accessName) => computed(() => {
    const accessList = (currentUser.value?.access ?? '').split(',')

    return accessList.includes(accessName) && Number(currentUser.value?.role ?? 0) >= Number(minRole ?? 0)
  })

  return {
    currentUser,
    hasRole,
    isThisUser,
    hasRoleOrStudent,
    hasRoleOrTeacher,
    hasAccess,
    hasRoleAndAccess,
  }
}

// 👉 IsEmpty
export const isEmpty = value => {
  if (value === null || value === undefined || value === '')
    return true
  
  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = value => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = arr => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = obj => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsToday
export const isToday = date => {
  const today = new Date()
  
  return (date.getDate() === today.getDate()
        && date.getMonth() === today.getMonth()
        && date.getFullYear() === today.getFullYear())
}

// Fungsi Proper Case
export const properCase = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Fungsi untuk menentukan warna berdasarkan rate
export const rateColor = rate => {
  if (rate == 5) return 'success'
  if (rate >= 4.0) return 'primary'
  if (rate >= 3.0) return 'warning'
  if (rate >= 1.0) return 'error'
  
  return 'secondary'
}

// Fungsi Rate Icon Number
export const rateNumberIcon = rate => {
  if (rate == 5) return 'tabler-circle-number-5'
  if (rate >= 4.0) return 'tabler-circle-number-4'
  if (rate >= 3.0) return 'tabler-circle-number-3'
  if (rate >= 2.0) return 'tabler-circle-number-2'
  if (rate >= 1.0) return 'tabler-circle-number-1'

  return 'tabler-mood-off'
}

// Format Date
export function humanDate(date, format = 'dd MMM yyyy') {
  if (!date) return '-'
  const d = new Date(date)

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ]

  const optionsMap = {
    'dd': String(d.getDate()).padStart(2, '0'),
    'd': d.getDate(),
    'MMM': monthNames[d.getMonth()],
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'M': d.getMonth() + 1,
    'yyyy': d.getFullYear(),
    'yy': String(d.getFullYear()).slice(-2),
    'HH': String(d.getHours()).padStart(2, '0'),
    'mm': String(d.getMinutes()).padStart(2, '0'),
    'ss': String(d.getSeconds()).padStart(2, '0'),
  }

  return format.replace(/\b(dd|d|MMM|MM|M|yyyy|yy|HH|mm|ss)\b/g, match => optionsMap[match])
}

