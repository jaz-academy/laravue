<script setup>
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { nextTick, ref, toRaw, watch } from 'vue'
import BillingItemEdit from './billingItemEdit.vue'

const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'push',
  'remove',
  'update:data',
])

// 👉 Create a local ref to avoid mutating props directly
const localData = ref(structuredClone(toRaw(props.data)))
let isUpdatingFromProp = false

// 👉 Watch for changes in localData and emit them to the parent
watch(localData, newValues => {
  if (!isUpdatingFromProp) {
    emit('update:data', newValues)
  }
}, { deep: true })

// 👉 Watch for changes in the prop from the parent and update the local ref
watch(() => props.data, newValues => {
  isUpdatingFromProp = true
  localData.value = structuredClone(toRaw(newValues))
  nextTick(() => {
    isUpdatingFromProp = false
  })
}, { deep: true })

const updateData = (index, newData) => {
  localData.value.billingItem[index] = newData
}

const school = ref([])

const fetchSchool = async () => {
  const { data, error } = await useApi('/schools')
  if (error.value)
    console.log(error.value)
  else
    school.value = data.value
}

onMounted(() => {
  fetchSchool()
})

// 👉 Add item function
const addItem = () => {
  emit('push')
}

const removeItem = id => {
  emit('remove', id)
}
</script>

<template>
  <VCard>
    <!-- SECTION Header -->

    <VCardText class="d-flex flex-wrap justify-space-between gap-y-5 flex-column flex-sm-row">
      <!-- 👉 Left Content -->
      <div
        v-if="school?.data?.length"
        class="ma-sm-4"
      >
        <div class="d-flex align-center mb-6">
          <!-- 👉 Logo -->
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="me-3"
          />

          <!-- 👉 Title -->
          <h6 class="font-weight-bold text-capitalize text-h4">
            {{ themeConfig.app.title }}
          </h6>
        </div>

        <!-- 👉 Address -->
        <p class="mb-0">
          {{ school.data[0].name }} ✪ <strong>{{ school.data[0].organization }}</strong>
        </p>
        <p class="my-2">
          {{ school.data[0].address }}
        </p>
        <p class="mb-0">
          <VIcon
            icon="tabler-phone"
            class="me-2"
          />
          {{ school.data[0].phone }}
          
          <VIcon
            icon="tabler-mail"
            class="mx-2"
          />
          {{ school.data[0].email }}
        </p>
      </div>
    </VCardText>
    <!-- !SECTION -->

    <VDivider />

    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
          <AppTextField
            v-model="localData.header.year"
            label="Period"
            type="number"
            density="compact"
          />
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <AppTextField
            v-model="localData.header.category"
            label="Payment Category"
            density="compact"
          />
        </VCol>
      </VRow>
    </VCardText>

    <VDivider />

    <!-- 👉 Add billing item -->
    <VCardText class="add-products-form">
      <div
        v-for="(billing, index) in localData.billingItem"
        :key="index"
        class="my-4 ma-sm-4"
      >
        <BillingItemEdit
          :id="index"
          :data="billing"
          @update:data="newData => updateData(index, newData)"
          @remove="removeItem"
        />
      </div>
      
      <div class="mt-6 ms-sm-4">
        <VBtn @click="addItem">
          Add Item
        </VBtn>
      </div>
    </VCardText>

    <VDivider />
  </VCard>
</template>
