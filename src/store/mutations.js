import * as types from './mutation-types'

export default {
  [types.ADD_NOTIFICATION] (state, { notification }) {
    notification.id = ++state.notification_max_id
    state.notifications.push(notification)
  },
  [types.REMOVE_NOTIFICATION] (state, { id }) {
    state.notifications = state.notifications.filter(n => n.id !== id)
  }
}
