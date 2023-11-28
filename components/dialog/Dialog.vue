<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

// Define props with defaults
const props = withDefaults(defineProps<{
  visible: boolean
  width?: string
  title?: string
  closeOnOutsideClick?: boolean
}>(), {
  width: '50rem',
  closeOnOutsideClick: true,
})

// Define emits
const emit = defineEmits<{
  'update:visible': [value: boolean]
  onSubmit: []
  onClose: []
}>()

// Define slots
const slots = defineSlots<{
  default: any
  header: any
  footer: any
}>()
// Reference to the dialog element
const dialogElement = ref<HTMLElement | null>(null)

// Handle outside click
onClickOutside(dialogElement, () => {
  if (props.closeOnOutsideClick)
    closeDialog()
})

// Computed style for dialog
const dialogStyle = computed(() => ({
  width: props.width,
}))

function closeDialog() {
  emit('update:visible', false)
}

onMounted(() => {
  watchEffect(() => {
    document.body.style.overflowY = props.visible ? 'hidden' : ''
  })
})
</script>

<template>
  <Teleport to="body">
    <template v-if="props.visible">
      <div class="dialog-wrapper">
        <div
          ref="dialogElement"
          class="dialog"
          :style="dialogStyle"
          aria-modal="true"
          aria-labelledby="modal-headline"
          role="dialog"
        >
          <button
            class="dialog__close-button"
            @click="closeDialog"
          >
            <Icon name="material-symbols-light:close-rounded" size="1.5rem" />
          </button>
          <div class="dialog__header">
            <slot name="header" />
            <template v-if="!slots.header && props.title">
              <span>{{ props.title }}</span>
            </template>
          </div>
          <div class="dialog__content">
            <slot />
          </div>
          <div class="dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </template>
  </Teleport>
</template>

<style lang="postcss" scoped>
.dialog-wrapper {
  @apply z-50;
  @apply fixed top-0 left-0 w-screen h-screen;
  @apply bg-black bg-opacity-40; /* overlay */
  @apply transition-all;

  .dialog {
    @apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
    @apply px-5;
    @apply bg-white rounded shadow;

    &__close-button {
      @apply absolute top-2 right-3;
      @apply rounded-full;
      @apply text-neutral-500 hover:text-neutral-700 bg-transparent hover:bg-neutral-100 transition-colors
    }

    &__header {
        @apply py-5;
        @apply select-none;
        @apply text-lg font-bold;
    }
  }
}
</style>
