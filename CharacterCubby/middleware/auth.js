export default function auth({ redirect, store }) {
    if (store.state.accounts.user === null) {
      return redirect('/login')
    }
  }