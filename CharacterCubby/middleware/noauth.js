export default function noauth({ redirect, store }) {
    if (store.state.users.user !== null) {
      return redirect('/')
    }
  }