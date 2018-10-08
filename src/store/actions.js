import * as types from './mutation-types'

export default {
  addNotification(context, { notification }) {
    context.commit(types.ADD_NOTIFICATION, { notification })
    setTimeout(() =>
      context.dispatch({
        type: 'closeNotification',
        id: notification.id
      }),
      notification.dismissAfter)
  },
  closeNotification(context, { id }) {
    context.commit(types.REMOVE_NOTIFICATION, { id })
  },
}
