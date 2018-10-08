<template>
  <div class="toast" :class="positionClass">
    <toast-transition>
      <div class="toast-message tag is-medium"
        :class="messageTypeClass(m)"
        v-for="m in messages" :key="m.id" role="note">
        <div class="toast-message-text">{{ m.text }}</div>
        <a class="tag is-medium"
          :class="messageTypeClass(m)"
          @click="closeNotification(m.id)">
          <i class="fa fa-times"></i>
        </a>
      </div>
    </toast-transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const ToastTransition = {
  functional: true,
  render(h, { children }) {
    const data = {
      attrs: { tag: 'div', name: 'toast', type: 'transition' }
    }
    return h('transition-group', data, children)
  }
}
export default {
  props: {
    position: {
      validator(value) {
        return /^(:?n|s|nw|ne|sw|se)$/.test(value)
      },
      default: 'ne'
    }
  },
  computed: {
    ...mapGetters({
      messages: 'getNotifications'
    }),
    positionClass() {
      return `toast-position-${this.position}`
    }
  },
  methods: {
    closeNotification: function(id) {
      this.$store.dispatch({
        type: 'closeNotification',
        id: id
      })
    },
    messageTypeClass(message) {
      return `is-${message.category}`
    }
  },
  components: {
    ToastTransition
  }
}
</script>

<style lang="scss">
$width: 350px;
.toast {
  position: fixed;
  width: $width;
  z-index: 9000;
}
.toast-message {
  position: relative;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 15px;
  padding-right: 0 !important;
  width: 100%;
  color: #fff;
  transition: 400ms cubic-bezier(0.17, 0.67, 0.17, 0.98);
  transition-property: opacity, transform;
}
.toast-message-text{
  width: 100%
}

/**
 * Transition
 */
.toast-enter-active,
.toast-leave {
  opacity: 1;
}
.toast-enter,
.toast-leave-active {
  opacity: 0;
}
.toast-leave-active {
  position: absolute;
}
/**
 * Position
 */
.toast-position-n {
  top: 10px;
  left: 50%;
  margin-left: -$width / 2;
}
.toast-position-s {
  bottom: 10px;
  left: 50%;
  margin-left: -$width / 2;
}
.toast-position-ne {
  top: 10px;
  right: 10px;
}
.toast-position-nw {
  top: 10px;
  left: 10px;
}
.toast-position-se {
  bottom: 10px;
  right: 10px;
}
.toast-position-sw {
  bottom: 10px;
  left: 10px;
}
/**
 * Transition with position
 */
.toast-position-n,
.toast-position-ne,
.toast-position-nw {
  .toast-enter,
  .toast-leave-active {
    transform: translateY(-20px);
  }
}
.toast-position-s,
.toast-position-se,
.toast-position-sw {
  .toast-enter {
    transform: translateY(20px);
  }
  .toast-leave-active {
    transform: translateY(-100%) translateY(20px);
  }
}
</style>
