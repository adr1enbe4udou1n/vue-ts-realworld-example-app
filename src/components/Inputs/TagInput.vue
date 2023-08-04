<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue?: string[]
  }>(),
  {
    modelValue: () => [],
  },
)

const emit = defineEmits(["update:modelValue"])

const tagInput = ref("")

const addTag = () => {
  if (tagInput.value && !props.modelValue.includes(tagInput.value)) {
    emit("update:modelValue", [...props.modelValue, tagInput.value])
  }
  tagInput.value = ""
}
</script>

<template>
  <input
    v-model="tagInput"
    type="text"
    placeholder="Tags"
    class="form-control"
    @keydown.enter.prevent="addTag"
  />

  <div class="mt-2">
    <ul>
      <li v-for="(tag, i) in modelValue" :key="i" inline-flex>
        <button
          type="button"
          bg-gray
          rounded-full
          text-white
          text-sm
          px-2
          mr-2
          flex
          items-center
          @click="
            $emit(
              'update:modelValue',
              modelValue.filter((t) => t !== tag),
            )
          "
        >
          {{ tag }}
          <i i-carbon-close inline-block />
        </button>
      </li>
    </ul>
  </div>
</template>
