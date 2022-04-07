export default function auth({ redirect, store }) {
    if (store.state.users.user === null) {
      return redirect('/login')
    }
  }